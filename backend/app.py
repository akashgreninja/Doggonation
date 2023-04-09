
# import all the external modules here
from flask import Flask,jsonify,abort,request,send_file
from dotenv import load_dotenv
import os
# import pyodbc   this was the azure connection
import base64
import mysql.connector

# all internal modules here
from  getrequests import Get
from postrequests import Post




app = Flask(__name__)
load_dotenv()
app_port = os.getenv('PORT')
azure_password = os.getenv('PASSWORD')
azure_database = os.getenv('DATABASE')

get_requests=Get()
post_requests=Post()



# AZURE CONNECTION


# conn = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};Server=tcp:doggonation.database.windows.net,1433;Database='+azure_database+';Uid='+azure_database+';Pwd='+azure_password+';Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="doggonation"
)

# create a cursor object
mycursor = mydb.cursor()
print(mycursor)




@app.route('/')
def route_path():
    return post_requests.startup()







# post requests

@app.route('/register',methods=["POST"])
def register():
    data=request.json
    return post_requests.register(data,mycursor)





# @app.errorhandler(404)
# def page_not_found(e):
#     data={"message":"route not found"}
#     return data


@app.route('/example', methods=['GET','POST'])
def login():
    data=request.json
    return  post_requests.login(data,mycursor)









# all the post requests
# @app.route('/addpost', methods=['POST'])
# def add():  
#     file = request.files['file']
#     return post_requests.addpost(file,conn)

# @app.route('/post', methods=['GET'])
# def posts():  
#     # query=f"select pic,mimetype from posts where post_id=11"
#     # result=conn.execute(query)
#     # result=result.fetchone()
#     # my_blob_data=result.pic
#     # my_blob_data= base64.b64encode(my_blob_data).decode('utf-8')
#     # my_blob_mimetype =result.mimetype
#     # return jsonify(data=my_blob_data,mimetype=my_blob_mimetype)
#     return "not done"
   
if __name__ == '__main__':
    app.run(debug=True,port=app_port)
