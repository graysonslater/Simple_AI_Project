from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class AI_Monster(db.Model):
    __tablename__ = 'ai_monster'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False, unique=True)
    type_of = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    evolved = db.Column(db.Boolean(), nullable=False)
    health =  db.Column(db.Integer, nullable=False)
    image = db.Column(db.LargeBinary, nullable=False)
    attack =  db.Column(db.Integer, nullable=False)
    defense =  db.Column(db.Integer, nullable=False)
    permanent = db.Column(db.Boolean(), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type_of': self.type_of,
            'description': self.description,
            'evolved': self.evolved,
            'permanent': self.permanent,
            'health': self.permanent,
            'attack': self.attack,
            'defense': self.defense,
            'image': self.image,
        }