from sqlalchemy.orm import Session
import models, schemas
import json

# Projects
def get_projects(db: Session, skip: int = 0, limit: int = 100):
    projects = db.query(models.Project).offset(skip).limit(limit).all()
    # Convert tags string back to list
    for p in projects:
        if p.tags:
            p.tags = json.loads(p.tags)
        else:
            p.tags = []
    return projects

def create_project(db: Session, project: schemas.ProjectCreate):
    db_project = models.Project(
        title=project.title,
        description=project.description,
        tags=json.dumps(project.tags),
        github_link=project.github_link,
        color=project.color
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    db_project.tags = json.loads(db_project.tags)
    return db_project

def delete_project(db: Session, project_id: int):
    db.query(models.Project).filter(models.Project.id == project_id).delete()
    db.commit()

def update_project(db: Session, project_id: int, project: schemas.ProjectCreate):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project:
        db_project.title = project.title
        db_project.description = project.description
        db_project.tags = json.dumps(project.tags)
        db_project.github_link = project.github_link
        db_project.color = project.color
        db_project.status = project.status
        db.commit()
        db.refresh(db_project)
        db_project.tags = json.loads(db_project.tags)
    return db_project

# Learning Logs
def get_learning_logs(db: Session, skip: int = 0, limit: int = 100):
    logs = db.query(models.LearningLog).order_by(models.LearningLog.position.asc()).offset(skip).limit(limit).all()
    for l in logs:
        if l.tags:
            l.tags = json.loads(l.tags)
        else:
            l.tags = []
    return logs

def create_learning_log(db: Session, log: schemas.LearningLogCreate):
    db_log = models.LearningLog(
        title=log.title,
        description=log.description,
        tags=json.dumps(log.tags),
        github_link=log.github_link,
        date=log.date
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    db_log.tags = json.loads(db_log.tags)
    return db_log

def delete_learning_log(db: Session, log_id: int):
    db.query(models.LearningLog).filter(models.LearningLog.id == log_id).delete()
    db.commit()

def update_learning_log_positions(db: Session, positions: list[dict]):
    for item in positions:
        log = db.query(models.LearningLog).filter(models.LearningLog.id == item["id"]).first()
        if log:
            log.position = item["position"]
    db.commit()
