
# import all the external modules here
from flask import Flask,jsonify,abort,request,send_file
from dotenv import load_dotenv
import os
import pyodbc
import base64


# all internal modules here
from  getrequests import Put
from postrequests import Post




app = Flask(__name__)
load_dotenv()
app_port = os.getenv('PORT')
azure_password = os.getenv('PASSWORD')

put_requests=Put()
post_requests=Post()


conn = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};Server=tcp:doggonation.database.windows.net,1433;Database=doggonation;Uid=doggonation;Pwd='+azure_password+';Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')


query = 'SELECT COUNT(*) FROM information_schema.tables'
checkers=conn.execute(query)


result = checkers.fetchone()
print(f'There are {result[0]} tables in the  database')



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


@app.route('/addpost', methods=['POST'])
def add():  
    file = request.files['file']
    return post_requests.addpost(file,conn)

@app.route('/post', methods=['GET'])
def posts():  
    # query=f"select pic,mimetype from posts where post_id=11"
    # result=conn.execute(query)
    # result=result.fetchone()
    # my_blob_data=result.pic
    # my_blob_data= base64.b64encode(my_blob_data).decode('utf-8')
    # my_blob_mimetype =result.mimetype
    # return jsonify(data=my_blob_data,mimetype=my_blob_mimetype)
    return "not done"
   
if __name__ == '__main__':
    app.run(debug=True,port=app_port)
