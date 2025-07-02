from flask import jsonify, Blueprint
from flask_login import login_required, current_user
from app.models import AI_Monster
import base64, random

battle_routes = Blueprint('battle', __name__)


@battle_routes.route('/battle_page/users_monster/<int:monster_id>', methods=['GET'])
@login_required 
def users_monster(monster_id): 
    """
    Find a users AI generated monster and return its information
    """
    monster = AI_Monster.query.filter_by(id=monster_id,user_id=current_user.id).first()
    if not monster: 
        return jsonify({"exists": False}),404
    
    image = base64.b64encode(monster.image).decode('utf-8')
    monster = {
        'id': monster.id,
        "name":  monster.name,
        "type_of": monster.type_of,
        "description" : monster.description,
        "health": monster.health,
        "attack": monster.attack,
        "defense": monster.defense,
        'image':image
    }

    return jsonify(monster),200


@battle_routes.route('/battle_page/opponent_monster', methods=['GET'])
@login_required 
def opponent_monster(): 
    """
    Find a random pokemon to be the opposition to the users pokemon for a battle
    """
    monster_ids = [m.id for m in AI_Monster.query.filter(AI_Monster.user_id != current_user.id).all()]

    op_id = random.choice(monster_ids)
    monster = AI_Monster.query.get(op_id)
    
    image = base64.b64encode(monster.image).decode('utf-8')
    monster = {
        'id': monster.id,
        "name":  monster.name,
        "type_of": monster.type_of,
        "description" : monster.description,
        "health": monster.health,
        "attack": monster.attack,
        "defense": monster.defense,
        'image':image
    }

    return jsonify(monster),200