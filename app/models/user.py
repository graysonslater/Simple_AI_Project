from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    
    user_pokemon = db.relationship('User_Pokemon', back_populates='user', cascade="all, delete-orphan")
    ai_monsters = db.relationship("AI_Monster", backref="users", cascade="all, delete-orphan")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            # this line allows you to access the user_pokemon table through the user object
            'user_pokemon': [users_poke.to_dict() for users_poke in self.user_pokemon],
            'ai_monsters': [{
                'id': monster.id, 
                'name': monster.name, 
                'type_of': monster.type_of, 
                "description": monster.description, 
                'evolved': monster.evolved   
            } for monster in self.ai_monsters]

        }
