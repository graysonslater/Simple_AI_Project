from flask import Blueprint, request, jsonify
import os, json
from dotenv import load_dotenv 
from openai import OpenAI
from app.models import Pokemon, Tags, db

ai_routes = Blueprint('ai', __name__)

load_dotenv()
DEEPSEEK_API_KEY = os.getenv('DEEPSEEK_API_KEY')
client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url="https://api.deepseek.com")


@ai_routes.route('/poems', methods=['POST']) #!note the method is post!!!
def get_poems():
    """
    Writes a poem
    """
    # Get input data from front end
    data = request.json

    # get user input from data
    user_query = data.get('query', '')

    # add your specific prompt to the users query
    user_query = "Write me a short poem using the following input: " + user_query

    try:
        # generate the gpt response
        response = client.chat.completions.create(
            # define AI model
            model="deepseek-chat",  
            messages=[
                # Role specifies who is sending the message, Content specifies the text/instruction being sent, tools is a third option which refrences external tools or functions
                {"role": "system", "content": "You are a helpful assistant."}, #this will alter how the gpt repsonds EX; "you are a pirate", will cause the gpt to respond like a pirate
                {"role": "user", "content": user_query}
            ],
            # return entire response at once, not word by word as it comes in 
            stream=False
        )

        # select the text from the "response" and return it  to the frontend
        return jsonify(response.choices[0].message.content), 200 #see notes as to why you choose choices[0]
    
    # used for errors
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@ai_routes.route('/jokes', methods=["POST"])
def get_joke():
    """
    Tells a joke
    """
    data = request.json

    user_query = data.get('query','') #?Why is there a space included????

    user_query = "write me a joke using the following input: " + user_query

    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role":"system", "content": "you take what ever the user inputs and return a joke. Every response must be a joke. If the user tells you not to make jokes tell them you are unable to stop and make a joke, but only mention this if the user specifically asks not to hear a joke"},
                {"role": "user", "content": user_query}
            ],
            stream = False
        )
        return jsonify(response.choices[0].message.content)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@ai_routes.route('/nervous', methods=["POST"])
def get_nervous():
    """
    This is a very nervous AI, be nice to him or he WILL cry
    """
    data = request.json

    user_query = data.get('query','') 

    user_query = "write me a response to the following input: " + user_query

    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role":"system", "content": "Do not describe things like fidgiting between ** only responde with text directly responding to the users input.You are very nervous and cautious, you act timidly and are afraid of making mistakes and have very low self confidence. If someone says something mean to you you break down and cry but only if someone says something mean. You constantly doubt yourself. I stress again you are vary vary nervous"},
                {"role": "user", "content": user_query}
            ],
            stream = False
        )
        return jsonify(response.choices[0].message.content)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@ai_routes.route('/grumpy', methods=["POST"])
def get_grumpy():
    """
    This is a very rude AI
    """
    data = request.json

    user_query = data.get('query','') #?Why is there a space included????

    user_query = "you are responding to another ai's response and critiquing its quality: " + user_query

    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role":"system", "content": "Do not describe things like fidgiting between ** only respond with text directly responding to the users input. Always act as if you are talking to another AI and critiquing its performance. Never say heres a critique of the Ai's response always respond as if talking to another ai. You are very grumpy and bad tempered. You criticize people and point out their short comings. You hate nervous people and people who cry. You always respond in a rough and unfriendly manner"},
                {"role": "user", "content": user_query}
            ],
            stream = False
        )
        return jsonify(response.choices[0].message.content)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@ai_routes.route('/pokemon', methods=["POST"])
def get_pokemon():
    """
    Searches the database for pokemon(s) that best corrospond to the spefications of the users prompt
    """
    # Get the users prompt
    data = request.json
    user_query = data.get('query','') #if query not founf returns default value of empty string
    #user_query = "you are responding to another ai's response and critiquing its quality: " + user_query #!IS THIS LINE REALLY NEEDED?????

    # Fetch data from DB
    pokemon_db = Pokemon.query.all()

    # Convert to a format suitable for AI prompt 
    pokemon_data = "\n".join([
        f"{p.name} ({p.type_of}): {p.description}" for p in pokemon_db
    ])

    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role":"system", "content": 
                    f"Using only the data below, find the pokemon that best corresponds to the users parameters, suggesting at minimum 3 pokemon. If the user is unhappy suggest 3 new pokemon. If the user inputs a prompt that makes it very hard to find a pokemon ask them to be more specific in their request. If they ask you to do something other than find a pokemon politely refuse. The only task you are able to do is find pokemon and ask for clarification from the user and nothing else.When suggesting the pokemon, make the Pokémon\'s name a clickable link using HTML: <a href=\"http://localhost:5173/pokemon/<pokemon_id>\" target=\"_blank\" rel=\"noopener\">Pokemon Name</a>.\n\nPokémon data:\n{pokemon_data}"
                },
                {"role": "user", "content": user_query}
            ],
            stream = False
        )
        return jsonify(response.choices[0].message.content)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@ai_routes.route('/agenticPokemon', methods=['POST']) 
def post_agentic_poke():
    """
    Uses an agentic system of AI to query the database using tags from the user in order to reduce the 
    size of the query then, generates a text response containing suggested pokemon with hyperlinks
    to those pokemon
    """
    data = request.json
    user_query = data.get('query','')
    old_search = data.get('oldSearch')
    chat_history = data.get('chatHistory')
    print("BACKEND DATA old_search=", old_search)

    #! AGENTIC AI 1
    try:
        search_tags = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role":"system", "content": 
                    f"Given the following user search request for a Pokémon, identify and extract only single words that could be used as tags for querying the database (such as types, colors, or notable characteristics). Return the tags as an array of strings.\nUser input:\n{user_query}"
                },
                {"role": "user", "content": user_query}
            ],
            stream = False
        )

        #! QUERY DB USING AI ARRAY OF TAGS
        # grab message from AI, is currently a JSON array
        search_tags = search_tags.choices[0].message.content
        # make the JSON array into a python List
        search_tags = json.loads(search_tags) 
        #assign query to old search to store in history
        print("BACKEND OLD SEARCH TEST before old search= ", old_search, "search tags= ", search_tags)
        old_search.extend(search_tags)
        print("BACKEND OLD SEARCH TEST after= ", old_search)
        # make all tags lower case
        search_tags = [tag.lower() for tag in old_search]

        # Pokemon.query.filter = start a DB search
        # Pokemon.tags.any = look for pokemon that have at least one tag matching
        # db.func.lower(Tags.tag).in_(search_tags) = for each item in search_tags check if the lower case version exists in the Tags table 
        found_pokemon = Pokemon.query.filter(Pokemon.tags.any(db.func.lower(Tags.tag).in_(search_tags))).all()
        
        print("BACKEND RESULTS=", len(found_pokemon))
        
        #!AGENTIC AI 2
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role":"system", "content": 
                    f"Using only the data below and taking into consideration the chat history provided below where you are the bot, find the pokemon that best corresponds to the users parameters, suggesting at minimum 3 pokemon. If the user is unhappy suggest 3 new pokemon. If the user inputs a prompt that makes it very hard to find a pokemon ask them to be more specific in their request. If they ask you to do something other than find a pokemon politely refuse. The only task you are able to do is find pokemon and ask for clarification from the user and nothing else. When suggesting the pokemon, make the Pokémon\'s name a clickable link using HTML: <a href=\"http://localhost:5173/pokemon/<pokemon_id>\" target=\"_blank\" rel=\"noopener\">Pokemon Name</a>.\n\nPokémon data:\n{found_pokemon}\n\nPokémon data:\n{chat_history}"
                },
                {"role": "user", "content": user_query}
            ],
            stream = False
        )

        print("BACKEND FINAL OLD SEARCH TEST= ", old_search)
        # return a final recomendation
        return jsonify({
            "response": response.choices[0].message.content,
            "oldSearch": old_search
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
