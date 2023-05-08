
# some import notes these are the dependency modules you need to install before running this code
# pip install transformers
# pip install torch
# pip install scipy



# there is a error line below this ignore it its the vs code error
from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification
from scipy.special import softmax
# from transformers import pipeline

class SentimentAnalysis:
    # vader= no grammer and no context

    def __init__(self):
        self.MODEL=f"cardiffnlp/twitter-roberta-base-sentiment"
        self.tokenizer = AutoTokenizer.from_pretrained(self.MODEL)
        self.model = AutoModelForSequenceClassification.from_pretrained(self.MODEL)
        # self.sent_pipeline=pipeline("sentiment-analysis")

    def get_sentiment(self,text):
        encoded_text=self.tokenizer(text,return_tensors='pt')
        output=self.model(**encoded_text)
        scores=output[0][0].detach().numpy()
        scores=softmax(scores)
        scores
        scores_dict={
            'negative':scores[0],
            'neutral':scores[1],
            'positive':scores[2]

        }

      
        maximunval=max(scores_dict, key=scores_dict.get)
        print(maximunval)


        # maximunval= self.sent_pipeline('thats bad')
        #if you want to use the transformers pipeline uncomment the following line and comment the above line
        if maximunval == 'positive':
            return 'positive'
        elif maximunval == 'negative' and scores_dict['negative'] > 0.6:
            return len(maximunval)
        else:
            return 'neutral'



checkers=SentimentAnalysis()
print(checkers.get_sentiment('wow good boy'))



