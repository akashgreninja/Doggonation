from werkzeug.security import generate_password_hash, check_password_hash
import time
from flask import Flask, jsonify, abort, request, send_file
from flask import Flask, jsonify, abort, request, send_file, Response
from flask_login import (
    LoginManager,
    login_required,
    current_user,
    logout_user,
    login_user,
)
import razorpay
from fiftyonemodel import identifydog
class Post:  
    def __init__(self):
        self.get_all_users="SELECT * FROM user"
     #posts crud
    #adding a new post
    def addpost(self,data,cursor,db):
        image=data['pic_url']
        result=identifydog.run_check(imageurl=image)
        
        if result!=0:
            result=list(result)
            pic=data['pic_url']
            location=data['location']
            caption=data['caption']
            user_id=data['user_id']
            tags=data['tags'] + result

            
            query=f"INSERT INTO `posts` (`pic`, `caption`,`user_id`, `location`) VALUES ('{pic}', '{caption}',{user_id},' {location}');"
            cursor.execute(query)
            db.commit()
            cursor.execute("SELECT LAST_INSERT_ID();")
            post_id = cursor.fetchone()[0]
            for i in tags:
                cursor.execute(
                    f"INSERT INTO `tags` (`tag`, `post_id`, `tag_id`) VALUES ('{i}', '{post_id}', NULL);"
                )

            db.commit()
            return jsonify("post added succesfully")
        else:
            return Response("no dogs found", status=201, mimetype="application/json")

    def updatepost(self, data, cursor, db):
        location = data["location"]
        caption = data["caption"]
        post_id = data["post_id"]
        tags = data["tags"]
        cursor.execute(f"delete from tags where post_id={post_id}")
        for i in tags:
            cursor.execute(
                f"INSERT INTO `tags` (`tag`, `post_id`, `tag_id`) VALUES ('{i}', '{post_id}', NULL);"
            )

        query = f"UPDATE `posts` SET `caption` = '{caption}', `location` = '{location}' WHERE `posts`.`post_id` = {post_id}"

        cursor.execute(query)
        db.commit()
        return jsonify("post updated succesfully")

    def deletepost(self, post_id, cursor, db):
        cursor.execute(f"select * from posts where post_id={post_id}")
        result = cursor.fetchone()
        if result:
            query = f"DELETE FROM posts WHERE `posts`.`post_id` = {post_id}"
            cursor.execute(f"delete from tags where post_id={post_id}")
            cursor.execute(query)
            db.commit()
            return jsonify("post deleted successfully")
        else:
            return jsonify("failed")

    # like and unlike
    def like(self, post_id, cursor, db):
        cursor.execute(
            f"UPDATE `posts` SET `liked` = '1' WHERE `posts`.`post_id` = {post_id}"
        )
        db.commit()
        return jsonify("like updated")

    def rmlike(self, post_id, cursor, db):
        cursor.execute(
            f"UPDATE `posts` SET `liked` = '0' WHERE `posts`.`post_id` = {post_id}"
        )
        db.commit()
        return jsonify("like updated")

    def register(self, data, cursor, mydb):
        print(data)
        email = data["email"]
        password = data["password"]
        name = data["name"]
        gender = data["gender"]
        try:
            profile_pic = data["profile_pic"]
        except Exception as NameError:
            profile_pic = None

        dob = data["dob"]
        print(profile_pic)
        finalpassword = generate_password_hash(
            password, method="pbkdf2:sha256", salt_length=16
        )

        query = f"SELECT * FROM user WHERE email  = '{email}'"
        cursor.execute(query)

        result = cursor.fetchall()
        print(result)

        if result:
            message = {"error": "User already exists"}
            print("we in this")

            return message
        else:
            query_add = f"INSERT INTO user (`profile_pic`, `email`, `password`, `name`, `gender`,`dob`) VALUES ('{profile_pic}', '{email}', '{finalpassword}', '{name}', '{gender}','{dob}')"
            cursor.execute(query_add)
            mydb.commit()

            query1 = f"SELECT * FROM user WHERE email  = '{email}'"
            cursor.execute(query1)
            result = cursor.fetchall()

            print(result)
            result = {"result": result[0][0]}

            return result

    def profile(self, data, cursor, db):
        dob = data["dob"]
        name = data["name"]
        profile_pic = data["profile_pic"]
        gender = data["gender"]
        user_id = data["user_id"]
        cursor.execute(
            f"update user set `name`='{name}',`dob`='{dob}',`profile_pic`='{profile_pic}',`gender`='{gender}' where user_id='{user_id}'"
        )
        db.commit()
        return jsonify("successfully updated")

    def login(self, data, mycursor):
        sucess = {"sucess": "true"}
        failure = {"sucess": "false"}
        email = data["email"]
        print(email)
        password = data["password"]
        print(password)
        query = f"SELECT * FROM user WHERE  email='{email}' "
        mycursor.execute(query)
        result = mycursor.fetchall()
        print(result)
        try:
            if not check_password_hash(result[0][2], password):
                return failure
        except IndexError:
            return failure

        if result:
            print(result[0][0])
            return result
        else:
            return failure

    def addcomment(self, data, cursor, mydb):
        comment = data["comment"]
        user_id = data["user_id"]
        post_id = data["post_id"]

        query = f"INSERT INTO comments  (`comment_id`, `post_id`, `user_id`, `comment`, `liked`) VALUES (NULL, '{post_id}', '{user_id}', '{comment}',NULL)"
        cursor.execute(query)
        mydb.commit()

        return jsonify("comment added succesfully")

    def likecomment(self, data, cursor, mydb):
        comment_id = data["comment_id"]
        user_id = data["user_id"]
        cursor.execute(
            f"UPDATE `comments` SET `liked` = liked+1 WHERE `comment_id` = {comment_id}"
        )
        mydb.commit()
        return jsonify("like  increased by 1")

    def removelikecomment(self, data, cursor, mydb):
        comment_id = data["comment_id"]
        user_id = data["user_id"]
        cursor.execute(
            f"UPDATE `comments` SET `liked` = liked-1 WHERE `comment_id` = {comment_id}"
        )
        mydb.commit()
        return jsonify("like reduced by 1")

    def report(self, data, cursor, db):
        reason = data["reason"]
        post_id = data["post_id"]
        cursor.execute(f"insert into report  values ('{reason}','{post_id}',NULL)")
        cursor.execute(f"select reported from posts where post_id={post_id}")
        reported = cursor.fetchone()[0]
        reported += 1
        cursor.execute(f"update posts set reported={reported} where post_id={post_id}")
        db.commit()
        return jsonify("reported successfully")

    def follow(self, data, cursor, db):
        user_id = data["user_id"]
        followed_id = data["followed_id"]
        cursor.execute(f"select * from follow where `follower`={user_id}")
        result = cursor.fetchall()
        if result:
            return jsonify("already following")
        cursor.execute(
            f"insert into follow (`follower`,`following`) values ({user_id},{followed_id})"
        )
        db.commit()
        return jsonify("done")

    def unfollow(self, data, cursor, db):
        follower = data["user_id"]
        following = data["followed_id"]
        cursor.execute(
            f"delete from follow where `follower`={follower} and `following`={following}"
        )
        db.commit()
        return jsonify("successfully unfollowed")

    def create_order(self, razorpay_key, razorpay_secret, amount):
        print(amount)

        instance = razorpay.Client(auth=(razorpay_key, razorpay_secret))
        order = instance.order.create(
            {"amount": int(amount), "currency": "INR", "payment_capture": "1"}
        )
        return order
