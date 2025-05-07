from app.models import db, User_Pokemon, environment, SCHEMA
from sqlalchemy.sql import text


def seed_UP():
    demo = User_Pokemon(
        user_id = 1, poke_id = 1
    )

    db.session.add(demo)
    db.session.commit()


def undo_UP():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM User_Pokemon"))
        
    db.session.commit()