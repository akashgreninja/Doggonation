# python -m nltk.downloader punkt

from flask import Flask, abort, jsonify, Response
from werkzeug.security import generate_password_hash, check_password_hash
import nltk
from nltk import FreqDist
from nltk.tokenize import word_tokenize

# nltk.download('punkt')


class Get:
    def __init__(self):
        self.change = 0

    def startup(self):
        dict = {"message": "backend is online"}
        return dict

    def explore(self, cursor):
        cursor.execute(f"select * from `tags`")

        result=cursor.fetchall()
        
        new=[i[0] for i in result]

        text = " ".join(new)
        words = word_tokenize(text)
        fdist = FreqDist(words)
        most_common_words = fdist.most_common()
        returning_list = []
        j = 0
        for i in most_common_words:
            if j > 5:
                break
            returning_list.append(i[0])
            j += 1
        final_postid = []
        for i in returning_list:
            for j in range(len(new)):
                if i == new[j]:
                    final_postid.append(result[j][1])
        explore_posts = []
        final_postid = set(final_postid)
        for i in final_postid:
            cursor.execute(f"select * from `posts` where `post_id`={i}")
            result = cursor.fetchone()
            user_id = result[3]
            cursor.execute(
                f"select `name`,`profile_pic` from `user` where `user_id`='{user_id}'"
            )
            user = cursor.fetchone()
            result_fin = []
            if result:
                result_fin += [result + user]
            else:
                continue

            print(result_fin)
            explore_posts.append(result_fin)
        return jsonify(explore_posts)

    def get_user(self, data, mycursor, mydb):
        id = data["id"]
        query = f"SELECT * FROM user WHERE user_id='{id}'"
        mycursor.execute(query)
        # mycursor.close()
        console = mycursor.fetchone()
        print(console)
        return jsonify(console)

    

    def getallposts(self, cursor, user_id):
        cursor.execute(f"select `following` from `follow` where `follower`='{user_id}'")
     
        result = cursor.fetchall()
        print(result)
        final_res = []
        if result:
            for i in result:
                cursor.execute(
                    f"SELECT * FROM `posts` where `user_id`='{i[0]}' ORDER BY `posts`.`post_id` DESC"
                )
                result_post = cursor.fetchone()
                cursor.execute(
                    f"select `name`,`profile_pic` from `user` where `user_id`='{i[0]}'  "
                )
                user_result = cursor.fetchone()
                if result_post:
                    final_res += [[result_post + user_result]]
                else:
                    continue
            if result == []:
                return self.explore(cursor)

            else:
                return jsonify(final_res)

        else:
            return self.explore(cursor)

    def getuserposts(self, cursor, user_id):
        # route is /getuserposts
        query = f"SELECT * FROM `posts` where `user_id`='{user_id}' ORDER BY `posts`.`post_id` DESC"
        cursor.execute(query)
       
        result = cursor.fetchall()
       
        if result:
            return jsonify(result)
        else:
            return jsonify({"sucess":False})

    def getcomments(self, cursor, post_id):
        query = f"SELECT * FROM `comments` WHERE post_id={post_id} ORDER BY  `comments`.`comment_id` DESC"
        cursor.execute(query)
        result = cursor.fetchall()
        if result:
            return jsonify(result)
        else:
            return Response("no comments", status=201, mimetype="application/json")

    def gettags(self, cursor, post_id):
        cursor.execute(f"select * from `tags` where `post_id`='{post_id}'")
        result = cursor.fetchall()
        if result:
            return jsonify(result)
        else:
            return Response("no tags", status=201, mimetype="application/json")

    # def followers_list(self, data, cursor, user_id):
    #     user_id = data["user_id"]
    #     query = f"SELECT * FROM user JOIN follow ON user.user_id = follow.sl WHERE follow.sl IN (SELECT sl FROM follow WHERE user_id = {user_id}) AND follow.sl IN (SELECT user_id FROM user)"
    #     cursor.execute(query)
    #     result = cursor.fetchall()
    #     print(len(result))
    #     return jsonify(result[:-1])

    # def following_list(self, data, cursor, user_id):
    #     user_id = data["user_id"]
    #     query = f"SELECT * FROM user JOIN followers ON followers.user_id = user.user_id WHERE followers.user_id IN (SELECT user_id FROM followe` WHERE follower_id = {user_id}) AND followers.follower_id IN (SELECT user_id FROM user)"
    #     cursor.execute(query)
    #     result = cursor.fetchall()
    #     print(len(result))
    #     return jsonify(result[:-1])

    def search(self, data, cursor):
        keywords = data["keywords"]
        if keywords == "":
            return jsonify("no relatable data")
        cursor.execute(f"select * from user where `name` like '{keywords}%'")
        result = cursor.fetchall()
        if result:
            return jsonify(result)
        else:
            cursor.execute(f"select * from user where `name` like '%{keywords}%'")
            result = cursor.fetchall()
        if result:
            response = jsonify(result)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response

        else:
            return jsonify("no matches found")

    def getRazorpayKey(self):
        key = {"key": "rzp_test_v0GwBrDGUuFtEq"}
        return jsonify(key)

