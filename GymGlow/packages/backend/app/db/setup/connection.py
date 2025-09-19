from app.db.setup.base import Base
from app.db.setup.db_session import SessionFactory, engine
from app.db.seed.exercises import seed_exercises
from app.db.auth_crud import create_admin_user

def init_db():
    Base.metadata.create_all(bind=engine)
    session = SessionFactory()
    seed_exercises(session)
    create_admin_user(session)
    session.close()

init_db()

def get_db():
    db = SessionFactory()
    try:
        yield db
    finally:
        db.close()