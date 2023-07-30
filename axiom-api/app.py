from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO

from services.nlp import extract_topics  # Import the function here

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

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
