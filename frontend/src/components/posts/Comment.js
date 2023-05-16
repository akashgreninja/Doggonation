import React,{useEffect,useState,useRef} from 'react'
import { add_comment } from '../../api/addcomment'
import { getallcomment } from '../../api/getallcomments'
import { gettags } from '../../api/gettags'
import { translate } from '../../api/translate'


const Comment = (props) => {
   let user_id=29
   useEffect(() => {
    loadcomments()
    loadtags()
   }, [])

   const inputRef = useRef(null);
   const translateRef=useRef(null)
 
 
   const [comments, setcomments] = useState([])
   const [tags, settags] = useState([])
   
   const handletranslate=async(text,ele)=>{
    let data=await translate(text)
    let retext= data.data['message']
    let index=comments.indexOf(ele)
    let newarray=[...comments]
    newarray[index][3]=retext
    setcomments(newarray)
    
    
   }
   const loadtags=async()=>{
    let data =await  gettags(props.post_id)
    if (data.status===200){
      settags(data.data)
      }
   }
   const loadcomments=async()=>{
      let data=await getallcomment(props.post_id)
      if (data.status===200){
      setcomments(data.data)
      
      }
      
   }
   
   const addcomment=async()=>{
    let data=await add_comment(inputRef.current.value,props.post_id,user_id)
    if (data.status===200){
        inputRef.current.value=""
        loadcomments()
        
    }
   }
       return (
   <div>
    <div className='flex'>
      {
        tags.map((element)=>{
          return <p key={element}>
           #{element[0]}
          </p>
        })
      }
    </div>
    <div className='h-20 overflow-y-auto'>{
      comments.map((element)=>{ 
        
        return <div  className='px-2 mx-2' key={element[0]}>
          <div ref={translateRef}> { element[3]}</div>  <small><button onClick={()=>handletranslate(element[3],element)}>translate comments</button></small>
        </div>
      })
    }</div>
    <small>{comments.length} comments</small>
    <div className='flex m-5 '>
      
        <input type="text" className='p-2 z-20 rounded' ref={inputRef} name='comment'  placeholder="Add a comment" />
        <button onClick={addcomment} className='p-2 mx-2'><i class="fa-solid fa-paper-plane"></i></button>
       
    </div></div>
  )
}

export default Comment