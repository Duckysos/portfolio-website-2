from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    tags = Column(String) # Storing as comma-separated string or JSON string
    github_link = Column(String)
    color = Column(String)
    status = Column(String, default="completed")

class LearningLog(Base):
    __tablename__ = "learning_logs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    tags = Column(String) # Storing as comma-separated string or JSON string
    github_link = Column(String)
    date = Column(String) # Or DateTime if strict sorting needed, but string matches frontend for now
    position = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
