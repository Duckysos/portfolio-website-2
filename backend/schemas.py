from pydantic import BaseModel
from typing import Optional, List

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class User(BaseModel):
    username: str

class UserInDB(User):
    hashed_password: str

class ProjectBase(BaseModel):
    title: str
    description: str
    tags: List[str]
    github_link: Optional[str] = None
    color: Optional[str] = "var(--primary-color)"
    status: Optional[str] = "completed"

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int

    class Config:
        orm_mode = True

class LearningLogBase(BaseModel):
    title: str
    description: str
    tags: List[str]
    github_link: Optional[str] = None
    date: str
    position: Optional[int] = 0

class LearningLogCreate(LearningLogBase):
    pass

class LearningLog(LearningLogBase):
    id: int

    class Config:
        orm_mode = True
