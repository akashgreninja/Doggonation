
# import all the external modules here
from flask import Flask,jsonify,abort
from dotenv import load_dotenv
import os
import pyodbc


# all internal modules here
from  getrequests import Put




app = Flask(__name__)
load_dotenv()
app_port = os.getenv('PORT')
azure_password = os.getenv('PASSWORD')
print(azure_password)
put_requests=Put()


conn = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};Server=tcp:doggonation.database.windows.net,1433;Database=doggonation;Uid=doggonation;Pwd='+azure_password+';Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')
print(conn)





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
