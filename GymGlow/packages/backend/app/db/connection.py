from app.db.base import Base
from app.db.db_session import Session, engine
from app.db.seed.exercises import get_default_exercises
from app.db.auth_crud import create_admin_user

def seed_exercises(session: Session):
    from app.db.models import Exercise
    if not session.query(Exercise).first():  # Only seed if table is empty
        exercises = get_default_exercises()
        session.add_all(exercises)
        session.commit()

def init_db():
    import app.db.models  # Ensure models are imported so that they are registered with Base
    Base.metadata.create_all(bind=engine)
    session = Session()
    seed_exercises(session)
    create_admin_user(session)
    session.close()

init_db()

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()