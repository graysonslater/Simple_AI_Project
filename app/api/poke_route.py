from flask import Blueprint, jsonify
from app.models import Pokemon

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