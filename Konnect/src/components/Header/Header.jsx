import React from 'react'
import { Container, Logo, LogoutBtn } from "../index"
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
export default function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: 'Login',
      slug: "/login",
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: "/signup",
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: "/add-post",
      active: authStatus
    }
  ]
  return (
    <header >
      <Container>
        <nav className='headeritems'>
          <div>
           <Link to="/" style={{textDecoration:"none"}}>
              <Logo />
            </Link> 
          </div>
          <div className='mainbtns' >
            {navItems.map((item) => item.active ? (
              <div key={item.name}>
                <Link to={item.slug} style={{textDecoration:"none"}}>
                <button >
                  {item.name}
                </button>
                </Link>
              </div>
            ) : null)}
            {authStatus && (
              <div>
                <LogoutBtn />
              </div>
            )}
          </div>
        </nav>
      </Container>
    </header>
  )
}
