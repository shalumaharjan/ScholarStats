from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.connection import Base, engine

import models.user
import models.student_files
import models.fetch_jobs
import models.student_file_records
import models.result
import models.subject_result
import models.semester_analysis
import models.activity_log
import models.fetch_job_item

from routes.auth import router as auth_router
from routes.fetch_jobs import router as fetch_jobs_router
from routes.fetch_routes import router as fetch_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(fetch_jobs_router)
app.include_router(fetch_router)