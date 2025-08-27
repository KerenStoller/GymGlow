from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session

DATABASE_URL = "sqlite:///./myDB.db"

#TODO: when we move to production, update this.
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False}, echo = True)
Session = sessionmaker(bind=engine)

Base = declarative_base()

def init_db():
    import app.db.models # Ensure models are imported so that they are registered with Base
    Base.metadata.create_all(bind=engine)

init_db()

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()
