from app.models import db, Pokemon_Tags, environment, SCHEMA
from sqlalchemy.sql import text

def seed_poke_tags():
    poke_tags_list = [
        # Bulbasaur
        {"tag_id": 1, "poke_id": 1},   # Grass
        {"tag_id": 6, "poke_id": 1},   # Poison
        {"tag_id": 14, "poke_id": 1},  # Green
        {"tag_id": 22, "poke_id": 1},  # Short

        # Ivysaur
        {"tag_id": 1, "poke_id": 2},
        {"tag_id": 6, "poke_id": 2},
        {"tag_id": 14, "poke_id": 2},
        {"tag_id": 21, "poke_id": 2},  # Tall

        # Venusaur
        {"tag_id": 1, "poke_id": 3},
        {"tag_id": 6, "poke_id": 3},
        {"tag_id": 14, "poke_id": 3},
        {"tag_id": 21, "poke_id": 3},

        # Charmander
        {"tag_id": 2, "poke_id": 4},   # Fire
        {"tag_id": 11, "poke_id": 4},  # Red
        {"tag_id": 22, "poke_id": 4},

        # Charmeleon
        {"tag_id": 2, "poke_id": 5},
        {"tag_id": 11, "poke_id": 5},
        {"tag_id": 21, "poke_id": 5},

        # Charizard
        {"tag_id": 2, "poke_id": 6},
        {"tag_id": 5, "poke_id": 6},   # Flying
        {"tag_id": 11, "poke_id": 6},
        {"tag_id": 21, "poke_id": 6},

        # Squirtle
        {"tag_id": 3, "poke_id": 7},   # Water
        {"tag_id": 12, "poke_id": 7},  # Blue
        {"tag_id": 22, "poke_id": 7},

        # Wartortle
        {"tag_id": 3, "poke_id": 8},
        {"tag_id": 12, "poke_id": 8},
        {"tag_id": 22, "poke_id": 8},

        # Blastoise
        {"tag_id": 3, "poke_id": 9},
        {"tag_id": 12, "poke_id": 9},
        {"tag_id": 21, "poke_id": 9},

        # Caterpie
        {"tag_id": 4, "poke_id": 10},  # Bug
        {"tag_id": 14, "poke_id": 10}, # Green
        {"tag_id": 22, "poke_id": 10},

        # Metapod
        {"tag_id": 4, "poke_id": 11},
        {"tag_id": 14, "poke_id": 11},
        {"tag_id": 22, "poke_id": 11},

        # Butterfree
        {"tag_id": 4, "poke_id": 12},
        {"tag_id": 5, "poke_id": 12},  # Flying
        {"tag_id": 19, "poke_id": 12}, # White
        {"tag_id": 21, "poke_id": 12},

        # Weedle
        {"tag_id": 4, "poke_id": 13},
        {"tag_id": 6, "poke_id": 13},
        {"tag_id": 20, "poke_id": 13}, # Orange
        {"tag_id": 22, "poke_id": 13},

        # Kakuna
        {"tag_id": 4, "poke_id": 14},
        {"tag_id": 6, "poke_id": 14},
        {"tag_id": 16, "poke_id": 14}, # Brown
        {"tag_id": 22, "poke_id": 14},

        # Beedrill
        {"tag_id": 4, "poke_id": 15},
        {"tag_id": 6, "poke_id": 15},
        {"tag_id": 5, "poke_id": 15},
        {"tag_id": 16, "poke_id": 15},
        {"tag_id": 21, "poke_id": 15},

        # Pidgey
        {"tag_id": 5, "poke_id": 16},
        {"tag_id": 10, "poke_id": 16}, # Normal
        {"tag_id": 16, "poke_id": 16},
        {"tag_id": 22, "poke_id": 16},

        # Pidgeotto
        {"tag_id": 5, "poke_id": 17},
        {"tag_id": 10, "poke_id": 17},
        {"tag_id": 16, "poke_id": 17},
        {"tag_id": 21, "poke_id": 17},

        # Pidgeot
        {"tag_id": 5, "poke_id": 18},
        {"tag_id": 10, "poke_id": 18},
        {"tag_id": 16, "poke_id": 18},
        {"tag_id": 21, "poke_id": 18},

        # Rattata
        {"tag_id": 10, "poke_id": 19},
        {"tag_id": 18, "poke_id": 19}, # Black
        {"tag_id": 22, "poke_id": 19},

        # Raticate
        {"tag_id": 10, "poke_id": 20},
        {"tag_id": 16, "poke_id": 20},
        {"tag_id": 21, "poke_id": 20},

        # Spearow
        {"tag_id": 5, "poke_id": 21},
        {"tag_id": 10, "poke_id": 21},
        {"tag_id": 20, "poke_id": 21}, # Orange
        {"tag_id": 22, "poke_id": 21},

        # Fearow
        {"tag_id": 5, "poke_id": 22},
        {"tag_id": 10, "poke_id": 22},
        {"tag_id": 16, "poke_id": 22},
        {"tag_id": 21, "poke_id": 22},

        # Ekans
        {"tag_id": 6, "poke_id": 23},  # Poison
        {"tag_id": 13, "poke_id": 23}, # Yellow
        {"tag_id": 22, "poke_id": 23},

        # Arbok
        {"tag_id": 6, "poke_id": 24},
        {"tag_id": 15, "poke_id": 24}, # Purple
        {"tag_id": 21, "poke_id": 24},

        # Pikachu
        {"tag_id": 7, "poke_id": 25},  # Electric
        {"tag_id": 13, "poke_id": 25}, # Yellow
        {"tag_id": 22, "poke_id": 25},

        # Raichu
        {"tag_id": 7, "poke_id": 26},
        {"tag_id": 20, "poke_id": 26}, # Orange
        {"tag_id": 21, "poke_id": 26},

        # Sandshrew
        {"tag_id": 16, "poke_id": 27}, # Brown
        {"tag_id": 10, "poke_id": 27}, # Normal
        {"tag_id": 22, "poke_id": 27},

        # Sandslash
        {"tag_id": 16, "poke_id": 28},
        {"tag_id": 10, "poke_id": 28},
        {"tag_id": 21, "poke_id": 28},

        # Nidoran♀
        {"tag_id": 6, "poke_id": 29},
        {"tag_id": 17, "poke_id": 29}, # Pink
        {"tag_id": 22, "poke_id": 29},

        # Nidorina
        {"tag_id": 6, "poke_id": 30},
        {"tag_id": 17, "poke_id": 30},
        {"tag_id": 22, "poke_id": 30},

        # Nidoqueen
        {"tag_id": 6, "poke_id": 31},
        {"tag_id": 12, "poke_id": 31}, # Blue
        {"tag_id": 21, "poke_id": 31},

        # Nidoran♂
        {"tag_id": 6, "poke_id": 32},
        {"tag_id": 15, "poke_id": 32}, # Purple
        {"tag_id": 22, "poke_id": 32},

        # Nidorino
        {"tag_id": 6, "poke_id": 33},
        {"tag_id": 15, "poke_id": 33},
        {"tag_id": 22, "poke_id": 33},

        # Nidoking
        {"tag_id": 6, "poke_id": 34},
        {"tag_id": 15, "poke_id": 34},
        {"tag_id": 21, "poke_id": 34},

        # Clefairy
        {"tag_id": 10, "poke_id": 35},
        {"tag_id": 17, "poke_id": 35}, # Pink
        {"tag_id": 22, "poke_id": 35},

        # Clefable
        {"tag_id": 10, "poke_id": 36},
        {"tag_id": 17, "poke_id": 36},
        {"tag_id": 21, "poke_id": 36},

        # Vulpix
        {"tag_id": 2, "poke_id": 37},  # Fire
        {"tag_id": 20, "poke_id": 37}, # Orange
        {"tag_id": 22, "poke_id": 37},

        # Ninetales
        {"tag_id": 2, "poke_id": 38},
        {"tag_id": 19, "poke_id": 38}, # White
        {"tag_id": 21, "poke_id": 38},

        # Jigglypuff
        {"tag_id": 10, "poke_id": 39},
        {"tag_id": 17, "poke_id": 39},
        {"tag_id": 22, "poke_id": 39},

        # Wigglytuff
        {"tag_id": 10, "poke_id": 40},
        {"tag_id": 17, "poke_id": 40},
        {"tag_id": 21, "poke_id": 40},

        # Zubat
        {"tag_id": 5, "poke_id": 41},  # Flying
        {"tag_id": 6, "poke_id": 41},  # Poison
        {"tag_id": 15, "poke_id": 41}, # Purple
        {"tag_id": 22, "poke_id": 41},

        # Golbat
        {"tag_id": 5, "poke_id": 42},
        {"tag_id": 6, "poke_id": 42},
        {"tag_id": 15, "poke_id": 42},
        {"tag_id": 21, "poke_id": 42},

                # Oddish
        {"tag_id": 1, "poke_id": 43},   # Grass
        {"tag_id": 6, "poke_id": 43},   # Poison
        {"tag_id": 14, "poke_id": 43},  # Green
        {"tag_id": 22, "poke_id": 43},

        # Gloom
        {"tag_id": 1, "poke_id": 44},
        {"tag_id": 6, "poke_id": 44},
        {"tag_id": 14, "poke_id": 44},
        {"tag_id": 22, "poke_id": 44},

        # Vileplume
        {"tag_id": 1, "poke_id": 45},
        {"tag_id": 6, "poke_id": 45},
        {"tag_id": 15, "poke_id": 45},  # Purple (flower)
        {"tag_id": 21, "poke_id": 45},

        # Paras
        {"tag_id": 4, "poke_id": 46},   # Bug
        {"tag_id": 1, "poke_id": 46},   # Grass
        {"tag_id": 16, "poke_id": 46},  # Brown
        {"tag_id": 22, "poke_id": 46},

        # Parasect
        {"tag_id": 4, "poke_id": 47},
        {"tag_id": 1, "poke_id": 47},
        {"tag_id": 16, "poke_id": 47},
        {"tag_id": 21, "poke_id": 47},

        # Venonat
        {"tag_id": 4, "poke_id": 48},
        {"tag_id": 6, "poke_id": 48},
        {"tag_id": 15, "poke_id": 48},  # Purple
        {"tag_id": 22, "poke_id": 48},

        # Venomoth
        {"tag_id": 4, "poke_id": 49},
        {"tag_id": 6, "poke_id": 49},
        {"tag_id": 19, "poke_id": 49},  # White
        {"tag_id": 21, "poke_id": 49},

        # Diglett
        {"tag_id": 16, "poke_id": 50},  # Brown
        {"tag_id": 10, "poke_id": 50},  # Normal
        {"tag_id": 22, "poke_id": 50},

        # Dugtrio
        {"tag_id": 16, "poke_id": 51},
        {"tag_id": 10, "poke_id": 51},
        {"tag_id": 21, "poke_id": 51},

        # Meowth
        {"tag_id": 10, "poke_id": 52},
        {"tag_id": 13, "poke_id": 52},  # Yellow
        {"tag_id": 22, "poke_id": 52},

        # Persian
        {"tag_id": 10, "poke_id": 53},
        {"tag_id": 13, "poke_id": 53},
        {"tag_id": 21, "poke_id": 53},

        # Psyduck
        {"tag_id": 3, "poke_id": 54},   # Water
        {"tag_id": 13, "poke_id": 54},  # Yellow
        {"tag_id": 22, "poke_id": 54},

        # Golduck
        {"tag_id": 3, "poke_id": 55},
        {"tag_id": 12, "poke_id": 55},  # Blue
        {"tag_id": 21, "poke_id": 55},

        # Mankey
        {"tag_id": 10, "poke_id": 56},
        {"tag_id": 19, "poke_id": 56},  # White
        {"tag_id": 22, "poke_id": 56},

        # Primeape
        {"tag_id": 10, "poke_id": 57},
        {"tag_id": 19, "poke_id": 57},
        {"tag_id": 21, "poke_id": 57},

        # Growlithe
        {"tag_id": 2, "poke_id": 58},   # Fire
        {"tag_id": 20, "poke_id": 58},  # Orange
        {"tag_id": 22, "poke_id": 58},

        # Arcanine
        {"tag_id": 2, "poke_id": 59},
        {"tag_id": 20, "poke_id": 59},
        {"tag_id": 21, "poke_id": 59},

        # Poliwag
        {"tag_id": 3, "poke_id": 60},   # Water
        {"tag_id": 12, "poke_id": 60},  # Blue
        {"tag_id": 22, "poke_id": 60},

        # Poliwhirl
        {"tag_id": 3, "poke_id": 61},
        {"tag_id": 12, "poke_id": 61},
        {"tag_id": 22, "poke_id": 61},

        # Poliwrath
        {"tag_id": 3, "poke_id": 62},
        {"tag_id": 12, "poke_id": 62},
        {"tag_id": 21, "poke_id": 62},

        # Abra
        {"tag_id": 8, "poke_id": 63},   # Psychic
        {"tag_id": 13, "poke_id": 63},  # Yellow
        {"tag_id": 22, "poke_id": 63},

        # Kadabra
        {"tag_id": 8, "poke_id": 64},
        {"tag_id": 13, "poke_id": 64},
        {"tag_id": 22, "poke_id": 64},

        # Alakazam
        {"tag_id": 8, "poke_id": 65},
        {"tag_id": 13, "poke_id": 65},
        {"tag_id": 21, "poke_id": 65},

        # Machop
        {"tag_id": 10, "poke_id": 66},
        {"tag_id": 12, "poke_id": 66},  # Blue
        {"tag_id": 22, "poke_id": 66},

        # Machoke
        {"tag_id": 10, "poke_id": 67},
        {"tag_id": 12, "poke_id": 67},
        {"tag_id": 21, "poke_id": 67},

        # Machamp
        {"tag_id": 10, "poke_id": 68},
        {"tag_id": 12, "poke_id": 68},
        {"tag_id": 21, "poke_id": 68},

        # Bellsprout
        {"tag_id": 1, "poke_id": 69},   # Grass
        {"tag_id": 6, "poke_id": 69},   # Poison
        {"tag_id": 14, "poke_id": 69},  # Green
        {"tag_id": 22, "poke_id": 69},

        # Weepinbell
        {"tag_id": 1, "poke_id": 70},
        {"tag_id": 6, "poke_id": 70},
        {"tag_id": 14, "poke_id": 70},
        {"tag_id": 22, "poke_id": 70},

        # Victreebel
        {"tag_id": 1, "poke_id": 71},
        {"tag_id": 6, "poke_id": 71},
        {"tag_id": 14, "poke_id": 71},
        {"tag_id": 21, "poke_id": 71},

        # Tentacool
        {"tag_id": 3, "poke_id": 72},   # Water
        {"tag_id": 6, "poke_id": 72},   # Poison
        {"tag_id": 12, "poke_id": 72},  # Blue
        {"tag_id": 22, "poke_id": 72},

        # Tentacruel
        {"tag_id": 3, "poke_id": 73},
        {"tag_id": 6, "poke_id": 73},
        {"tag_id": 12, "poke_id": 73},
        {"tag_id": 21, "poke_id": 73},

        # Geodude
        {"tag_id": 9, "poke_id": 74},   # Rock
        {"tag_id": 16, "poke_id": 74},  # Brown
        {"tag_id": 22, "poke_id": 74},

        # Graveler
        {"tag_id": 9, "poke_id": 75},
        {"tag_id": 16, "poke_id": 75},
        {"tag_id": 21, "poke_id": 75},

        # Golem
        {"tag_id": 9, "poke_id": 76},
        {"tag_id": 16, "poke_id": 76},
        {"tag_id": 21, "poke_id": 76},

        # Ponyta
        {"tag_id": 2, "poke_id": 77},   # Fire
        {"tag_id": 13, "poke_id": 77},  # Yellow
        {"tag_id": 22, "poke_id": 77},

        # Rapidash
        {"tag_id": 2, "poke_id": 78},
        {"tag_id": 13, "poke_id": 78},
        {"tag_id": 21, "poke_id": 78},

        # Slowpoke
        {"tag_id": 3, "poke_id": 79},   # Water
        {"tag_id": 8, "poke_id": 79},   # Psychic
        {"tag_id": 17, "poke_id": 79},  # Pink
        {"tag_id": 22, "poke_id": 79},

        # Slowbro
        {"tag_id": 3, "poke_id": 80},
        {"tag_id": 8, "poke_id": 80},
        {"tag_id": 17, "poke_id": 80},
        {"tag_id": 21, "poke_id": 80},

        # Magnemite
        {"tag_id": 7, "poke_id": 81},   # Electric
        {"tag_id": 12, "poke_id": 81},  # Blue
        {"tag_id": 22, "poke_id": 81},

        # Magneton
        {"tag_id": 7, "poke_id": 82},
        {"tag_id": 19, "poke_id": 82},  # White
        {"tag_id": 21, "poke_id": 82},

        # Farfetch'd
        {"tag_id": 5, "poke_id": 83},   # Flying
        {"tag_id": 10, "poke_id": 83},  # Normal
        {"tag_id": 16, "poke_id": 83},  # Brown
        {"tag_id": 22, "poke_id": 83},

        # Doduo
        {"tag_id": 5, "poke_id": 84},
        {"tag_id": 10, "poke_id": 84},
        {"tag_id": 16, "poke_id": 84},
        {"tag_id": 22, "poke_id": 84},

        # Dodrio
        {"tag_id": 5, "poke_id": 85},
        {"tag_id": 10, "poke_id": 85},
        {"tag_id": 16, "poke_id": 85},
        {"tag_id": 21, "poke_id": 85},

        # Seel
        {"tag_id": 3, "poke_id": 86},   # Water
        {"tag_id": 19, "poke_id": 86},  # White
        {"tag_id": 22, "poke_id": 86},

        # Dewgong
        {"tag_id": 3, "poke_id": 87},
        {"tag_id": 19, "poke_id": 87},
        {"tag_id": 21, "poke_id": 87},

        # Grimer
        {"tag_id": 6, "poke_id": 88},   # Poison
        {"tag_id": 15, "poke_id": 88},  # Purple
        {"tag_id": 22, "poke_id": 88},

        # Muk
        {"tag_id": 6, "poke_id": 89},
        {"tag_id": 15, "poke_id": 89},
        {"tag_id": 21, "poke_id": 89},

        # Shellder
        {"tag_id": 3, "poke_id": 90},   # Water
        {"tag_id": 12, "poke_id": 90},  # Blue
        {"tag_id": 22, "poke_id": 90},

        # Cloyster
        {"tag_id": 3, "poke_id": 91},
        {"tag_id": 12, "poke_id": 91},
        {"tag_id": 21, "poke_id": 91},

        # Gastly
        {"tag_id": 15, "poke_id": 92},  # Purple
        {"tag_id": 8, "poke_id": 92},   # Psychic (Ghost)
        {"tag_id": 22, "poke_id": 92},

        # Haunter
        {"tag_id": 15, "poke_id": 93},
        {"tag_id": 8, "poke_id": 93},
        {"tag_id": 22, "poke_id": 93},

        # Gengar
        {"tag_id": 15, "poke_id": 94},
        {"tag_id": 8, "poke_id": 94},
        {"tag_id": 21, "poke_id": 94},

        # Onix
        {"tag_id": 9, "poke_id": 95},   # Rock
        {"tag_id": 16, "poke_id": 95},  # Brown
        {"tag_id": 21, "poke_id": 95},

        # Drowzee
        {"tag_id": 8, "poke_id": 96},   # Psychic
        {"tag_id": 13, "poke_id": 96},  # Yellow
        {"tag_id": 22, "poke_id": 96},

        # Hypno
        {"tag_id": 8, "poke_id": 97},
        {"tag_id": 13, "poke_id": 97},
        {"tag_id": 21, "poke_id": 97},

        # Krabby
        {"tag_id": 3, "poke_id": 98},   # Water
        {"tag_id": 20, "poke_id": 98},  # Orange
        {"tag_id": 22, "poke_id": 98},

        # Kingler
        {"tag_id": 3, "poke_id": 99},
        {"tag_id": 20, "poke_id": 99},
        {"tag_id": 21, "poke_id": 99},

        # Voltorb
        {"tag_id": 7, "poke_id": 100},  # Electric
        {"tag_id": 11, "poke_id": 100}, # Red
        {"tag_id": 22, "poke_id": 100},

        # Electrode
        {"tag_id": 7, "poke_id": 101},
        {"tag_id": 19, "poke_id": 101}, # White
        {"tag_id": 21, "poke_id": 101},

        # Exeggcute
        {"tag_id": 1, "poke_id": 102},  # Grass
        {"tag_id": 8, "poke_id": 102},  # Psychic
        {"tag_id": 17, "poke_id": 102}, # Pink
        {"tag_id": 22, "poke_id": 102},

        # Exeggutor
        {"tag_id": 1, "poke_id": 103},
        {"tag_id": 8, "poke_id": 103},
        {"tag_id": 14, "poke_id": 103}, # Green
        {"tag_id": 21, "poke_id": 103},

        # Cubone
        {"tag_id": 16, "poke_id": 104}, # Brown
        {"tag_id": 10, "poke_id": 104}, # Normal
        {"tag_id": 22, "poke_id": 104},

        # Marowak
        {"tag_id": 16, "poke_id": 105},
        {"tag_id": 10, "poke_id": 105},
        {"tag_id": 21, "poke_id": 105},

        # Hitmonlee
        {"tag_id": 10, "poke_id": 106}, # Normal (Fighting)
        {"tag_id": 16, "poke_id": 106}, # Brown
        {"tag_id": 21, "poke_id": 106},

        # Hitmonchan
        {"tag_id": 10, "poke_id": 107},
        {"tag_id": 16, "poke_id": 107},
        {"tag_id": 21, "poke_id": 107},

        # Lickitung
        {"tag_id": 10, "poke_id": 108},
        {"tag_id": 17, "poke_id": 108}, # Pink
        {"tag_id": 21, "poke_id": 108},

        # Koffing
        {"tag_id": 6, "poke_id": 109},  # Poison
        {"tag_id": 15, "poke_id": 109}, # Purple
        {"tag_id": 22, "poke_id": 109},

        # Weezing
        {"tag_id": 6, "poke_id": 110},
        {"tag_id": 15, "poke_id": 110},
        {"tag_id": 21, "poke_id": 110},

        # Rhyhorn
        {"tag_id": 9, "poke_id": 111},  # Rock
        {"tag_id": 16, "poke_id": 111}, # Brown
        {"tag_id": 22, "poke_id": 111},

        # Rhydon
        {"tag_id": 9, "poke_id": 112},
        {"tag_id": 16, "poke_id": 112},
        {"tag_id": 21, "poke_id": 112},

        # Chansey
        {"tag_id": 10, "poke_id": 113}, # Normal
        {"tag_id": 17, "poke_id": 113}, # Pink
        {"tag_id": 21, "poke_id": 113},

        # Tangela
        {"tag_id": 1, "poke_id": 114},  # Grass
        {"tag_id": 14, "poke_id": 114}, # Green
        {"tag_id": 22, "poke_id": 114},

        # Kangaskhan
        {"tag_id": 10, "poke_id": 115}, # Normal
        {"tag_id": 16, "poke_id": 115}, # Brown
        {"tag_id": 21, "poke_id": 115},

        # Horsea
        {"tag_id": 3, "poke_id": 116},  # Water
        {"tag_id": 12, "poke_id": 116}, # Blue
        {"tag_id": 22, "poke_id": 116},

        # Seadra
        {"tag_id": 3, "poke_id": 117},
        {"tag_id": 12, "poke_id": 117},
        {"tag_id": 21, "poke_id": 117},

        # Goldeen
        {"tag_id": 3, "poke_id": 118},  # Water
        {"tag_id": 11, "poke_id": 118}, # Red
        {"tag_id": 22, "poke_id": 118},

        # Seaking
        {"tag_id": 3, "poke_id": 119},
        {"tag_id": 11, "poke_id": 119},
        {"tag_id": 21, "poke_id": 119},

        # Staryu
        {"tag_id": 3, "poke_id": 120},  # Water
        {"tag_id": 13, "poke_id": 120}, # Yellow
        {"tag_id": 22, "poke_id": 120},

        # Starmie
        {"tag_id": 3, "poke_id": 121},
        {"tag_id": 15, "poke_id": 121}, # Purple
        {"tag_id": 21, "poke_id": 121},

        # Mr. Mime
        {"tag_id": 8, "poke_id": 122},  # Psychic
        {"tag_id": 17, "poke_id": 122}, # Pink
        {"tag_id": 22, "poke_id": 122},

        # Scyther
        {"tag_id": 4, "poke_id": 123},  # Bug
        {"tag_id": 5, "poke_id": 123},  # Flying
        {"tag_id": 14, "poke_id": 123}, # Green
        {"tag_id": 21, "poke_id": 123},

        # Jynx
        {"tag_id": 8, "poke_id": 124},  # Psychic
        {"tag_id": 17, "poke_id": 124}, # Pink
        {"tag_id": 21, "poke_id": 124},

        # Electabuzz
        {"tag_id": 7, "poke_id": 125},  # Electric
        {"tag_id": 13, "poke_id": 125}, # Yellow
        {"tag_id": 21, "poke_id": 125},

        # Magmar
        {"tag_id": 2, "poke_id": 126},  # Fire
        {"tag_id": 11, "poke_id": 126}, # Red
        {"tag_id": 21, "poke_id": 126},

        # Pinsir
        {"tag_id": 4, "poke_id": 127},  # Bug
        {"tag_id": 16, "poke_id": 127}, # Brown
        {"tag_id": 21, "poke_id": 127},

        # Tauros
        {"tag_id": 10, "poke_id": 128}, # Normal
        {"tag_id": 16, "poke_id": 128}, # Brown
        {"tag_id": 21, "poke_id": 128},

        # Magikarp
        {"tag_id": 3, "poke_id": 129},  # Water
        {"tag_id": 11, "poke_id": 129}, # Red
        {"tag_id": 22, "poke_id": 129},

        # Gyarados
        {"tag_id": 3, "poke_id": 130},
        {"tag_id": 5, "poke_id": 130},  # Flying
        {"tag_id": 12, "poke_id": 130}, # Blue
        {"tag_id": 21, "poke_id": 130},

        # Lapras
        {"tag_id": 3, "poke_id": 131},
        {"tag_id": 12, "poke_id": 131}, # Blue
        {"tag_id": 21, "poke_id": 131},

        # Ditto
        {"tag_id": 10, "poke_id": 132}, # Normal
        {"tag_id": 17, "poke_id": 132}, # Pink
        {"tag_id": 22, "poke_id": 132},

        # Eevee
        {"tag_id": 10, "poke_id": 133}, # Normal
        {"tag_id": 16, "poke_id": 133}, # Brown
        {"tag_id": 22, "poke_id": 133},

        # Vaporeon
        {"tag_id": 3, "poke_id": 134},  # Water
        {"tag_id": 12, "poke_id": 134}, # Blue
        {"tag_id": 21, "poke_id": 134},

        # Jolteon
        {"tag_id": 7, "poke_id": 135},  # Electric
        {"tag_id": 13, "poke_id": 135}, # Yellow
        {"tag_id": 21, "poke_id": 135},

        # Flareon
        {"tag_id": 2, "poke_id": 136},  # Fire
        {"tag_id": 11, "poke_id": 136}, # Red
        {"tag_id": 21, "poke_id": 136},

        # Porygon
        {"tag_id": 10, "poke_id": 137}, # Normal
        {"tag_id": 19, "poke_id": 137}, # White
        {"tag_id": 22, "poke_id": 137},

        # Omanyte
        {"tag_id": 9, "poke_id": 138},  # Rock
        {"tag_id": 3, "poke_id": 138},  # Water
        {"tag_id": 12, "poke_id": 138}, # Blue
        {"tag_id": 22, "poke_id": 138},

        # Omastar
        {"tag_id": 9, "poke_id": 139},
        {"tag_id": 3, "poke_id": 139},
        {"tag_id": 12, "poke_id": 139},
        {"tag_id": 21, "poke_id": 139},

        # Kabuto
        {"tag_id": 9, "poke_id": 140},  # Rock
        {"tag_id": 3, "poke_id": 140},  # Water
        {"tag_id": 16, "poke_id": 140}, # Brown
        {"tag_id": 22, "poke_id": 140},

        # Kabutops
        {"tag_id": 9, "poke_id": 141},
        {"tag_id": 3, "poke_id": 141},
        {"tag_id": 16, "poke_id": 141},
        {"tag_id": 21, "poke_id": 141},

        # Aerodactyl
        {"tag_id": 9, "poke_id": 142},  # Rock
        {"tag_id": 5, "poke_id": 142},  # Flying
        {"tag_id": 16, "poke_id": 142}, # Brown
        {"tag_id": 21, "poke_id": 142},

        # Snorlax
        {"tag_id": 10, "poke_id": 143}, # Normal
        {"tag_id": 16, "poke_id": 143}, # Brown
        {"tag_id": 21, "poke_id": 143},

        # Articuno
        {"tag_id": 5, "poke_id": 144},  # Flying
        {"tag_id": 12, "poke_id": 144}, # Blue
        {"tag_id": 21, "poke_id": 144},

        # Zapdos
        {"tag_id": 5, "poke_id": 145},
        {"tag_id": 7, "poke_id": 145},  # Electric
        {"tag_id": 13, "poke_id": 145}, # Yellow
        {"tag_id": 21, "poke_id": 145},

        # Moltres
        {"tag_id": 5, "poke_id": 146},
        {"tag_id": 2, "poke_id": 146},  # Fire
        {"tag_id": 11, "poke_id": 146}, # Red
        {"tag_id": 21, "poke_id": 146},

        # Dratini
        {"tag_id": 12, "poke_id": 147}, # Blue
        {"tag_id": 22, "poke_id": 147},

        # Dragonair
        {"tag_id": 12, "poke_id": 148},
        {"tag_id": 21, "poke_id": 148},

        # Dragonite
        {"tag_id": 5, "poke_id": 149},  # Flying
        {"tag_id": 20, "poke_id": 149}, # Orange
        {"tag_id": 21, "poke_id": 149},

        # Mewtwo
        {"tag_id": 8, "poke_id": 150},  # Psychic
        {"tag_id": 19, "poke_id": 150}, # White
        {"tag_id": 21, "poke_id": 150},

        # Mew
        {"tag_id": 8, "poke_id": 151},  # Psychic
        {"tag_id": 17, "poke_id": 151}, # Pink
        {"tag_id": 22, "poke_id": 151},
    ]
        
    new_tags= []
    for tags in poke_tags_list:
        tag = Pokemon_Tags(
            tag_id = tags["tag_id"],
            poke_id = tags["poke_id"],
        )
        new_tags.append(tag)

    db.session.add_all(new_tags)
    db.session.commit()

def undo_poke_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM Pokemon_Tags"))
        
    db.session.commit()