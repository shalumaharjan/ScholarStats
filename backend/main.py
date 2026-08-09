from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.connection import Base, engine

from routes.result import router as results_router
from routes.analysis import router as analysis_router
from routes.auth import router as auth_router
from routes.fetch_jobs import router as fetch_jobs_router
from routes.fetch_routes import router as fetch_router
from routes.student_files import router as student_files_router
from routes.fetch_status import router as fetch_status_router
from routes.result_files import router as result_files_router
from routes import reports

import models

app = FastAPI(
    title="ScholarStats API"
)


# ============================================================
# CORS
# ============================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# ============================================================
# ROUTES
# ============================================================

app.include_router(results_router)
app.include_router(analysis_router)

app.include_router(auth_router)
app.include_router(fetch_jobs_router)
app.include_router(fetch_router)
app.include_router(student_files_router)
app.include_router(fetch_status_router)
app.include_router(result_files_router)
app.include_router(reports.router)

# ============================================================
# ROOT
# ============================================================
# @app.get("/")
# def root():
#     return {
#         "message": "ScholarStats API is running"
#     }