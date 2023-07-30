import spacy

nlp = spacy.load('en_core_web_sm')

def extract_topics(text):
    doc = nlp(text)

    topics = []
    for token in doc:
        # Filter out stop words and punctuation
        if not token.is_stop and not token.is_punct:
            topics.append(token.lemma_)
    return topics
