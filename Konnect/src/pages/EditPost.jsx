import React,{useState,useEffect} from 'react'
import { Container,PostForm } from '../components'
import { useParams,useNavigate } from 'react-router-dom'
import service from '../appwrite/config'
function EditPost() {
    const [post,setposts]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post){
                    setposts(post)
                }
            
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])
  return post? (
    <div>
      <Container>
        <PostForm post={post}/>
      </Container>
    </div>
  ):null
}

export default EditPost

