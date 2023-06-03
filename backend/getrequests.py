# python -m nltk.downloader punkt

from flask import Flask, abort, jsonify, Response
from werkzeug.security import generate_password_hash, check_password_hash
import nltk
from nltk import FreqDist
from nltk.tokenize import word_tokenize
from appwrite.query import Query

# nltk.download('punkt')


class Get:
    def __init__(self):
        self.change = 0

    def startup(self):
        dict = {"message": "backend is online"}
        return dict

    def explore(
        self,
        databases,
        databaseID,
        tagsCollectionID,
        postsCollectionID,
        userCollectionID,
    ):
        check = databases.list_documents(databaseID, tagsCollectionID)
        result = check["documents"]

        # result = cursor.fetchall()
        new = []
        for i in result:
            new.append(i["tag"])
        print(new)

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
                    final_postid.append(result[j]["post_id"])
        explore_posts = []
        final_postid = set(final_postid)
        print(final_postid)
        # return jsonify("null")
        for i in final_postid:
            result = databases.get_document(databaseID, postsCollectionID, i)
            # cursor.execute(f"select * from `posts` where `post_id`={i}")
            # result = cursor.fetchone()
            user_id = result["user_id"]
            print(user_id)
            user_res = databases.get_document(databaseID, userCollectionID, user_id)

            user = [user_res["name"], user_res["profile_pic"]]
            result_fin = []
            result_posts = [
                result["pic"],
                result["caption"],
                result["$id"],
                result["user_id"],
                result["liked"],
                result["location"],
                result["time"],
                result["reported"],
                result["likes"],
                result["comments"],
                user[0],
                user[1],
            ]
            print(result)
            if result_posts:
                result_fin += [result_posts]
            else:
                continue

            print(result_fin)
            explore_posts.append(result_fin)
        return jsonify(explore_posts)

    def get_user(    self, data, databases, databaseID, userCollectionID):
        id = data["id"]
        print(id)
        query = [Query.equal("$id", id)]
        result = databases.list_documents(databaseID, userCollectionID, queries=query)
        
  
        
        
        return jsonify(result)

    # def followers(self, data, cursor):
    #     # route is /getfollowers

    #     user_id = data["user_id"]
    #     cursor.execute(f"select follower from follow where following={user_id}")
    #     followers = cursor.fetchall()

    #     new = []
    #     if followers != []:
    #         for i in followers:
    #             cursor.execute(f"select * from user where user_id={i[0]}")
    #             result = cursor.fetchone()
    #             new.append(result)

    #         return jsonify(new)
    #     else:
    #         return jsonify(0)

    # def following(self, data, cursor):
    #     user_id = data["user_id"]
    #     cursor.execute(f"select following from follow where follower={user_id}")
    #     following = cursor.fetchall()
    #     new = []
    #     if following != []:
    #         for i in following:
    #             cursor.execute(f"select * from user where user_id={i[0]}")
    #             result = cursor.fetchone()
    #             new.append(result)

    #         return jsonify(new)
    #     else:
    #         return jsonify(0)

    def getallposts(self, user_id, databases, databaseID, postsCollectionID):
        pass

        # cursor.execute(f"select `following` from `follow` where `follower`='{user_id}'")
        # result = cursor.fetchall()
        # print(result)
        # final_res = []
        # if result:
        #     for i in result:
        #         cursor.execute(
        #             f"SELECT * FROM `posts` where `user_id`='{i[0]}' ORDER BY `posts`.`post_id` DESC"
        #         )
        #         result_post = cursor.fetchone()
        #         cursor.execute(
        #             f"select `name`,`profile_pic` from `user` where `user_id`='{i[0]}'  "
        #         )
        #         user_result = cursor.fetchone()
        #         if result_post:
        #             final_res += [[result_post + user_result]]
        #         else:
        #             continue
        # if result == []:
        #     # return self.explore(cursor)

        # else:
        # return jsonify(final_res)

        # else:
        #     return self.explore(cursor)

    def getcomments(self, data,databases, databaseID,commentCollectionID):
        # query = f"SELECT * FROM `comments` WHERE post_id={post_id} ORDER BY  `comments`.`comment_id` DESC"
        qurty=[Query.equal("post_id",data["post_id"]),Query.orderDesc("comment_id")]
        result=databases.list_documents(databaseID, commentCollectionID, queries=qurty)
    
        if result:
            return jsonify(result)
        else:
            return Response("no comments", status=201, mimetype="application/json")

    def gettags(databases, databaseID,tagsCollectionID, post_id):
      
        queries=[Query.equal("post_id",post_id)]
        result=databases.list_documents(databaseID, tagsCollectionID,query=queries)
     
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

    # def search(self, data, databases, databaseID, userCollectionID):
    #     keywords = data["keywords"]
    #     if keywords == "":
    #         return jsonify("no relatable data")
    #     query = Query.search("name", keywords)
    #     result = databases.list_documents(databaseID, userCollectionID, queries=[query])
    #     # cursor.execute(f"select * from user where `name` like '{keywords}%'")
    #     # result=cursor.fetchall()
    #     if result["total"] != 0:
    #         print(result["total"])
    #         names = [item["name"] for item in result["documents"]]
    #         return jsonify(names)

    #     else:
    #         return jsonify("no matches found")

    # def getRazorpayKey(self):
    #     key = {"key": "rzp_test_v0GwBrDGUuFtEq"}
    #     return jsonify(key)
