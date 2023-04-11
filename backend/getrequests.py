from flask import Flask, abort,jsonify
from werkzeug.security import generate_password_hash, check_password_hash
class Get:
    def __init__(self):
        self.change=0
    

    def startup(self):
        dict={
            "message":"backend is online"
        }
        return dict
    
    def getallposts(self,cursor):
        cursor.execute("SELECT * FROM `posts` ORDER BY `posts`.`post_id` DESC")
        result=cursor.fetchall()
        if result:
            return jsonify(result)
        else:
            return jsonify("there were no posts to be found")



