import React, { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from "./store/authSlice"
import {Header,Footer} from "./components/index"
import { Outlet } from 'react-router-dom'
export default function App() {
  const [loading,setloading]=useState(true)
  const dispath=useDispatch()
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispath(login({userData}))
      }
      else{
        dispath(logout())
      }
    })
    .finally(()=>setloading(false))
  },[])
  return !loading? (
   <div>
    <Header/>
    <Outlet/>
    <Footer/>
   </div>
  ):null
}

