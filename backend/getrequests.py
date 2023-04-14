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


    def followers_list(self,data,cursor,user_id):
        user_id=data['user_id']
        query=f"SELECT * FROM user JOIN followers ON user.user_id = followers.follower_id WHERE followers.follower_id IN (SELECT follower_id FROM followers WHERE user_id = {user_id}) AND followers.follower_id IN (SELECT user_id FROM user)"
        cursor.execute(query)
        result=cursor.fetchall()
        print(len(result))
        return jsonify(result[:-1])
    
    def following_list(self,data,cursor,user_id):
        user_id=data['user_id']
        query=f"SELECT * FROM user JOIN followers ON followers.user_id = user.user_id WHERE followers.user_id IN (SELECT user_id FROM followers WHERE follower_id = {user_id}) AND followers.follower_id IN (SELECT user_id FROM user)"
        cursor.execute(query)
        result=cursor.fetchall()
        print(len(result))
        return jsonify(result[:-1])
  