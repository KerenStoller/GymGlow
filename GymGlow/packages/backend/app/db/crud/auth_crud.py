from sqlalchemy.orm import Session
from app.db.models import User
from app.db.models import RefreshToken
from passlib.context import CryptContext
from app.db.crud.workouts_crud import create_admin_workout
#password hashing
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return bcrypt_context.hash(password)

def check_for_admin(db: Session):
    return db.query(User).filter(User.email == "admin@admin").first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, name: str, email: str, password: str):
    db_user = User(name=name, email=email, hashed_password=hash_password(password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_admin_user(db: Session):
    if not check_for_admin(db):
        create_user(db, "admin", "admin@admin", "admin")
        create_admin_workout(db)
        db.commit()

def verify_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if user and bcrypt_context.verify(password, user.hashed_password):
        return user
    return None

def get_admin_id(db: Session):
    admin = db.query(User).filter(User.email == "admin@admin").first()
    if not admin:
        create_admin_user(db)
        admin = db.query(User).filter(User.email == "admin@admin").first()
    return {"admin_id": admin.id}

def save_refresh_token(db: Session, token: str, user_id):
    new_token_to_db = RefreshToken(user_id=user_id, token=token)
    db.add(new_token_to_db)
    db.commit()
    db.refresh(new_token_to_db)
    return

def validate_refresh_token(db: Session, token: str, user_id):
    refresh_token_db_entry = db.query(RefreshToken).filter(RefreshToken.token == token).first()
    if not refresh_token_db_entry or refresh_token_db_entry.user_id != user_id:
        raise Exception("Invalid refresh token")
    return True

def delete_refresh_token(db: Session, token: str):
    refresh_token_db_entry = db.query(RefreshToken).filter(RefreshToken.token == token).first()
    if refresh_token_db_entry:
        db.delete(refresh_token_db_entry)
        db.commit()
    return