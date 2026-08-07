import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",   # leave empty if no password
    database="scholarstats"
)

print("Connected successfully!")

cursor = conn.cursor()