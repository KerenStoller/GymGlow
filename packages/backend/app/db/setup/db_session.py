from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./myDB.db"
#TODO: when we move to production, update this.
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False}, echo=False)
SessionFactory = sessionmaker(bind=engine)