from app.models import db, Pokemon, environment, SCHEMA
from sqlalchemy.sql import text

def seed_pokemon():
    pokemon_list = [
        {
            "name": "Bulbasaur",
            "type_of": "Grass/Poison",
            "description": "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        },
        {
            "name": "Ivysaur",
            "type_of": "Grass/Poison",
            "description": "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
        },
        {
            "name": "Venusaur",
            "type_of": "Grass/Poison",
            "description": "The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
        },
        {
            "name": "Charmander",
            "type_of": "Fire",
            "description": "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
        },
        {
            "name": "Charmeleon",
            "type_of": "Fire",
            "description": "When it swings its burning tail, it elevates the temperature to unbearably high levels.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png"
        },
        {
            "name": "Charizard",
            "type_of": "Fire/Flying",
            "description": "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
        },
        {
            "name": "Squirtle",
            "type_of": "Water",
            "description": "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
        },
        {
            "name": "Wartortle",
            "type_of": "Water",
            "description": "Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png"
        },
        {
            "name": "Blastoise",
            "type_of": "Water",
            "description": "A brutal Pokémon with pressurized water jets on its shell. They are used for high-speed tackles.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png"
        },
        {
            "name": "Caterpie",
            "type_of": "Bug",
            "description": "Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png"
        },
        {
            "name": "Metapod",
            "type_of": "Bug",
            "description": "This Pokémon is vulnerable to attack while its shell is soft, exposing its weak and tender body.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png"
        },
        {
            "name": "Butterfree",
            "type_of": "Bug/Flying",
            "description": "In battle, it flaps its wings at great speed to release highly toxic dust into the air.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png"
        },
        {
            "name": "Weedle",
            "type_of": "Bug/Poison",
            "description": "Often found in forests, eating leaves. It has a sharp venomous stinger on its head.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png"
        },
        {
            "name": "Kakuna",
            "type_of": "Bug/Poison",
            "description": "Almost incapable of moving, this Pokémon can only harden its shell to protect itself from predators.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png"
        },
        {
            "name": "Beedrill",
            "type_of": "Bug/Poison",
            "description": "Flies at high speed and attacks using the large venomous stingers on its forelegs and tail.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png"
        },
        {
            "name": "Pidgey",
            "type_of": "Normal/Flying",
            "description": "A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png"
        },
        {
            "name": "Pidgeotto",
            "type_of": "Normal/Flying",
            "description": "Very protective of its sprawling territorial area, this Pokémon will fiercely peck at any intruder.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png"
        },
        {
            "name": "Pidgeot",
            "type_of": "Normal/Flying",
            "description": "When hunting, it skims the surface of water at high speed to pick off unwary prey such as Magikarp.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png"
        },
        {
            "name": "Rattata",
            "type_of": "Normal",
            "description": "Bites anything when it attacks. Small and very quick, it is a common sight in many places.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png"
        },
        {
            "name": "Raticate",
            "type_of": "Normal",
            "description": "It uses its whiskers to maintain its balance. It seems to slow down if they are cut off.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png"
        },
            {
        "name": "Spearow",
        "type_of": "Normal/Flying",
        "description": "Eats bugs in grassy areas. It has to flap its short wings at high speed to stay airborne.",
        "evolved": False,
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png"
        },
        {
            "name": "Fearow",
            "type_of": "Normal/Flying",
            "description": "With its huge and magnificent wings, it can keep aloft without ever having to land for rest.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/22.png"
        },
        {
            "name": "Ekans",
            "type_of": "Poison",
            "description": "Moves silently and stealthily. Eats the eggs of birds, such as Pidgey and Spearow, whole.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png"
        },
        {
            "name": "Arbok",
            "type_of": "Poison",
            "description": "It is rumored that the ferocious warning markings on its belly differ from area to area.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png"
        },
        {
            "name": "Pikachu",
            "type_of": "Electric",
            "description": "When several of these Pokémon gather, their electricity could build and cause lightning storms.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        },
        {
            "name": "Raichu",
            "type_of": "Electric",
            "description": "Its long tail serves as a ground to protect itself from its own high-voltage power.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png"
        },
        {
            "name": "Sandshrew",
            "type_of": "Ground",
            "description": "Burrows deep underground in arid locations far from water. It only emerges to hunt for food.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png"
        },
        {
            "name": "Sandslash",
            "type_of": "Ground",
            "description": "Curls up into a spiny ball when threatened. It can roll while curled up to attack or escape.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/28.png"
        },
        {
            "name": "Nidoran♀",
            "type_of": "Poison",
            "description": "Although small, its venomous barbs render this Pokémon dangerous. The female has smaller horns.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/29.png"
        },
        {
            "name": "Nidorina",
            "type_of": "Poison",
            "description": "The female’s horn develops slowly. Prefers physical attacks such as clawing and biting.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/30.png"
        },
        {
            "name": "Nidoqueen",
            "type_of": "Poison/Ground",
            "description": "Its hard scales provide strong protection. It uses its hefty bulk to execute powerful moves.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/31.png"
        },
        {
            "name": "Nidoran♂",
            "type_of": "Poison",
            "description": "Stiffens its ears to sense danger. The larger its horns, the more powerful its secreted venom.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/32.png"
        },
        {
            "name": "Nidorino",
            "type_of": "Poison",
            "description": "An aggressive Pokémon that is quick to attack. The horn on its head secretes a powerful venom.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/33.png"
        },
        {
            "name": "Nidoking",
            "type_of": "Poison/Ground",
            "description": "Uses its powerful tail in battle to smash, constrict, and break the bones of its prey.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/34.png"
        },
        {
            "name": "Clefairy",
            "type_of": "Fairy",
            "description": "Its magical and cute appeal has many admirers. It is rare and found only in certain areas.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png"
        },
        {
            "name": "Clefable",
            "type_of": "Fairy",
            "description": "A timid fairy Pokémon that is rarely seen. It will run and hide the moment it senses people.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/36.png"
        },
        {
            "name": "Vulpix",
            "type_of": "Fire",
            "description": "At the time of birth, it has just one tail. The tail splits from its tip as it grows older.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png"
        },
        {
            "name": "Ninetales",
            "type_of": "Fire",
            "description": "Very smart and very vengeful. Grabbing one of its many tails could result in a 1,000-year curse.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/38.png"
        },
        {
            "name": "Jigglypuff",
            "type_of": "Normal/Fairy",
            "description": "When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png"
        },
        {
            "name": "Wigglytuff",
            "type_of": "Normal/Fairy",
            "description": "The body is soft and rubbery. When angered, it will suck in air and inflate itself to an enormous size.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/40.png"
        },
        {
            "name": "Zubat",
            "type_of": "Poison/Flying",
            "description": "Forms colonies in perpetually dark places. Uses ultrasonic waves to identify and approach targets.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/41.png"
        },
        {
            "name": "Golbat",
            "type_of": "Poison/Flying",
            "description": "Once it strikes, it will not stop draining energy from the victim even if it gets too heavy to fly.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/42.png"
        },
        {
            "name": "Oddish",
            "type_of": "Grass/Poison",
            "description": "During the day, it keeps its face buried in the ground. At night, it wanders around sowing its seeds.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/43.png"
        },
        {
            "name": "Gloom",
            "type_of": "Grass/Poison",
            "description": "The fluid that oozes from its mouth isn’t drool. It is a nectar that is used to attract prey.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/44.png"
        },
        {
            "name": "Vileplume",
            "type_of": "Grass/Poison",
            "description": "The larger its petals, the more toxic pollen it contains. Its big head is heavy and hard to hold up.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/45.png"
        },
        {
            "name": "Paras",
            "type_of": "Bug/Grass",
            "description": "Burrows to suck tree roots. The mushrooms on its back grow by drawing nutrients from the bug host.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/46.png"
        },
        {
            "name": "Parasect",
            "type_of": "Bug/Grass",
            "description": "A host-parasite pair in which the parasite mushroom has taken over the host bug. Prefers damp places.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/47.png"
        },
        {
            "name": "Venonat",
            "type_of": "Bug/Poison",
            "description": "Its large eyes act as radars. In a bright place, you can see that they are clusters of many tiny eyes.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/48.png"
        },
        {
            "name": "Venomoth",
            "type_of": "Bug/Poison",
            "description": "The powdery scales on its wings are hard to remove. They also contain poison that leaks out on contact.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/49.png"
        },
        {
            "name": "Diglett",
            "type_of": "Ground",
            "description": "Lives about one yard underground where it feeds on plant roots. It sometimes appears above ground.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/50.png"
        },
        {
            "name": "Dugtrio",
            "type_of": "Ground",
            "description": "A team of Diglett triplets. It triggers huge earthquakes by burrowing 60 miles underground.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/51.png"
        },
            {
            "name": "Meowth",
            "type_of": "Normal",
            "description": "Adores round objects. It wanders the streets on a nightly basis to look for dropped loose change.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png"
        },
        {
            "name": "Persian",
            "type_of": "Normal",
            "description": "Although its fur has many admirers, it is tough to raise as a pet because of its fickle meanness.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/53.png"
        },
        {
            "name": "Psyduck",
            "type_of": "Water",
            "description": "While lulling its enemies with its vacant look, this wily Pokémon will use psychokinetic powers.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
        },
        {
            "name": "Golduck",
            "type_of": "Water",
            "description": "Often seen swimming elegantly by lakeshores. It is often mistaken for the Japanese monster, Kappa.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/55.png"
        },
        {
            "name": "Mankey",
            "type_of": "Fighting",
            "description": "Extremely quick to anger. It could be docile one moment then thrashing away the next instant.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/56.png"
        },
        {
            "name": "Primeape",
            "type_of": "Fighting",
            "description": "Always furious and tenacious to boot. It will not abandon chasing its quarry until it is caught.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/57.png"
        },
        {
            "name": "Growlithe",
            "type_of": "Fire",
            "description": "Very protective of its territory. It will bark and bite to repel intruders from its space.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/58.png"
        },
        {
            "name": "Arcanine",
            "type_of": "Fire",
            "description": "A legendary Pokémon in China. Many people are charmed by its grace and beauty while running.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/59.png"
        },
        {
            "name": "Poliwag",
            "type_of": "Water",
            "description": "Its newly grown legs prevent it from running. It appears to prefer swimming than trying to stand.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/60.png"
        },
        {
            "name": "Poliwhirl",
            "type_of": "Water",
            "description": "Capable of living in or out of water. When out of water, it sweats to keep its body slimy.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/61.png"
        },
        {
            "name": "Poliwrath",
            "type_of": "Water/Fighting",
            "description": "An adept swimmer at both the front crawl and breaststroke. Easily overtakes the best human swimmers.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/62.png"
        },
        {
            "name": "Abra",
            "type_of": "Psychic",
            "description": "Using its ability to read minds, it will identify impending danger and teleport to safety.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png"
        },
        {
            "name": "Kadabra",
            "type_of": "Psychic",
            "description": "It emits special alpha waves from its body that induce headaches just by being close by.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/64.png"
        },
        {
            "name": "Alakazam",
            "type_of": "Psychic",
            "description": "Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5,000.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png"
        },
        {
            "name": "Machop",
            "type_of": "Fighting",
            "description": "Loves to build its muscles. It trains in all styles of martial arts to become even stronger.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/66.png"
        },
        {
            "name": "Machoke",
            "type_of": "Fighting",
            "description": "Its muscular body is so powerful, it must wear a power-save belt to help regulate its motions.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/67.png"
        },
        {
            "name": "Machamp",
            "type_of": "Fighting",
            "description": "Using its heavy muscles, it throws powerful punches that can send the victim clear over the horizon.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/68.png"
        },
        {
            "name": "Bellsprout",
            "type_of": "Grass/Poison",
            "description": "A carnivorous Pokémon that traps and eats bugs. It uses its root feet to soak up needed moisture.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/69.png"
        },
        {
            "name": "Weepinbell",
            "type_of": "Grass/Poison",
            "description": "It spits out poison powder to immobilize the enemy and then finishes it with a spray of acid.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/70.png"
        },
        {
            "name": "Victreebel",
            "type_of": "Grass/Poison",
            "description": "Said to live in huge colonies deep in jungles, although no one has ever returned from there.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/71.png"
        },
        {
            "name": "Tentacool",
            "type_of": "Water/Poison",
            "description": "Drifts in shallow seas. Anglers who hook them by accident are often punished by its stinging acid.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/72.png"
        },
        {
            "name": "Tentacruel",
            "type_of": "Water/Poison",
            "description": "The tentacles are normally kept short. On hunts, they are extended to ensnare and immobilize prey.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/73.png"
        },
        {
            "name": "Geodude",
            "type_of": "Rock/Ground",
            "description": "Found in fields and mountains. Mistakes itself for a rock to avoid being attacked.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png"
        },
        {
            "name": "Graveler",
            "type_of": "Rock/Ground",
            "description": "Rolls down slopes to move. It rolls over any obstacle without slowing or changing its direction.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/75.png"
        },
        {
            "name": "Golem",
            "type_of": "Rock/Ground",
            "description": "Its boulder-like body is extremely hard. It can easily withstand dynamite blasts without taking damage.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/76.png"
        },
        {
            "name": "Ponyta",
            "type_of": "Fire",
            "description": "Its hooves are 10 times harder than diamonds. It can trample anything completely flat in little time.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/77.png"
        },
        {
            "name": "Rapidash",
            "type_of": "Fire",
            "description": "Very competitive, this Pokémon will chase anything that moves fast in the hopes of racing it.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/78.png"
        },
        {
            "name": "Slowpoke",
            "type_of": "Water/Psychic",
            "description": "Incredibly slow and dopey. It takes five seconds for it to feel pain when under attack.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/79.png"
        },
        {
            "name": "Slowbro",
            "type_of": "Water/Psychic",
            "description": "The tail has a Shellder firmly attached with a bite. As a result, the tail can't be used for fishing anymore.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/80.png"
        },
        {
            "name": "Magnemite",
            "type_of": "Electric/Steel",
            "description": "Uses antigravity to stay suspended. Appears without warning and uses Thunder Wave and similar moves.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/81.png"
        },
            {
            "name": "Magneton",
            "type_of": "Electric/Steel",
            "description": "Formed by several Magnemites linked together. They frequently appear when sunspots flare up.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/82.png"
        },
        {
            "name": "Farfetch'd",
            "type_of": "Normal/Flying",
            "description": "The sprig of green onions it holds is its weapon. It is used much like a metal sword.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/83.png"
        },
        {
            "name": "Doduo",
            "type_of": "Normal/Flying",
            "description": "A bird that makes up for its poor flying with its fast foot speed. Leaves giant footprints.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/84.png"
        },
        {
            "name": "Dodrio",
            "type_of": "Normal/Flying",
            "description": "Uses its three brains to execute complex plans. While two heads sleep, one head stays awake.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/85.png"
        },
        {
            "name": "Seel",
            "type_of": "Water",
            "description": "Loves freezing cold conditions. Relishes swimming in a frigid climate of around 14°F.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/86.png"
        },
        {
            "name": "Dewgong",
            "type_of": "Water/Ice",
            "description": "Stores thermal energy in its body. Swims at a steady 8 knots even in intensely cold waters.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/87.png"
        },
        {
            "name": "Grimer",
            "type_of": "Poison",
            "description": "Appears in filthy areas. Thrives by sucking up polluted sludge that is pumped out of factories.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/88.png"
        },
        {
            "name": "Muk",
            "type_of": "Poison",
            "description": "Thickly covered with a filthy, vile sludge. It is so toxic, even its footprints contain poison.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/89.png"
        },
        {
            "name": "Shellder",
            "type_of": "Water",
            "description": "Its hard shell repels any kind of attack. It is vulnerable only when its shell is open.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/90.png"
        },
        {
            "name": "Cloyster",
            "type_of": "Water/Ice",
            "description": "When attacked, it launches its horns in quick volleys. Its innards have never been seen.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/91.png"
        },
        {
            "name": "Gastly",
            "type_of": "Ghost/Poison",
            "description": "Almost invisible, this gaseous Pokémon cloaks the target and puts it to sleep without notice.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/92.png"
        },
        {
            "name": "Haunter",
            "type_of": "Ghost/Poison",
            "description": "Because of its ability to slip through block walls, it is said to be from another dimension.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/93.png"
        },
        {
            "name": "Gengar",
            "type_of": "Ghost/Poison",
            "description": "Under a full moon, this Pokémon likes to mimic the shadows of people and laugh at their fright.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"
        },
        {
            "name": "Onix",
            "type_of": "Rock/Ground",
            "description": "As it grows, the stone portions of its body harden to become similar to a diamond, though colored black.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png"
        },
        {
            "name": "Drowzee",
            "type_of": "Psychic",
            "description": "Puts enemies to sleep, then eats their dreams. Occasionally gets sick from eating bad dreams.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/96.png"
        },
        {
            "name": "Hypno",
            "type_of": "Psychic",
            "description": "When it locks eyes with an enemy, it will use a mix of psi moves such as Hypnosis and Confusion.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/97.png"
        },
        {
            "name": "Krabby",
            "type_of": "Water",
            "description": "Its pincers are not only powerful weapons, they are used for balance when walking sideways.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/98.png"
        },
        {
            "name": "Kingler",
            "type_of": "Water",
            "description": "The large pincer has 10,000-horsepower strength. However, it is so heavy, it is difficult to aim.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/99.png"
        },
        {
            "name": "Voltorb",
            "type_of": "Electric",
            "description": "Usually found in power plants. Easily mistaken for a Poké Ball, it has zapped many people.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/100.png"
        },
        {
            "name": "Electrode",
            "type_of": "Electric",
            "description": "It stores electric energy under very high pressure. It often explodes with little or no provocation.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/101.png"
        },
        {
            "name": "Exeggcute",
            "type_of": "Grass/Psychic",
            "description": "Often mistaken for eggs. When disturbed, they gather quickly and attack in swarms.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/102.png"
        },
        {
            "name": "Exeggutor",
            "type_of": "Grass/Psychic",
            "description": "Legend has it that on rare occasions, one of its heads will drop off and continue on as an Exeggcute.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/103.png"
        },
        {
            "name": "Cubone",
            "type_of": "Ground",
            "description": "Wears the skull of its deceased mother. Its cries echo inside the skull and come out as a sad melody.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/104.png"
        },
        {
            "name": "Marowak",
            "type_of": "Ground",
            "description": "The bone it holds is its key weapon. It throws the bone skillfully like a boomerang to KO targets.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/105.png"
        },
        {
            "name": "Hitmonlee",
            "type_of": "Fighting",
            "description": "When in a hurry, its legs lengthen progressively. It runs smoothly with extra long, loping strides.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/106.png"
        },
        {
            "name": "Hitmonchan",
            "type_of": "Fighting",
            "description": "While apparently doing nothing, it fires punches in lightning fast volleys that are impossible to see.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/107.png"
        },
        {
            "name": "Lickitung",
            "type_of": "Normal",
            "description": "Its tongue can be extended like a chameleon's. It leaves a tingling sensation when it licks enemies.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/108.png"
        },
        {
            "name": "Koffing",
            "type_of": "Poison",
            "description": "Because it stores several kinds of toxic gases in its body, it is prone to exploding without warning.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/109.png"
        },
        {
            "name": "Weezing",
            "type_of": "Poison",
            "description": "Where two kinds of poison gases meet, two Koffings can fuse into a Weezing over many years.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/110.png"
        },
        {
            "name": "Rhyhorn",
            "type_of": "Ground/Rock",
            "description": "Its massive bones are 1,000 times harder than human bones. It can easily knock a trailer flying.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/111.png"
        },
            {
            "name": "Rhydon",
            "type_of": "Ground/Rock",
            "description": "Protected by an armor-like hide, it is capable of living in molten lava of 3,600 degrees.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/112.png"
        },
        {
            "name": "Chansey",
            "type_of": "Normal",
            "description": "A rare and elusive Pokémon that is said to bring happiness to those who manage to catch it.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/113.png"
        },
        {
            "name": "Tangela",
            "type_of": "Grass",
            "description": "The whole body is swathed with wide vines that are similar to seaweed. Its vines shake as it walks.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/114.png"
        },
        {
            "name": "Kangaskhan",
            "type_of": "Normal",
            "description": "The infant rarely ventures out of its mother's protective pouch until it is three years old.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/115.png"
        },
        {
            "name": "Horsea",
            "type_of": "Water",
            "description": "Known to shoot down flying bugs with precision blasts of ink from the surface of the water.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/116.png"
        },
        {
            "name": "Seadra",
            "type_of": "Water",
            "description": "Capable of swimming backwards by rapidly flapping its wing-like pectoral fins and stout tail.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/117.png"
        },
        {
            "name": "Goldeen",
            "type_of": "Water",
            "description": "Its tail fin billows like an elegant ballroom dress, giving it the nickname of the Water Queen.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/118.png"
        },
        {
            "name": "Seaking",
            "type_of": "Water",
            "description": "In the autumn, its body becomes more fatty in preparation for surviving the cold of winter.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/119.png"
        },
        {
            "name": "Staryu",
            "type_of": "Water",
            "description": "An enigmatic Pokémon that can effortlessly regenerate any appendage it loses in battle.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/120.png"
        },
        {
            "name": "Starmie",
            "type_of": "Water/Psychic",
            "description": "Its central core glows with the seven colors of the rainbow. Some people value the core as a gem.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/121.png"
        },
        {
            "name": "Mr. Mime",
            "type_of": "Psychic/Fairy",
            "description": "If interrupted while it is miming, it will slap around the offender with its broad hands.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/122.png"
        },
        {
            "name": "Scyther",
            "type_of": "Bug/Flying",
            "description": "With ninja-like agility and speed, it can create the illusion that there is more than one.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/123.png"
        },
        {
            "name": "Jynx",
            "type_of": "Ice/Psychic",
            "description": "It seductively wiggles its hips as it walks. It can cause people to dance in unison with it.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/124.png"
        },
        {
            "name": "Electabuzz",
            "type_of": "Electric",
            "description": "Normally found near power plants, they can wander away and cause major blackouts in cities.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/125.png"
        },
        {
            "name": "Magmar",
            "type_of": "Fire",
            "description": "Its body always burns with an orange glow that enables it to hide perfectly among flames.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/126.png"
        },
        {
            "name": "Pinsir",
            "type_of": "Bug",
            "description": "If it fails to crush the victim in its pincers, it will swing it around and toss it hard.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/127.png"
        },
        {
            "name": "Tauros",
            "type_of": "Normal",
            "description": "When it targets an enemy, it charges furiously while whipping its body with its long tails.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/128.png"
        },
        {
            "name": "Magikarp",
            "type_of": "Water",
            "description": "In the distant past, it was somewhat stronger than the horribly weak descendants that exist today.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/129.png"
        },
        {
            "name": "Gyarados",
            "type_of": "Water/Flying",
            "description": "Rarely seen in the wild. Huge and vicious, it is capable of destroying entire cities in a rage.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png"
        },
        {
            "name": "Lapras",
            "type_of": "Water/Ice",
            "description": "A Pokémon that has been overhunted almost to extinction. It can ferry people across the water.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png"
        },
        {
            "name": "Ditto",
            "type_of": "Normal",
            "description": "Capable of copying an enemy's genetic code to instantly transform itself into a duplicate of the enemy.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
        },
        {
            "name": "Eevee",
            "type_of": "Normal",
            "description": "Its genetic code is irregular. It may mutate if it is exposed to radiation from element stones.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png"
        },
        {
            "name": "Vaporeon",
            "type_of": "Water",
            "description": "Lives close to water. Its long tail is ridged with a fin which is often mistaken for a mermaid's.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png"
        },
        {
            "name": "Jolteon",
            "type_of": "Electric",
            "description": "It accumulates negative ions in the atmosphere to blast out 10,000-volt lightning bolts.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png"
        },
        {
            "name": "Flareon",
            "type_of": "Fire",
            "description": "When storing thermal energy in its body, its temperature could soar to over 1,600 degrees.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png"
        },
        {
            "name": "Porygon",
            "type_of": "Normal",
            "description": "A Pokémon that consists entirely of programming code. Capable of moving freely in cyberspace.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/137.png"
        },
        {
            "name": "Omanyte",
            "type_of": "Rock/Water",
            "description": "Although long extinct, in rare cases, it can be genetically resurrected from fossils.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/138.png"
        },
        {
            "name": "Omastar",
            "type_of": "Rock/Water",
            "description": "Its sharp fangs suggest it was a carnivore. Its main means of attack was biting.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/139.png"
        },
        {
            "name": "Kabuto",
            "type_of": "Rock/Water",
            "description": "A Pokémon that was resurrected from a fossil found in what was once the ocean floor eons ago.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/140.png"
        },
        {
            "name": "Kabutops",
            "type_of": "Rock/Water",
            "description": "Its sleek shape is perfect for swimming. It slashes prey with its claws and drains the body fluids.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/141.png"
        },
            {
            "name": "Aerodactyl",
            "type_of": "Rock/Flying",
            "description": "A ferocious, prehistoric Pokémon that goes for the enemy's throat with its serrated saw-like fangs.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/142.png"
        },
        {
            "name": "Snorlax",
            "type_of": "Normal",
            "description": "Very lazy. Just eats and sleeps. As its rotund bulk builds, it becomes steadily more slothful.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png"
        },
        {
            "name": "Articuno",
            "type_of": "Ice/Flying",
            "description": "A legendary bird Pokémon that is said to appear to doomed people who are lost in icy mountains.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png"
        },
        {
            "name": "Zapdos",
            "type_of": "Electric/Flying",
            "description": "A legendary bird Pokémon that is said to appear when the sky turns dark and lightning showers down.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png"
        },
        {
            "name": "Moltres",
            "type_of": "Fire/Flying",
            "description": "A legendary bird Pokémon. As it flaps its flaming wings, even the night sky will turn red.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/146.png"
        },
        {
            "name": "Dratini",
            "type_of": "Dragon",
            "description": "Long considered a mythical Pokémon until recently when a small colony was found living underwater.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/147.png"
        },
        {
            "name": "Dragonair",
            "type_of": "Dragon",
            "description": "A mystical Pokémon that exudes a gentle aura. Has the ability to change climate conditions.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/148.png"
        },
        {
            "name": "Dragonite",
            "type_of": "Dragon/Flying",
            "description": "An extremely rarely seen marine Pokémon. Its intelligence is said to match that of humans.",
            "evolved": True,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png"
        },
        {
            "name": "Mewtwo",
            "type_of": "Psychic",
            "description": "It was created by a scientist after years of horrific gene splicing and DNA engineering experiments.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
        },
        {
            "name": "Mew",
            "type_of": "Psychic",
            "description": "So rare that it is still said to be a mirage by many experts. Only a few people have seen it worldwide.",
            "evolved": False,
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png"
        }
    ]

    pokemonsters = []
    for pokemon_item in pokemon_list:
        pokemon = Pokemon(
            name = pokemon_item["name"],
            type_of = pokemon_item["type_of"],
            description = pokemon_item["description"],
            evolved = pokemon_item["evolved"],
            image = pokemon_item["image"]
        )
        pokemonsters.append(pokemon)
   
    db.session.add_all(pokemonsters)
    db.session.commit()

def undo_pokemon():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pokemon"))
        
    db.session.commit()