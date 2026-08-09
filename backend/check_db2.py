from database.connection import engine
from sqlalchemy import text

with engine.connect() as conn:
    result = conn.execute(text("DESCRIBE student_file_records;"))
    for row in result:
        print(row)