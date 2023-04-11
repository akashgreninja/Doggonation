
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
  database="doggonation",
  port=3306

)


# all the queries for deployement







# check if the db connection is working
mycursor = mydb.cursor()
if mycursor:
    print("connected")





@app.route('/')
def route_path():
    return post_requests.startup()



@app.route('/getallposts')
def getall():
    return get_requests.getallposts(mycursor)


# post requests

@app.route('/addpost',methods=["POST"])
def addpost():
    data=request.json
    return post_requests.addpost(data,mycursor,mydb)

@app.route('/updatepost',methods=["POST"])
def updatepost():
    data=request.json
    return post_requests.updatepost(data,mycursor,mydb)

@app.route('/deletepost',methods=["POST"])
def deletepost():
    data=request.json
    return post_requests.deletepost(data['post_id'],mycursor,mydb)

@app.route('/like_post',methods=["POST"])
def like():
    data=request.json
    return post_requests.like(data['post_id'],mycursor,mydb)


@app.route('/rmlike_post',methods=["POST"])
def rmlike():
    data=request.json
    return post_requests.rmlike(data['post_id'],mycursor,mydb)
  
@app.route('/register',methods=["POST"])
def register():
    data=request.json
    
    return post_requests.register(data,mycursor,mydb)




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
