import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ Component }) {
    const { isAuthenicated } = useAuthContext()

    if(!isAuthenicated) return <Navigate to={"/auth/login"} />
    return (<Component />)
}
