import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
function Signup() {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const create = async (data) => {
        setError("");
        try {
          const userData = await authService.createAccount(data);
          if (userData) {
            console.log(userData, "collected");
            const userData2 = await authService.getCurrentUser();
            if (userData2) {
              console.log("second data: ", userData2);
              dispatch(login(userData2));
            }
            navigate("/");
          }
        } catch (error) {
          setError(error.message);
        }
      };
    return (
        <div className="innermodel">
            <Logo />
            <h2>Sign up to create account</h2>
            <p>Already have an account
                <Link to="/login" style={{textDecoration:"none"}}>Sign In</Link></p>
            {error && console.log(error)}

            <form onSubmit={handleSubmit(create)}>
                <div className="input-field">
                    <Input label="Name: " placeholder="enter you Name" {...register("name", { required: true })} />
                </div>
                <div className="input-field">
                    <Input label="Email: " placeholder="Email" {...register("email", {
                        required: true,
                        matchPatern: (value) => /^\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid email"
                    })} />
                </div>
                <div className="input-field">
                    <Input type="password" placeholder="Password" {...register("password", { required: true })} />
                </div>
                <Button className="submit-btn" type='submit'>Create account</Button>
            </form>
        </div>
    )
}

export default Signup
