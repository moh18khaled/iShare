import React, { useContext } from 'react'
import {User} from "../context/context"
import { Navigate, Outlet } from 'react-router-dom'
const RequireAuth = () => {
    const user = useContext(User);
    console.log(user);
  return (
    user.auth.userDetails ? <Outlet /> : <Navigate to="/login" />
  )
}

export default RequireAuth
