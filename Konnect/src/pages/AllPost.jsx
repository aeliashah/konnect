import React, { useEffect } from 'react'
import { PostCard, Container } from '../components'
import service from '../appwrite/config'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addpost } from '../store/postSlice'

export default function AllPost() {
  const dispatch = useDispatch()
  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        dispatch(addpost(posts.documents))
        console.log("posts: ", posts.documents)
      } else {
        console.log("this is error")
      }
    })
  }, [
    dispatch
  ])
  const postData = useSelector((state) => state.post.postData)
  console.log("postData", postData)

  return (
    <div className="post-container">
      <Container>
        <h1 className="post-title">All Posts</h1>
        <div className="post-list">
          {Array.isArray(postData) && postData.map((post) => (
            <div key={post.$id} className="post-card">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
