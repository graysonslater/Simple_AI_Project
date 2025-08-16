from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Pokemon_Tags(db.Model):
    __tablename__= 'pokemon_tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    tag_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('tags.id')), nullable=False)
    poke_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('pokemon.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    pokemon = db.relationship("Pokemon", back_populates="pokemon_tags", overlaps="tags,pokemon")
    tag = db.relationship("Tags", back_populates="pokemon_tags", overlaps="tags,pokemon")

    def to_dict(self):
        return {
            'tag_id': self.tag_id, 
            'poke_id': self.poke_id,
            'pokemon': self.pokemon.to_dict() if self.pokemon else None, 
            'tag': self.tag.to_dict() if self.tag else None 
        }