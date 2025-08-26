from app.db.connection import Session
from app.db.models import User

def get_user_by_email(db : Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, name: str, email: str, hashed_password: str):
    db_user = User(name=name, email=email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def verify_user(db: Session, email: str, hashed_password: str):
    user = get_user_by_email(db, email)
    if user and user.hashed_password == hashed_password:
        return user
    return None