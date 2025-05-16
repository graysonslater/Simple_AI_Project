from app.models import db, AI_Monster, environment, SCHEMA
from sqlalchemy.sql import text
import os

#gets the directory where ai_monster.py is located
current_dir = os.path.dirname(__file__)
# This builds the path to seed_data.jpg inside AIMonsters
image_path1 = os.path.join(current_dir, 'AIMonsters', 'seed_data.jpg')
# open the file and assign to variable
with open(image_path1, 'rb') as img_file:
    image_bytes1 = img_file.read()


image_path2 = os.path.join(current_dir, 'AIMonsters', 'seed_data_2.jpg')
with open(image_path2, 'rb') as img_file:
    image_bytes2 = img_file.read()


image_path3 = os.path.join(current_dir, 'AIMonsters', 'seed_data_3.jpg')
with open(image_path3, 'rb') as img_file:
    image_bytes3 = img_file.read()

image_path4 = os.path.join(current_dir, 'AIMonsters', 'seed_data_4.jpg')
with open(image_path4, 'rb') as img_file:
    image_bytes4 = img_file.read()

def seed_AImon():
    AImon_list = [
        {   
            "user_id": 1,
            "name": "Monkey Thing",
            "type_of": "Grass",
            "description": "A small monkey Like pokemon that doesn't fit in well with others",
            "evolved": False,
            'attack': 100,
            'defense': 40,
            "image": image_bytes1,
            "permanent" : True
        },
        {   
            "user_id": 1,
            "name": "Doose",
            "type_of": "ice",
            "description": "Lives in cold northern climates, is very shy",
            "evolved": False,
            'attack': 70,
            'defense': 50,
            "image": image_bytes4,
            "permanent" : True
        },
        {   
            "user_id": 2,
            "name": "Crab Fish",
            "type_of": "water",
            "description": "A small water type pokemon that is brave and agressive",
            "evolved": False,
            'attack': 40,
            'defense': 100,
            "image": image_bytes2,
            "permanent" : True
        },
        {   
            "user_id": 3,
            "name": "Fire Rock",
            "type_of": "rock",
            "description": "A large fire breathing rock type that is vary rarely seen and very timid",
            "evolved": False,
            'attack': 40,
            'defense': 80,
            "image": image_bytes3,
            "permanent" : True
        }
    ]

    pokemonsters = []
    for pokemon_item in AImon_list:
        pokemon = AI_Monster(
            name = pokemon_item["name"],
            user_id = pokemon_item["user_id"],
            type_of = pokemon_item["type_of"],
            description = pokemon_item["description"],
            evolved = pokemon_item["evolved"],
            image = pokemon_item["image"],
            attack = pokemon_item["attack"],
            defense = pokemon_item["defense"],
            permanent = pokemon_item["permanent"]
        )
        pokemonsters.append(pokemon)
   
    db.session.add_all(pokemonsters)
    db.session.commit()

def undo_AImon():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM AI_Monster"))
        
    db.session.commit()