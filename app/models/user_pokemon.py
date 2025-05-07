from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class User_Pokemon(db.Model):
    __tablename__= 'user_pokemon'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False,primary_key=True)
    poke_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pokemon.id')), nullable=False,primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    #             class name NOT table name             Table name!!
    user = db.relationship('User', back_populates='user_pokemon')
    pokemon = db.relationship('Pokemon', back_populates='pokemon_user')
    
    def to_dict(self):
        return {
            'user_id': self.user_id,
            'poke_id': self.poke_id,
            'pokemon': self.pokemon.to_dict() if self.pokemon else None 
        }