import spacy
from slugify import slugify

nlp = spacy.load('en_core_web_sm')


def extract_topics(text):
    doc = nlp(text)

    topics = []
    print(doc.ents)
    for ent in doc.ents:
        # Filter out stop words and punctuation
        # if not token.is_stop and not token.is_punct:
        # topics.append(token.lemma_)
        slug = slugify(ent.text)

        topics.append({
            "identifier": slug,
            "text": ent.text,
            "label": ent.label_
        })
    return topics
