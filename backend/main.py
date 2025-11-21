from fastapi import FastAPI, BackgroundTasks, Request, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
import database, models, schemas, crud, auth

# Load environment variables
load_dotenv()

# Create DB tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",  # Vite default port
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex='https://.*\.vercel\.app', # Allow all Vercel deployments
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Email Configuration
mail_username = os.getenv("MAIL_USERNAME")
mail_password = os.getenv("MAIL_PASSWORD")
mail_from = os.getenv("MAIL_FROM")
mail_server = os.getenv("MAIL_SERVER")

conf = None
if mail_username and mail_password and mail_from and mail_server:
    conf = ConnectionConfig(
        MAIL_USERNAME=mail_username,
        MAIL_PASSWORD=mail_password,
        MAIL_FROM=mail_from,
        MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
        MAIL_SERVER=mail_server,
        MAIL_STARTTLS=True,
        MAIL_SSL_TLS=False,
        USE_CREDENTIALS=True,
        VALIDATE_CERTS=True
    )

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str
    honeypot: str | None = None # Hidden field for bots

# In-memory rate limiting store {ip: timestamp}
rate_limit_store = {}

def check_rate_limit(ip: str):
    now = datetime.now()
    if ip in rate_limit_store:
        last_request = rate_limit_store[ip]
        if now - last_request < timedelta(days=1):
            return False
    rate_limit_store[ip] = now
    return True

@app.get("/")
def read_root():
    return {"message": "Welcome to the Portfolio API"}

# --- Auth Endpoints ---
@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(auth.get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Temporary endpoint to create the first user (Remove in production or secure it)
@app.post("/create-admin")
def create_admin(user: schemas.UserInDB, db: Session = Depends(auth.get_db)):
    # Check if ANY user exists (One-time setup)
    if db.query(models.User).first():
        raise HTTPException(status_code=403, detail="Admin account already exists. Setup is complete.")
    
    hashed_password = auth.get_password_hash(user.hashed_password)
    db_user = models.User(username=user.username, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    return {"message": "Admin created"}

# --- Projects Endpoints ---
@app.get("/projects", response_model=list[schemas.Project])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(auth.get_db)):
    projects = crud.get_projects(db, skip=skip, limit=limit)
    return projects

@app.post("/projects", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(auth.get_db)):
    return crud.create_project(db=db, project=project)

@app.put("/projects/{project_id}", response_model=schemas.Project)
def update_project(project_id: int, project: schemas.ProjectCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(auth.get_db)):
    db_project = crud.update_project(db, project_id, project)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

@app.delete("/projects/{project_id}")
def delete_project(project_id: int, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(auth.get_db)):
    crud.delete_project(db, project_id)
    return {"message": "Project deleted"}

# --- Learning Logs Endpoints ---
@app.get("/learning-logs", response_model=list[schemas.LearningLog])
def read_learning_logs(skip: int = 0, limit: int = 100, db: Session = Depends(auth.get_db)):
    logs = crud.get_learning_logs(db, skip=skip, limit=limit)
    return logs

@app.post("/learning-logs", response_model=schemas.LearningLog)
def create_learning_log(log: schemas.LearningLogCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(auth.get_db)):
    return crud.create_learning_log(db=db, log=log)

@app.delete("/learning-logs/{log_id}")
def delete_learning_log(log_id: int, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(auth.get_db)):
    crud.delete_learning_log(db, log_id)
    return {"message": "Log deleted"}

@app.post("/contact")
async def submit_contact(form: ContactForm, request: Request, background_tasks: BackgroundTasks):
    # 1. Honeypot Check (Silent Rejection)
    if form.honeypot:
        # It's a bot, pretend we sent it
        return {"message": "Message sent successfully"}

    # 2. Rate Limiting Check
    client_ip = request.client.host
    if not check_rate_limit(client_ip):
        raise HTTPException(status_code=429, detail="You can only send one message per day.")

    # 3. Send Email with Reply-To
    if not conf:
        print("Email configuration not found. Skipping email sending.")
        return {"message": "Message received (Email not configured)"}

    message = MessageSchema(
        subject=f"New Contact Form Submission from {form.name}",
        recipients=[os.getenv("MAIL_USERNAME")],
        body=f"""
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> {form.name}</p>
        <p><strong>Email:</strong> {form.email}</p>
        <p><strong>Message:</strong></p>
        <p>{form.message}</p>
        """,
        subtype=MessageType.html,
        headers={"Reply-To": form.email} # Allows you to reply directly to the sender
    )

    fm = FastMail(conf)
    background_tasks.add_task(fm.send_message, message)
    
    return {"message": "Message sent successfully"}
