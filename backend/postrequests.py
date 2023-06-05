from werkzeug.security import generate_password_hash, check_password_hash
import time
import datetime
from appwrite.services.databases import Databases
from appwrite.query import Query
from flask import Flask, jsonify, abort, request, send_file
from flask import Flask, jsonify, abort, request, send_file, Response
import razorpay
from fiftyonemodel import identifydog
import requests, os, uuid, json
from appwrite.services.users import Users

class Post:
    def __init__(self):
        self.get_all_users = "SELECT * FROM user"

    # posts crud
    # adding a new post
    def addpost(self, data, databases, databaseID, postsCollectionID, tagsCollectionID):
        image = data["pic_url"]
        result = identifydog.run_check(imageurl=image)

        if result != None:
            pic = data["pic_url"]
            location = data["location"]
            caption = data["caption"]
            user_id = data["user_id"]
            tags = data["tags"] + result

            #   result=databases.create_document(databaseID, userCollectionID, 'unique()',data)
            #         print(result)

            #         query=Query.equal("email",email)

            #         check=databases.list_documents(databaseID,userCollectionID,queries=[query])

            #         print(check)

            #         result = {"result": check["documents"][0]["$id"]}
            time = datetime.datetime.now()

            data = {
                "pic": pic,
                "caption": caption,
                "user_id": user_id,
                "location": location,
                "time": str(time),
            }
            try:
                databases.create_document(
                    databaseID, postsCollectionID, "unique()", data
                )
            except:
                return jsonify("couldnt process your request")
            check = databases.list_documents(databaseID, postsCollectionID)
            post_id = check["documents"][-1]["$id"]

            for i in tags:
                data = {"post_id": post_id, "tag": i}
                databases.create_document(
                    databaseID, tagsCollectionID, "unique()", data
                )

            #     )
            # db.commit()

            return jsonify("post added succesfully")
        else:
            return Response("no dogs found", status=201, mimetype="application/json")

    #     def updatepost(self, data, cursor, db):
    #         location = data["location"]
    #         caption = data["caption"]
    #         post_id = data["post_id"]
    #         tags = data["tags"]
    #         cursor.execute(f"delete from tags where post_id={post_id}")
    #         for i in tags:
    #             cursor.execute(
    #                 f"INSERT INTO `tags` (`tag`, `post_id`, `tag_id`) VALUES ('{i}', '{post_id}', NULL);"
    #             )

    #         query = f"UPDATE `posts` SET `caption` = '{caption}', `location` = '{location}' WHERE `posts`.`post_id` = {post_id}"

    #         cursor.execute(query)
    #         db.commit()
    #         return jsonify("post updated succesfully")

    #     def deletepost(self, post_id, cursor, db):
    #         cursor.execute(f"select * from posts where post_id={post_id}")
    #         result = cursor.fetchone()
    #         if result:
    #             query = f"DELETE FROM posts WHERE `posts`.`post_id` = {post_id}"
    #             cursor.execute(f"delete from tags where post_id={post_id}")
    #             cursor.execute(query)
    #             db.commit()
    #             return jsonify("post deleted successfully")
    #         else:
    #             return jsonify("failed")

    #     # like and unlike
    def like(self, post_id, databases, databaseID, postsCollectionID):
        result = databases.get_document(databaseID, postsCollectionID, post_id)

        like = result["likes"] + 1
        # likes+=1
        result = databases.update_document(
            databaseID, postsCollectionID, post_id, data={"likes": like}
        )

        return jsonify("like updated")

    def rmlike(self, post_id, databases, databaseID, postsCollectionID):
        result = databases.get_document(databaseID, postsCollectionID, post_id)

        like = result["likes"] - 1
        # likes+=1
        result = databases.update_document(
            databaseID, postsCollectionID, post_id, data={"likes": like}
        )

        return jsonify("like updated")

    def register(self, data, databases, databaseID, userCollectionID,users):
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
    
        result = users.create_bcrypt_user(f'{name}', 'email@example.com', 'password')

        print(email)
        query = Query.equal("email", email)
     

        # result = databases.list_documents(databaseID, userCollectionID, queries=[query])
        result =users.list(queries=[query])
        print(type(result))
        print("dsdsdsdsdds")

        if int(result.get("total")) > 0:
            message = {"error": "User already exists"}

            return message
        else:
            data = {
                "email": email,
                "password": result[''],
                "name": name,
                "profile_pic": profile_pic,
                # "dob":dob,
                # "gender":gender
            }

            result = databases.create_document(
                databaseID, userCollectionID, "unique()", data
            )
            print(result)

            query = Query.equal("email", email)

            check = databases.list_documents(
                databaseID, userCollectionID, queries=[query]
            )

            print(check)

            result = {"result": check["documents"][0]["$id"]}

            return result

    def login(self, data, databases, databaseID, userCollectionID,users):
        sucess = {"sucess": "true"}
        failure = {"sucess": "false"}
        email = data["email"]
        print(email)
        password = data["password"]
        print(password)
        query = Query.equal("email", email)
     

        # result = databases.list_documents(databaseID, userCollectionID, queries=[query])
        result =users.list(queries=[query])
        if result:
            if not check_password_hash(result["documents"][0]["password"], password):
                return failure
            else:
                return result

        def addcomment(
            self, data, databases, databaseID, userCollectionID, postsCollectionID
        ):
            comment = data["comment"]
            user_id = data["user_id"]
            post_id = data["post_id"]
            # cursor.execute(f"select `comments` from `posts` where `post_id`='{post_id}'")
            query = [Query.equal("post_id", post_id)]
            result = databases.get_document(databaseID, postsCollectionID, query=query)
            comment = result["comments"] + 1

            result = databases.update_document(
                databaseID, postsCollectionID, post_id, data={"comments": comment}
            )

            return jsonify("comment added succesfully")

    def likecomment(self, data, cursor, mydb):
        comment_id = data["comment_id"]
        user_id = data["user_id"]
        cursor.execute(
            f"UPDATE `comments` SET `liked` = liked+1 WHERE `comment_id` = {comment_id}"
        )
        mydb.commit()
        return jsonify("like  increased by 1")

    #     def removelikecomment(self, data, cursor, mydb):
    #         comment_id = data["comment_id"]
    #         user_id = data["user_id"]
    #         cursor.execute(
    #             f"UPDATE `comments` SET `liked` = liked-1 WHERE `comment_id` = {comment_id}"
    #         )
    #         mydb.commit()
    #         return jsonify("like reduced by 1")

    #     def report(self, data, cursor, db):
    #         reason = data["reason"]["reason"]

    #         post_id = data["post_id"]["post_id"]
    #         print(reason,post_id)
    #         cursor.execute(f"insert into `report` (`reason`,`post_id`) values ('{reason}','{post_id}')")
    #         cursor.execute(f"select `reported` from `posts` where `post_id`='{post_id}'")
    #         reported = cursor.fetchone()[0]
    #         reported += 1
    #         cursor.execute(f"update posts set reported={reported} where post_id={post_id}")
    #         db.commit()
    #         return jsonify("reported successfully")

    def follow(self, data, databases, databaseID, followCollectionID):
        user_id = data["user_id"]
        followed_id = data["followed_id"]
        result = None
        query = [Query.equal("follower", user_id)]
        try:
            result = databases.list_documents(
                databaseID, followCollectionID, queries=query
            )
            id = None
            for i in range(len(result)):
                if result["documents"][i]["following"] == followed_id:
                    id = result["documents"][0]["$id"]
                    break
            if id:
                result = databases.get_document(databaseID, followCollectionID, id)
            print(id)
        except Exception as e:
            print(e)

            result = None

        if result:
            return jsonify("already following")
        data = {"follower": user_id, "following": followed_id}
        result = databases.create_document(
            databaseID, followCollectionID, "unique()", data
        )

        return jsonify("done")

    def unfollow(self, data, databases, databaseID, followCollectionID):
        user_id = data["user_id"]
        followed_id = data["followed_id"]
        result = None
        query = [Query.equal("follower", user_id)]
        try:
            result = databases.list_documents(
                databaseID, followCollectionID, queries=query
            )
            id = None
            for i in range(len(result)):
                if result["documents"][i]["following"] == followed_id:
                    id = result["documents"][0]["$id"]
                    break
            if id:
                result = databases.delete_document(databaseID, followCollectionID, id)
            print(id)
        except Exception as e:
            print(e)

            result = None

        return jsonify("successfully unfollowed")

    #     def create_order(self, razorpay_key, razorpay_secret, amount):
    #         print(amount)
    #         try:
    #             instance = razorpay.Client(auth=(razorpay_key, razorpay_secret))
    #             order = instance.order.create(
    #                 {"amount": int(amount), "currency": "INR", "payment_capture": "1"}
    #             )
    #             return order
    #         except Exception as e:
    #             print(e)
    #             return e

    def capture_payment(self, data, databases, databaseID, razorpayCollectionID):
        amount = data["amount"]
        razorpayPaymentId = data["razorpayPaymentId"]
        razorpayOrderId = data["razorpayOrderId"]
        razorpaySignature = data["razorpaySignature"]
        print(amount)
        print(razorpayPaymentId)
        print(razorpayOrderId)

        data = {
            "amount": amount,
            "razorpayOrderId": razorpayOrderId,
            "razorpaySignature": razorpaySignature,
            "razorpayPaymentId": razorpayPaymentId,
        }

        result = databases.create_document(
            databaseID, razorpayCollectionID, "unique()", data
        )

        print(result)

        # query =Query.equal("razorpayOrderId",razorpayOrderId)

        # check=Databases.list_documents(databaseID,razorpayCollectionID,queries=[query])

        return jsonify({"message": "payment captured successfully"})

    #     def banned_ip(self, data, cursor):
    #         ip_address = request.remote_addr
    #         reason = data["reason"]
    #         user_id = data["user_id"]
    #         created_at = datetime.datetime.now()
    #         query = f"insert into bannedusers (`ip_address`,`reason`,`created_at`,`user_id`) values ('{ip_address}','{reason}',{created_at}'{user_id}')"
    #         cursor.execute(query)
    #         return jsonify({"message": "IP address banned successfully."})

    def get_banned_ip(self, data, cursor):
        id = data["user_id"]
        query = f"select * from bannedusers where user_id={id}"
        cursor.execute(query)
        result = cursor.fetchall()
        if result:
            return jsonify({"message": "true"})
        else:
            return jsonify({"message": "false"})

    def translatefn(self, key, endpoint, location, data):
        text = data["text"]
        target_language = "en"
        path = "/translate?api-version=3.0"
        target_language_parameter = "&to=" + target_language
        constructed_url = endpoint + path + target_language_parameter
        headers = {
            "Ocp-Apim-Subscription-Key": key,
            "Ocp-Apim-Subscription-Region": location,
            "Content-type": "application/json",
            "X-ClientTraceId": str(uuid.uuid4()),
        }
        body = [{"text": text}]
        translator_request = requests.post(constructed_url, headers=headers, json=body)
        translator_response = translator_request.json()
        translated_text = translator_response[0]["translations"][0]["text"]
        print(translated_text)
        return jsonify({"message": translated_text})


#     def msgfn(self,data,cursor):
#         room=data['room']
#         print(room)
#         cursor.execute(f"select `text` from `chats` where `msg_id`='7'")
#         result=cursor.fetchall()
#         print(result)
#         return jsonify(result)
