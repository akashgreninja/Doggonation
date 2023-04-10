
from werkzeug.security import generate_password_hash, check_password_hash


class Post:  
    def __init__(self):
        self.get_all_users="SELECT * FROM user"

    def addpost(self,file,conn):
        file_mime=file.mimetype
        file_content = file.read() 
        query = f"INSERT INTO posts (pic,mimetype,user_id) VALUES (?, ?, ?)"
        result=conn.execute(query, ( file_content,file_mime,1))
        conn.commit()

        return "done"

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
 
