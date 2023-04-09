class Post:  

    def addpost(self,file,conn):
        file_mime=file.mimetype
        file_content = file.read() 
        query = f"INSERT INTO posts (pic,mimetype,user_id) VALUES (?, ?, ?)"
        result=conn.execute(query, ( file_content,file_mime,1))
        conn.commit()

        return "done"
    
 
  
