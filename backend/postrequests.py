
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask,jsonify,abort,request,send_file

class Post:  
    def __init__(self):
        self.get_all_users="SELECT * FROM user"
     #posts crud
    #adding a new post
    def addpost(self,data,cursor,db):
        pic=data['pic_url']
        location=data['location']
        caption=data['caption']
        user_id=data['user_id']
        query=f"INSERT INTO `posts` (`pic`, `caption`,`user_id`, `location`) VALUES ('{pic}', '{caption}',{user_id},' {location}')"
        cursor.execute(query)
        db.commit()
        return jsonify("post added succesfully")
    
    def updatepost(self,data,cursor,db):
        location=data['location']
        caption=data['caption']
        post_id=data['post_id']
        query=f"UPDATE `posts` SET `caption` = '{caption}', `location` = '{location}' WHERE `posts`.`post_id` = {post_id}"
        cursor.execute(query)
        db.commit()
        return jsonify("post updated succesfully")
    
    def deletepost(self,post_id,cursor,db):
        cursor.execute(f"select * from posts where post_id={post_id}")
        result=cursor.fetchone()
        if result:
           query= f"DELETE FROM posts WHERE `posts`.`post_id` = {post_id}"
           cursor.execute(query)
           db.commit()
           return jsonify("post deleted successfully")
        else:
            return jsonify("failed")
    #like and unlike
    def like(self,post_id,cursor,db):
        cursor.execute(f"UPDATE `posts` SET `liked` = '1' WHERE `posts`.`post_id` = {post_id}")
        db.commit()
        return jsonify("like updated")
    def rmlike(self,post_id,cursor,db):
        cursor.execute(f"UPDATE `posts` SET `liked` = '0' WHERE `posts`.`post_id` = {post_id}")
        db.commit()
        return jsonify("like updated")
    



    def register(self,data,cursor,mydb):
        email=data['email']
        password=data['password']
        name=data['name']
        gender=data['gender']
        finalpassword=generate_password_hash(password, method='pbkdf2:sha256', salt_length=16)


        query=f"SELECT * FROM user WHERE email  = '{email}'"
        cursor.execute(query)

        result=cursor.fetchall()
        query_add=f"INSERT INTO user (`user_id`, `email`, `password`, `name`, `gender`) VALUES (NULL, '{email}', '{finalpassword}', '{name}', '{gender}')"

        if result:
            message={
                "error":"User already exists"
            }

            return message
        else:
            cursor.execute(query_add)
            mydb.commit()
            cursor.execute(self.get_all_users)
            result=cursor.fetchall()
            print(result)
            mydb.close()
            cursor.close()
            return result
            

        
    def login(self,data,mycursor):
        sucess={
            "sucess":"True"
        }
        failure={
            "sucess":"False"
        }
        email=data['email']
        print(email)
        password=data['password']
        query=f"SELECT * FROM user WHERE  email='{email}' "
        mycursor.execute(query)
        result =mycursor.fetchall()
        print(result)
        mycursor.close()
        if not  check_password_hash(result[0][2], password):
            return failure
    
     
        if result:
            return sucess
        else:
            return failure
 
