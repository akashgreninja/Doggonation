# import all the external modules here
from flask import session

from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.query import Query

from flask import Flask, jsonify, abort, request, send_file
from dotenv import load_dotenv
import ast
import os
from flask_socketio import SocketIO, emit
from flask_socketio import SocketIO, emit, join_room, leave_room
import json
from collections import OrderedDict
from datetime import datetime


from flask_cors import CORS
from flask_login import (
    LoginManager,
    login_required,
    current_user,
    logout_user,
    login_user,
)

# import pyodbc   this was the azure connection
import base64

# import mysql.connector
import json

# all internal modules here
from getrequests import Get
from postrequests import Post


app = Flask(__name__)
app.config["SECRET_KEY"] = "13342"
socketio = SocketIO(app, cors_allowed_origins="*")


CORS(app)
load_dotenv()
app_port = os.getenv("PORT")

razorpay_secret = os.getenv("RAZORPAY_SECRET")
razorpay_key = os.getenv("RAZORPAY_KEY_ID")
key = os.getenv("KEY")
endpoint = os.getenv("ENDPOINT")
location= os.getenv("LOCATION")
apikey = os.getenv("API_KEY")
projectID = os.getenv("PROJECT_ID")
databaseID = os.getenv("DATABASE_ID")
chatID = os.getenv("CHAT_COLLECTION_ID")
userCollectionID = os.getenv("USER_COLLECTION_ID")
razorpayCollectionID = os.getenv("RAZORPAY_COLLECTION_ID")
postsCollectionID = os.getenv("POSTS_COLLECTION_ID")
tagsCollectionID = os.getenv("TAGS_COLLECTION_ID")
followCollectionID = os.getenv("FOLLOW_COLLECTION_ID")
get_requests = Get()
post_requests = Post()


app.app_context().push()


client = (
    Client()
    .set_endpoint("https://cloud.appwrite.io/v1")
    .set_project(f"{projectID}")
    .set_key(f"{apikey}")
)
databases = Databases(client)
# data={
#     "email":"akashuhulekal@gmail.com",
#     "password":"1234567890",
#     "user_id":12

# }
# result = databases.create_document('646ef96e9f67246e693d', '646efcfd07349b8a4ffd', 'unique()', data)
# print(result)


# check if the db connection is working

if client:
    print("connected")


@app.route("/")
def route_path():
    return post_requests.startup()


# @app.route("/gettags", methods=["POST"])
# def get_tags():
#     data = request.json
#     post_id = data["post_id"]
#     return get_requests.gettags(mycursor, post_id)


# @app.route("/explore", methods=["POST"])
# def explore():
#     return get_requests.explore(mycursor)


# @app.route("/getcomment", methods=["POST"])
# def get_comments():
#     data = request.json
#     post_id = data["post_id"]
#     return get_requests.getcomments(mycursor, post_id)


@app.route("/getallposts", methods=["POST"])
def getall():
    data = request.json
    user_id = data["user_id"]
    return get_requests.getallposts(user_id,databases, databaseID,postsCollectionID)


# # report
# @app.route("/report", methods=["POST"])
# def report():
#     data = request.json
#     return post_requests.report(data, mycursor, mydb)


# # post requests


@app.route("/addpost", methods=["POST"])
def addpost():
    data = request.json
    return post_requests.addpost(data, databases, databaseID,postsCollectionID,tagsCollectionID )


# @app.route("/updatepost", methods=["POST"])
# def updatepost():
#     data = request.json
#     return post_requests.updatepost(data, mycursor, mydb)


# @app.route("/deletepost", methods=["POST"])
# def deletepost():
#     data = request.json
#     return post_requests.deletepost(data["post_id"], mycursor, mydb)


@app.route("/like_post", methods=["POST"])
def like():
    data = request.json
    return post_requests.like(data["post_id"],databases,databaseID,postsCollectionID)


@app.route("/rmlike_post", methods=["POST"])
def rmlike():
    data = request.json
    return post_requests.rmlike(data["post_id"], databases,databaseID,postsCollectionID)


# # authentication routes and user routes
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    return post_requests.register(data, databases, databaseID, userCollectionID)


# @app.route("/update_profile", methods=["POST"])
# def updateprofile():
#     data = request.json
#     return post_requests.profile(data, mycursor, mydb)


# @app.route("/login", methods=["GET", "POST"])
# def login():
#     data = request.json
#     return post_requests.login(data, mycursor)


# @app.route("/getuser", methods=["GET", "POST"])
# def getuser():
#     data = request.json

#     return get_requests.get_user(data, mycursor, mydb)


@app.route("/follow", methods=["GET", "POST"])
def follow():
    data = request.json
    return post_requests.follow(data, databases,databaseID,followCollectionID)


@app.route("/unfollow", methods=["GET", "POST"])
def unfollow():
    data = request.json
    return post_requests.unfollow(data,databases,databaseID,followCollectionID)


# @app.route("/getfollowers", methods=["GET", "POST"])
# def follower():
#     data = request.json
#     return get_requests.followers(data, mycursor)


# @app.route("/getfollowing", methods=["GET", "POST"])
# def following():
#     data = request.json
#     return get_requests.following(data, mycursor)


@app.route("/search", methods=["POST"], strict_slashes=False)
def search():
    data = request.json
    return get_requests.search(data, databases, databaseID, userCollectionID)


# # ban and unban routes


# @app.route("/ban", methods=["POST"])
# def ban():
#     data = request.json
#     return post_requests.banned_ip(data, mycursor)


# # # following and unfollowing routes

# # @app.route('/follow', methods=['POST'])
# # def follow():
# #     data=request.json
# #     return post_requests.follow(data,mycursor,mydb)

# # @app.route('/unfollow', methods=['POST'])
# # def unfollow():
# #     data=request.json
# #     return post_requests.unfollow(data,mycursor,mydb)


# @app.route("/following_list", methods=["GET"])
# def following_list():
#     data = request.json
#     return get_requests.following_list(data, mycursor, mydb)


# @app.route("/followers_list", methods=["GET"])
# def followers_list():
#     data = request.json
#     return get_requests.followers_list(data, mycursor, mydb)


# # @app.errorhandler(404)
# # def page_not_found(e):
# #     data={"message":"route not found"}
# #     return data


# @app.route("/comment", methods=["POST", "GET"])
# def pushcomment():
#     data = request.json

#     return post_requests.addcomment(data, mycursor, mydb)


# @app.route("/likecomment", methods=["POST", "GET"])
# def like_comment():
#     data = request.json

#     return post_requests.likecomment(data, mycursor, mydb)


# @app.route("/unlikecomment", methods=["POST", "GET"])
# def unlike_comment():
#     data = request.json

#     return post_requests.removelikecomment(data, mycursor, mydb)


# # all the post requests
# # @app.route('/addpost', methods=['POST'])
# # def add():
# #     file = request.files['file']
# #     return post_requests.addpost(file,conn)

# # @app.route('/post', methods=['GET'])
# # def posts():
# #     # query=f"select pic,mimetype from posts where post_id=11"
# #     # result=conn.execute(query)
# #     # result=result.fetchone()
# #     # my_blob_data=result.pic
# #     # my_blob_data= base64.b64encode(my_blob_data).decode('utf-8')
# #     # my_blob_mimetype =result.mimetype
# #     # return jsonify(data=my_blob_data,mimetype=my_blob_mimetype)
# #     return "not done"


# # Razorpay integration code


# @app.route("/get-razorpay-key", methods=["GET"])
# def get_razorpay_key():
#     return get_requests.getRazorpayKey()


# @app.route("/create-order", methods=["POST"])
# def create_order():
#     data = request.json
#     amount = data["amount"]
#     return post_requests.create_order(razorpay_key, razorpay_secret, amount)


@app.route("/capture-payment", methods=["POST"])
def capture_payment():
    data = request.json
    return post_requests.capture_payment(data, databases, databaseID, razorpayCollectionID)


# # @app.route ('/verify-payment', methods=['POST'])
# # def verify_payment():
# #     data=request.json
# #     return post_requests.verify_payment(razorpay_key,razorpay_secret,data)


# # all the cloud routes


@app.route("/translate", methods=["POST"])
def translate():
    data = request.json
    return post_requests.translatefn(apikey,endpoint,location,data)


# @app.route("/msg", methods=["POST"])
# def msg():
#     data = request.json
#     return post_requests.msgfn(data, mycursor)


# # connected_users = {}
# room_id = []


@socketio.on("connectuser")
def handle_connect(data):
    sender = data["sender_id"]
    reciever = data["reciever_id"]
    query= Query.equal('sender_id', [sender])
    query2= Query.equal('reciever_id', [reciever])
    query3= Query.equal('sender_id', [reciever])
    query4= Query.equal('reciever_id', [sender])


    result = databases.list_documents(databaseID,  chatID,query=[query,query2])
    result2 = databases.list_documents(databaseID,  chatID,query=[query3,query4])

    if result and result2:
        print("dsdsd")
    # mycursor.execute(
    #     f"select * from `chats` where `sender_id`='{sender}' and `recipient_id`='{reciever}' or `sender_id`='{reciever}' and `recipient_id`='{sender}'"
    # )
    # result = mycursor.fetchone()
    # if result:
    #     room_id = result[0]
    else:
        data={
            "sender_id":sender,
            "reciever_id":reciever

        }
        result = databases.create_document(databaseID, chatID, 'unique()', data)
        # mycursor.execute(
        #     f"INSERT INTO `chats` (`sender_id`, `recipient_id`) VALUES ( '{sender}', '{reciever}'); "
        # )
        # mydb.commit()
        toad1 = databases.list_documents(databaseID,  chatID,query=[query,query2])
        toad2 = databases.list_documents(databaseID,  chatID,query=[query3,query4])
        # mycursor.execute(
        #     f"select * from `chats` where `sender_id`='{sender}' and `recipient_id`='{reciever}' or `sender_id`='{reciever}' and `recipient_id`='{sender}'"
        # )
        # result = mycursor.fetchone()
        if toad1 and toad2:
            print("dsdsd")
            room_id = result[0]
        ##
        print("created")
        

    #    join_room(room_id)
    socketio.emit("connection", {"data": room_id})


# @socketio.on("disconnect")
# def handle_disconnect():
#     pass


# @socketio.on("message")
# def handle_message(data):
#     room_id = data["room_id"]
#     sender_id = data["sender_id"]
#     text = data["data"]
#     print('room_id', room_id)
#     # newdict = f"{data['sender_id']:data['data']}"
#     mycursor.execute(f"select * from `chats` where `msg_id`='{room_id}' ")
#     result = mycursor.fetchone()
#     print(result)
#     existing_list = json.loads(str(result[0]))
#     timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
#     # print(result)

#     if result:
#         # try:

#             existing_list = ast.literal_eval(str(result[3]))
#             print(existing_list)
#             if True:
#                 new_element = {
#                     "sender": sender_id,
#                     "message": text,
#                     "time": timestamp,
#                 }
#                 print(new_element)
#                 existing_list.append(new_element)
#                 print(existing_list)
#                 updated_list_str = existing_list
#                 mycursor.execute(
#                     f'UPDATE `chats` SET `text` = "{updated_list_str}" WHERE `chats`.`msg_id` = "{room_id}";'
#                 )
#                 mydb.commit()
#                 socketio.emit(
#                     "messagerec", {"data": data["data"], "sender_id": data["sender_id"]}
#                 )


#         # except :
#         #     print("sdsd")


#     # else:
#     #     result=json.dumps(newdict)
#     #     mycursor.execute(f"UPDATE `chats` SET `text` = '{result}' WHERE `chats`.`msg_id` = '{room_id}';")


if __name__ == "__main__":
    # eventlet.monkey_patch()

    socketio.run(app, port=3003, debug=True)
