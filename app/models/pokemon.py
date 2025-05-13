from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Pokemon(db.Model):
    __tablename__ = 'pokemon'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    type_of = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False, unique=True)
    evolved = db.Column(db.Boolean(), nullable=False)
    image = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    pokemon_user = db.relationship('User_Pokemon', back_populates='pokemon', cascade="all, delete-orphan")
    pokemon_tags = db.relationship("Pokemon_Tags", back_populates="pokemon")
    tags = db.relationship("Tags", secondary="pokemon_tags", back_populates="pokemon")
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type_of': self.type_of,
            'description': self.description,
            'evolved': self.evolved,
            'image': self.image,
            'tags' : [tag.tag for tag in self.tags]
        }