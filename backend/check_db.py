from database.connection import engine
from sqlalchemy import text

with engine.connect() as conn:
    result = conn.execute(text("DESCRIBE student_files;"))
    for row in result:
        print(row)