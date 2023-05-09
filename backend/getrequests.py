from flask import Flask, abort,jsonify,Response
from werkzeug.security import generate_password_hash, check_password_hash
class Get:
    def __init__(self):
        self.change=0
    

    def startup(self):
        dict={
            "message":"backend is online"
        }
        return dict
    
    def get_user (self,data,mycursor,mydb):
        id=data['id']
        query=f"SELECT * FROM user WHERE user_id='{id}'"
        mycursor.execute(query)
        # mycursor.close()
        console=mycursor.fetchone()
        print(console)
        return jsonify(console)


    def followers(self,data,cursor):
        # route is /getfollowers

        user_id=data['user_id']
        cursor.execute(f"select follower from follow where following={user_id}")
        followers=cursor.fetchall()
       
        new=[]
        if followers != []:
         for i in followers:
            cursor.execute(f"select * from user where user_id={i[0]}")
            result=cursor.fetchone()
            new.append(result)

         return jsonify(new)
        else:
            return jsonify(0)
    def following(self,data,cursor):
        user_id=data['user_id']
        cursor.execute(f"select following from follow where follower={user_id}")
        following=cursor.fetchall()
        new=[]
        if following != []:
         for i in following:
            cursor.execute(f"select * from user where user_id={i[0]}")
            result=cursor.fetchone()
            new.append(result)

         return jsonify(new)
        else:
            return jsonify(0)

    def getallposts(self,cursor,user_id):
        cursor.execute(f"select `following` from `follow` where `follower`='{user_id}'")
        result=cursor.fetchall()
        print(result)
        final_res=[]
        if result:
            for i in result:
                cursor.execute(f"SELECT * FROM `posts` where `user_id`='{i[0]}' ORDER BY `posts`.`post_id` DESC")
                result_post=cursor.fetchone()
                if result_post:
                    
                    final_res+=[result_post]
                else:
                   continue
            return jsonify(final_res)
        else:
            cursor.execute(f"select * from `posts` ORDER BY `post_id` DESC")
            result=cursor.fetchall()
            return jsonify(result)

    def getcomments(self,cursor,post_id):
        query=f"SELECT * FROM `comments` WHERE post_id={post_id}"
        cursor.execute(query)
        result=cursor.fetchall()
        if result:
            return jsonify(result)
        else:
            return Response("no comments", status=201, mimetype="application/json")
    
    def gettags(self,cursor,post_id):
        cursor.execute(f"select tag from tags where post_id={post_id}")
        result=cursor.fetchall()
        if result:
            return jsonify(tags)
        else:
            return Response("no tags", status=201, mimetype="application/json")

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
    
    def search(self,data,cursor):
        keywords=data['keywords']
        if keywords=="":
            return jsonify("no relatable data")
        cursor.execute(f"select * from user where `name` like '{keywords}%'")
        result=cursor.fetchall()
        if result:
            return jsonify(result)
        else:
           cursor.execute(f"select * from user where `name` like '%{keywords}%'")
           result=cursor.fetchall()
        if result:
            response = jsonify(result)
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
            
        else:
            return jsonify('no matches found')
        
    
    def getRazorpayKey(self):
        key={
            "key":"rzp_test_v0GwBrDGUuFtEq"
        }
        return jsonify(key)
       