from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Tags(db.Model):
    __tablename__= 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(50), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    pokemon_tags = db.relationship("Pokemon_Tags", back_populates="tag")
    pokemon = db.relationship("Pokemon", secondary="pokemon_tags", back_populates="tags")

    def to_dict(self):
        return {
            'tag': self.tag, 
            'pokemon' : [poke.name for poke in self.pokemon]
        }