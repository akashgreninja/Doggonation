
# import all the external modules here
from flask import Flask,jsonify,abort
from dotenv import load_dotenv
import os


# all internal modules here
from  getrequests import Put



app = Flask(__name__)
load_dotenv()
app_port = os.getenv('PORT')
put_requests=Put()


@app.route('/')
def route_path():
    return put_requests.startup()

@app.errorhandler(404)
def page_not_found(e):
    data={"message":"page not found"}
    return data


@app.route('/example', methods=['GET'])
def example():
    data ="www"
    return jsonify(data)





if __name__ == '__main__':
    app.run(debug=True,port=app_port)
