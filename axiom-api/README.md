# Axiom API

This is a Flask API used for topic extraction from texts using Spacy. It's a part of a larger project to create a decentralized application (DApp) to verify and discuss statements made by language models.

## Getting Started

### Prerequisites

This application requires Python 3.7 or above. You also need to install the required packages. To do so, navigate to the project root directory and run:

```bash
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```
## Running the Application

After installing the requirements, you can run the application by executing the following command in the project root directory:

```bash
python app.py
```

## API Usage

This API accepts POST requests at the endpoint `/extract_topics`. The request body should be a JSON object with a single key-value pair. The key should be `text`, and the value should be the text from which you want to extract topics.

Example Request:

```json
{
  "text": "Example text to extract topics from."
}
```

Please remember to replace `"Example text to extract topics from."` with the actual text you want to extract topics from.

