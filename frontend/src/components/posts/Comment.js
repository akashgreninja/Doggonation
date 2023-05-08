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
      console.log(data.data)
      setcomments(data[0])
      settags(data[1])
   }
   
   const addcomment=async()=>{
    let comment=document.getElementById('commentin')
    comment=comment.value
    let data=await add_comment(comment,props.post_id,user_id)
    if (data.status===200){
        comment.value=""
        loadcomments()
    }
   }
       return (
    <div className='flex m-5 '>
        {
           comments ===[] ? comments.map((element)=>{
            return <p key={element[0]}><b>
                {element[0]}
            </b>
            </p>
           }):null
        }
        <input type="text" className='p-2 rounded' name='comment' onChange={HandleChange} id='commentin' placeholder="Add a comment" />
        <button onClick={addcomment} className='p-2 mx-2'><i class="fa-solid fa-paper-plane"></i></button>
    </div>
  )
}

export default Comment