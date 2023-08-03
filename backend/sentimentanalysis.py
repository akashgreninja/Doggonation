
# some import notes these are the dependency modules you need to install before running this code
# pip install transformers
# pip install torch
# pip install scipy



# there is a error line below this ignore it its the vs code error
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from scipy.special import softmax

class SentimentAnalysis:
    def __init__(self, model_name="cardiffnlp/twitter-roberta-base-sentiment"):
        self.MODEL = model_name
        self.tokenizer = AutoTokenizer.from_pretrained(self.MODEL)
        self.model = AutoModelForSequenceClassification.from_pretrained(self.MODEL)

    def get_sentiment(self, text):
        try:
            # Tokenize input text and get model output
            encoded_text = self.tokenizer(text, return_tensors='pt')
            output = self.model(**encoded_text)
            scores = output.logits[0].detach().numpy()
            scores = softmax(scores)

            # Create a dictionary with sentiment label and confidence scores
            sentiment_labels = ['negative', 'neutral', 'positive']
            scores_dict = dict(zip(sentiment_labels, scores))

            # Determine the sentiment label with the highest confidence score
            max_sentiment_label = max(scores_dict, key=scores_dict.get)

            # Return the result as a dictionary
            result = {
                'sentiment_label': max_sentiment_label,
                'confidence_scores': scores_dict
            }
            return result

        except Exception as e:
            # Handle any potential errors and return an error message
            return {
                'error': str(e),
                'message': 'An error occurred during sentiment analysis.'
            }

# Example usage
if __name__ == "__main__":
    checkers = SentimentAnalysis()
    text = 'wow good boy'
    result = checkers.get_sentiment(text)
    print(result)


