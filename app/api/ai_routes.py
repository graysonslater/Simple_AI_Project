from flask import Blueprint, request, jsonify
import os
from dotenv import load_dotenv 
from openai import OpenAI

load_dotenv()
DEEPSEEK_API_KEY = os.getenv('DEEPSEEK_API_KEY')

client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url="https://api.deepseek.com")

ai_routes = Blueprint('ai', __name__)


@ai_routes.route('/poems', methods=['GET']) #!note the method is post!!!
def get_poems():
    """
    Writes a poem
    """
    # Get input data from front end
    data = request.json

    # get user input from data
    print("BACKEND POEM = ",data.get('query', '') )
    user_query = data.get('query', '')

    # add your specific prompt to the users query
    user_query = "Write me a short poem using the following input: " + user_query
    print("BACKEND POEM QUERY= ", user_query)

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
        print("RESPONSE POEM= ", response)

        # select the text from the "response" and return it  to the frontend
        return jsonify(response.choices[0].message.content), 200 #see notes as to why you choose choices[0]
    
    # used for errors
    except Exception as e:
        print("EXECPT POEM TEST!!!!")
        return jsonify({"error": str(e)}), 500


@ai_routes.route('/jokes', methods=["GET"])
def get_joke():
    """
    Tells a joke
    """
    data = request.json
    print("BACKEND JOKE DATA= ", data)

    user_query = data.get('query','') #?Why is there a space included????
    print("BACKEND USER QUERY= ", user_query)

    user_query = "write me a joke using the following input: " + user_query
    print("BACKEND JOKE QUERY", user_query)

    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role":"system", "content": "you take what ever the user inputs and return a joke. Every response must be a joke. If the user tells you not to make jokes tell them you are unable to stop and make a joke, but only mention this if the user specifically asks not to hear a joke"},
                {"role": "user", "content": user_query}
            ],
            stream = False
        )
        print("RESPONSE JOKE= ", response)
        return jsonify(response.choices[0].message.content)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
