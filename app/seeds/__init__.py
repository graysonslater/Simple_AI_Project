from flask.cli import AppGroup
from .users import seed_users, undo_users
from .pokemon import seed_pokemon, undo_pokemon
from .user_pokemon import seed_UP, undo_UP
from .tags import seed_tags, undo_tags
from .pokemon_tags import seed_poke_tags, undo_poke_tags

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()
        undo_pokemon()
        undo_UP()
        undo_tags()
        undo_poke_tags()
    seed_users()
    seed_pokemon()
    seed_UP()
    seed_tags()
    seed_poke_tags()
    

@seed_commands.command('undo')
def undo():
    undo_users()
    undo_pokemon()
    undo_UP()
    undo_tags()
    undo_poke_tags()