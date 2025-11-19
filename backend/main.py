from fastapi import FastAPI, BackgroundTasks, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",  # Vite default port
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Email Configuration
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
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
