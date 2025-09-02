from app.db.connection import Session
from app.db.models import User
from passlib.context import CryptContext
#password hashing
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return bcrypt_context.hash(password)

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def check_for_admin(db: Session):
    return db.query(User).filter(User.email == "admin@admin").first()

def create_user(db: Session, name: str, email: str, password: str):
    db_user = User(name=name, email=email, hashed_password=hash_password(password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def verify_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if user and bcrypt_context.verify(password, user.hashed_password):
        return user
    return None