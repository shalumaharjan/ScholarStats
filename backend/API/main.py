from fastapi import FastAPI
from database import Base, engine
from auth import router

app = FastAPI()

# Create tables in app.db
Base.metadata.create_all(bind=engine)

app.include_router(router)