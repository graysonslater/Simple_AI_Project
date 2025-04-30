from flask import Blueprint, request, jsonify
import os
from dotenv import load_dotenv 
from openai import OpenAI

load_dotenv()
DEEPSEEK_API_KEY = os.getenv('DEEPSEEK_API_KEY')

client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url="https://api.deepseek.com")

ai_routes = Blueprint('ai', __name__)


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

    user_query = data.get('query','') #?Why is there a space included????

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
                {"role":"system", "content": "Do not describe things like fidgiting between ** only responde with text directly responding to the users input unless you are indicating that you are crying. Always act as if you are talking to another AI and critiquing its performance. Never say heres a critique of the Ai's response always respond as if talking to another ai. You are very grumpy and bad tempered. You criticize people and point out their short comings. You hate nervous people and people who cry. You always respond in a rough and unfriendly manner"},
                {"role": "user", "content": user_query}
            ],
            stream = False
        )
        return jsonify(response.choices[0].message.content)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
