import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config'
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setpost] = useState(null)
  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setpost(post)
        } else {
          navigate('/')
        }
      })
    }
  }, [slug, navigate])

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredimg)
        navigate('/')
      }
    })
  }
  return post ? (
    <div className="post-page">
      <Container>
        <div className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <img className="post-image" src={service.getFilePreview(post.featuredimg)} alt={post.title} />
          {isAuthor && (
            <div className="post-actions">
              <Link to={`/edit-post/${post.$id}`} style={{ textDecoration: "none" }}>
                <Button className="edit-button">Edit</Button>
              </Link>
              <Button className="delete-button" onClick={deletePost}>Delete</Button>
            </div>
          )}
        </div>
        <div className="post-content">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-text">{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post
