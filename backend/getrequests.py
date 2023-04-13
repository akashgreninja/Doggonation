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
    
    def get_user (self,id,mycursor,mydb):
        query=f"SELECT * FROM user WHERE user_id='{id}'"
        mycursor.execute(query)
        # mycursor.close()
        return jsonify(mycursor.fetchone())




    def getallposts(self,cursor):
        cursor.execute("SELECT * FROM `posts` ORDER BY `posts`.`post_id` DESC")
        result=cursor.fetchall()
        if result:
            return jsonify(result)
        else:
            return jsonify("there were no posts to be found")

    def getcomments(self,cursor,post_id):
        query=f"SELECT * FROM `comments` WHERE post_id={post_id}"
        cursor.execute(query)
        result=cursor.fetchall()
        cursor.execute(f"select tag from tags where post_id={post_id}")
        tags=cursor.fetchall()
        if result:
            return jsonify(result,tags)
        else:
            return jsonify("no comments...")
