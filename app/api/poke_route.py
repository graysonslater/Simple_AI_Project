from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Pokemon, User_Pokemon, db, User

pokemon_routes = Blueprint('pokemon', __name__)


@pokemon_routes.route('/<int:pokeId>', methods=["GET"])
def get_pokemon_by_Id(pokeId):
    """
    Query a pokemon by ID
    """
    poke = Pokemon.query.filter_by(id=pokeId).first()
    if not poke:
        return None
    return jsonify(poke.to_dict())


@pokemon_routes.route('allPokemon', methods=["GET"])
def get_all_pokemon(pokeId):
    """
    Query a pokemon by ID
    """
    poke = Pokemon.query.filter_by(id=pokeId).first()
    if not poke:
        return None
    return jsonify(poke.to_dict())


@pokemon_routes.route('/addFavorite', methods=["POST"])
@login_required
def post_favorite():
    """
    Add a new favorited pokemon to the user throught he User_Pokemon join table. This new pokemon 
    can be accessed on the Front end throught the "user" object. Returns the updated
    user object which is then dispatched to update the user state
    """
    data = request.json
    # if data is an int just assign it to a variable!!!
    poke_id_front = data

    poke = User_Pokemon.query.filter_by(user_id = current_user.id, poke_id = poke_id_front).first()
    if poke:
        return jsonify({"error": "User has already favorited this pokemon"})
    
    poke = Pokemon.query.filter_by(id= poke_id_front).first()
    new_favorite = User_Pokemon(
        user_id = current_user.id,
        poke_id = poke_id_front
        )
    
    db.session.add(new_favorite)
    db.session.commit()

    user = User.query.filter_by(id = current_user.id).first()
    
    return jsonify(user.to_dict()), 200


@pokemon_routes.route('/removeFavorite', methods=["DELETE"])
@login_required
def delete_favorite():
    """
    Deletes a favorited pokemon from the users favorited list. 
    Returns the updated user object which is then dispatched to update the user state
    """
    data = request.json
    poke_id_front = data

    poke = User_Pokemon.query.filter_by(user_id = current_user.id, poke_id = poke_id_front).first()
    if not poke:
        return jsonify({"error": "Pokemon not found"}), 404
    
    db.session.delete(poke)
    db.session.commit()

    user = User.query.filter_by(id = current_user.id).first()

    return jsonify(user.to_dict()), 200