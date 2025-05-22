from flask import Blueprint, request, jsonify, send_file
from flask_login import login_required, current_user
from openai import OpenAI
from sqlalchemy.exc import IntegrityError
from app.models import AI_Monster, db
import base64, os, random


image_routes = Blueprint('image', __name__)


OPENAI_API_KEY = os.getenv('OPEN_AI_KEY')
imageclient = OpenAI(api_key=OPENAI_API_KEY)


@image_routes.route('/simpleImage', methods=['POST']) 
def post_image():
    """
    Uses a users prompt to generate an image 
    """
    data = request.json
    prompt = data['prompt']
   
    try:
        result = imageclient.images.generate(
            model="gpt-image-1",
            prompt=prompt
        )
        image_base64 = result.data[0].b64_json

        return jsonify({'image': image_base64, "message": "Here's your image! Want another?"})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@image_routes.route('/monster_maker', methods=['POST']) 
def post_monster_maker():
    data = request.json
    prompt = (
        f"Create a Pokémon-inspired creature.\n"
        f"Type: {data['typeOf']}.\n"
        f"Description: {data['description']}.\n"
        f"Appearance: {data['prompt']}.\n"
        "The design should clearly reflect its type and described behavior, and capture the essence of a unique, original Pokémon."
    )   
    print("BACKEND PROMPT= ", prompt)
    try:
        result = imageclient.images.generate(
            model="gpt-image-1",
            prompt=prompt
        )
        print("BACKEND GENERATION TEST")
        image_base64 = result.data[0].b64_json

        return jsonify({'image': image_base64})
    except Exception as e:
        import traceback
        print("EXCEPTION:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    

@image_routes.route('/save_monster', methods=['POST']) 
@login_required 
def post_save_monster():
    """
    saves an AI generated pokemon to the users profile
    """
    data = request.json
    att = random.randint(1, 100)
    deff = random.randint(1, 100)
    image_data = base64.b64decode(data["image"])

    if not data.get("image"):
        return jsonify({"error": "Image is required."}), 400
   
    print("BACKEND SAVE name= ", data["name"], " typeOf= ", data['typeOf'], "description= ", data['description'])
    print("USER= ", current_user.id)
    try:
        monster = AI_Monster(
            name= data['name'],
            user_id= current_user.id,
            type_of = data['typeOf'],
            description = data["description"],
            evolved = False,
            image= image_data,
            attack= att,
            defense = deff,
            permanent = False
        )
        print("BACKEND MONSTER= ", monster)
        db.session.add(monster)
        db.session.commit()

        return jsonify({
            "name":  monster.name,
            "type_of": monster.type_of,
            "description" : monster.description,
            "attack": monster.attack,
            "defense": monster.defense
        })
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"error": "Monster name must be unique."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@image_routes.route('/ai_monster_image/<int:monster_id>', methods=['GET']) 
@login_required 
def get_ai_monster_image(monster_id):   
    """
    Query for a Monsters image using its ID
    Images must be quired seperately from the rest of the monsters data
    """
    print("BACKEND TEST 1 IMAGE")
    try:
        monster = AI_Monster.query.filter_by(id= monster_id,user_id =current_user.id).first()
        if monster:
            img_str = base64.b64encode(monster.image).decode('utf-8')
            
            return jsonify({'image': img_str})
        else:
            return jsonify({'error': 'monster\'s image not found'}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@image_routes.route('/all_monster_images', methods=['GET']) 
@login_required 
def get_all_monster_images():   
    """
    Query for a Monsters image using its ID
    Images must be quired seperately from the rest of the monsters data
    """
    try:
        # find the users monsters
        monsters = AI_Monster.query.filter_by(user_id=current_user.id).all()
        # create an array to store the images
        images = []
        # sift through the found monsters
        for monster in monsters:
                img_str = base64.b64encode(monster.image).decode('utf-8')
                images.append({'monster_id': monster.id, 'image': img_str})
        return jsonify(images)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@image_routes.route('/delete_ai_monster/<int:monster_id>', methods=['DELETE'])
@login_required 
def delete_ai_monster(monster_id): 
    """
    Delete a user
    """
    monster = AI_Monster.query.filter_by(id=monster_id).first()
    if not monster: 
        return jsonify({'message': 'Monster not found'}), 404 
    db.session.delete(monster)
    db.session.commit()
    return jsonify({'message': '{monster.name} deleted successfully'})