import React,{useEffect,useState} from 'react'
import { add_comment } from '../../api/addcomment'
import { getallcomment } from '../../api/getallcomments'

const Comment = (props) => {
   let user_id=3
   useEffect(() => {
    loadcomments()
   }, [])

   
  const HandleChange = (e) => {
    setcommentinput({ ...commentinput, [e.target.name]: e.target.value });
    
  };
  const [commentinput, setcommentinput] = useState({ comment: "" })
   const [comments, setcomments] = useState([])
   const [tags, settags] = useState([])
   const loadcomments=async()=>{
      let data=await getallcomment(props.post_id)
      if (data.status===200){
      setcomments(data.data)
      }
      
   }
   
   const addcomment=async()=>{
    let data=await add_comment(commentinput,props.post_id,user_id)
    if (data.status===200){
        setcommentinput("")
        loadcomments()
    }
   }
       return (
   <div>
    {
      comments.map((element)=>{
        return <div key={element[0]}>
           {element[3]}
        </div>
      })
    }
    <div className='flex m-5 '>
      
        <input type="text" className='p-2 rounded' name='comment' onChange={HandleChange} id='commentin' placeholder="Add a comment" />
        <button onClick={addcomment} className='p-2 mx-2'><i class="fa-solid fa-paper-plane"></i></button>
    </div></div>
  )
}

export default Comment