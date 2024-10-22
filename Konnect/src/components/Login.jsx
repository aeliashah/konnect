import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import authService from '../appwrite/auth'
import { Button, Input, Logo } from './index'
import { login as authLogin } from '../store/authSlice'


function Login() {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const login = async (data) => {
    setError("")
    try {
      const session =await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData))
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
      console.log("error.message", error.message)
    }
  }
  return (
    <div className="model">
    <div className="innermodel">
      <Logo />
      <h2>Sign in to your account</h2>
      <p>Don't have any account
        <Link to="/signup" style={{textDecoration:"none"}}>Sign Up</Link></p>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(login)}>
        <div className="input-field">
          <Input label="email" placeholder="Email" {...register("email", {
            required: true,
            matchPatern: (value) => /^\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid email"
          })} />
        </div>
        <div className="input-field">
          <Input label="password" placeholder="Password" {...register("password", { required: true })} />
        </div>
        <Button >Sign in</Button>
      </form>
    </div>
    </div>
  )
}

export default Login
