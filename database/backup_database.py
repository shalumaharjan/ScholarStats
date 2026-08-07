import shutil
from datetime import datetime
from pathlib import Path


database_file = Path("exam_automation.db")

backup_folder = Path("../backups")

backup_folder.mkdir(exist_ok=True)


timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

backup_file = backup_folder / f"exam_automation_backup_{timestamp}.db"


shutil.copy2(database_file, backup_file)


print("Database backup created successfully!")
print(f"Backup location: {backup_file}")