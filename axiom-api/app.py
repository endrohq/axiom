from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO

from services.nlp import extract_topics  # Import the function here
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# Create a SocketIO instance
socketio = SocketIO(app, cors_allowed_origins="*")  # Enable CORS for SocketIO
# Enable CORS for all routes
CORS(app)

@app.route('/api/analyse', methods=['POST'])
def analyse():
    data = request.json
    text = data.get('text')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    topics = extract_topics(text)
    return jsonify({"topics": topics}), 200

@app.route('/api/scrape', methods=['POST'])
def scrape():
    url = request.json['url']
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract the title (use the website's title as default)
    title = soup.find('meta', property='og:title')
    if title:
        title = title['content']
    else:
        title = soup.title.string if soup.title else "No title found"

    # Extract the description
    description = soup.find('meta', property='og:description')
    description = description['content'] if description else "No description found"

    # Extract the image
    image = soup.find('meta', property='og:image')
    image = image['content'] if image else "No image found"

    return {
        'title': title,
        'description': description,
        'image': image,
    }

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
