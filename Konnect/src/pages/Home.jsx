import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container, PostCard} from '../components'
import {Home as HomeComponent} from '../components'

function Home() {
    const [posts, setposts] = useState([])
    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setposts(posts.documents)
            }
        })
    }, [])
    if (posts.length === 0) {
        return (
            <div>
                <Container>
                    <h1>Login to read posts</h1>
                </Container>
            </div>
        )
    }
    return (
        <div className="post-container">
            <Container>
              <HomeComponent/>
                <div className="post-list">
                    {posts.map((post) => (
                        <div key={post.$id} className="post-card">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
