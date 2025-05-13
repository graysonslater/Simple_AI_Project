from app.models import db, Tags, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tags():
    tags_list = [
        {"tag" : "Grass"},
        {"tag" : "Fire"},
        {"tag" : "Water"},
        {"tag" : "Bug"},
        {"tag" : "Flying"},
        {"tag" : "Poison"},
        {"tag" : "Electric"},
        {"tag" : "Psychic"},
        {"tag" : "Rock"},
        {"tag" : "Normal"},
        {"tag" : "Red"},
        {"tag" : "Blue"},
        {"tag" : "Yellow"},
        {"tag" : "Green"},
        {"tag" : "Purple"},
        {"tag" : "Brown"},
        {"tag" : "Pink"},
        {"tag" : "Black"},
        {"tag" : "White"},
        {"tag" : "Orange"},
        {"tag" : "Tall"},
        {"tag" : "Short"}
    ]

    new_tags= []
    for tags in tags_list:
        tag = Tags(
            tag = tags["tag"],
        )
        new_tags.append(tag)
   
    db.session.add_all(new_tags)
    db.session.commit()

def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM Tags"))
        
    db.session.commit()