from database.connection import engine
from sqlalchemy import text

with engine.connect() as conn:
    conn.execute(text("ALTER TABLE student_files ADD COLUMN program VARCHAR(100);"))
    conn.execute(text("ALTER TABLE student_files ADD COLUMN academic_year VARCHAR(20);"))
    conn.execute(text("ALTER TABLE student_files ADD COLUMN academic_session VARCHAR(30);"))
    conn.execute(text("ALTER TABLE student_files ADD COLUMN semester INT;"))
    conn.execute(text("ALTER TABLE student_files MODIFY COLUMN uploaded_by INT NULL;"))
    conn.commit()
    print("Done — columns added, uploaded_by made nullable.")