
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask,jsonify,abort,request,send_file
from flask_login import LoginManager,login_required,current_user,logout_user,login_user

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
        tags=data['tags']
        
        query=f"INSERT INTO `posts` (`pic`, `caption`,`user_id`, `location`) VALUES ('{pic}', '{caption}',{user_id},' {location}');"
        cursor.execute(query)
        db.commit()
        cursor.execute("SELECT LAST_INSERT_ID();")
        post_id = cursor.fetchone()[0]
        for i in tags:
            cursor.execute(f"INSERT INTO `tags` (`tag`, `post_id`, `tag_id`) VALUES ('{i}', '{post_id}', NULL);")
         
        db.commit()
        return jsonify("post added succesfully")
    
    def updatepost(self,data,cursor,db):
        location=data['location']
        caption=data['caption']
        post_id=data['post_id']
        tags=data['tags']
        cursor.execute(f"delete from tags where post_id={post_id}")
        for i in tags:
            cursor.execute(f"INSERT INTO `tags` (`tag`, `post_id`, `tag_id`) VALUES ('{i}', '{post_id}', NULL);")
         
        query=f"UPDATE `posts` SET `caption` = '{caption}', `location` = '{location}' WHERE `posts`.`post_id` = {post_id}"
        
        cursor.execute(query)
        db.commit()
        return jsonify("post updated succesfully")
    
    def deletepost(self,post_id,cursor,db):
        cursor.execute(f"select * from posts where post_id={post_id}")
        result=cursor.fetchone()
        if result:
           query= f"DELETE FROM posts WHERE `posts`.`post_id` = {post_id}"
           cursor.execute(f"delete from tags where post_id={post_id}")
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
        profile_pic=['profile_pic']
        finalpassword=generate_password_hash(password, method='pbkdf2:sha256', salt_length=16)


        query=f"SELECT * FROM user WHERE email  = '{email}'"
        cursor.execute(query)

        result=cursor.fetchall()
        query_add=f"INSERT INTO user (`profile_pic`,`user_id`, `email`, `password`, `name`, `gender`) VALUES ('{profile_pic}',NULL, '{email}', '{finalpassword}', '{name}', '{gender}')"

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
            
    def profile(self,data,cursor,db):
        dob=data['dob']
        name=data['name']
        profile_pic=data['profile_pic']
        gender=data['gender']
        user_id=data['user_id']
        cursor.execute(f"update user set `name`='{name}',`dob`='{dob}',`profile_pic`='{profile_pic}',`gender`='{gender}' where user_id='{user_id}'")
        db.commit()
        return jsonify("successfully updated")
        
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
 
    def addcomment(self,data,cursor,mydb):
        comment=data['comment']
        user_id=data['user_id']
        post_id=data['post_id']

        query=f"INSERT INTO comments  (`comment_id`, `post_id`, `user_id`, `comment`, `liked`) VALUES (NULL, '{post_id}', '{user_id}', '{comment}',NULL)"
        cursor.execute(query)
        mydb.commit()
        
        

        return jsonify("comment added succesfully")
    
    def likecomment(self,data,cursor,mydb):
        comment_id=data['comment_id']
        user_id=data['user_id']
        cursor.execute(f"UPDATE `comments` SET `liked` = liked+1 WHERE `comment_id` = {comment_id}")
        mydb.commit()
        return jsonify("like  increased by 1")
    
    
    def removelikecomment(self,data,cursor,mydb):
        comment_id=data['comment_id']
        user_id=data['user_id']
        cursor.execute(f"UPDATE `comments` SET `liked` = liked-1 WHERE `comment_id` = {comment_id}")
        mydb.commit()
        return jsonify("like reduced by 1")
    
    def follow(self,data,cursor,mydb):
        user_id=data['user_id']
        follower_id=data['follower_id']
        query_to_check_if_already_following=f"select * from followers where user_id={user_id} and follower_id={follower_id}"
        cursor.execute(query_to_check_if_already_following)
        result=cursor.fetchall()
        if result:
            return jsonify("already following")
        
        query=f'INSERT INTo followers (`follower_id`, `user_id`) VALUES ({follower_id},{user_id})'
        cursor.execute(query)
        mydb.commit()
        return jsonify(f"followed user {follower_id}")
    
    def unfollow(self,data,cursor,mydb):
        user_id=data['user_id']
        follower_id=data['follower_id']
        query_to_check_if_already_following=f"select * from followers where user_id={user_id} and follower_id={follower_id}"
        cursor.execute(query_to_check_if_already_following)
        result=cursor.fetchall()
        if not result:
            return jsonify("not following")
        
        query=f'delete from followers where user_id={user_id} and follower_id={follower_id}'
        cursor.execute(query)
        mydb.commit()
        return jsonify(f"unfollowed user {follower_id}")
    def report(self,data,cursor,db):
        reason=data['reason']
        post_id=data['post_id']
        cursor.execute(f"insert into report  values ('{reason}','{post_id}',NULL)")
        cursor.execute(f"select reported from posts where post_id={post_id}")
        reported=cursor.fetchone()[0]
        reported+=1
        cursor.execute(f"update posts set reported={reported} where post_id={post_id}")
        db.commit()
        return jsonify("reported successfully")

