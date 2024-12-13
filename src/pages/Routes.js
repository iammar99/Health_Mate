import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './Auth'
import NoPage from './NoPage'
import Frontend from './Frontend'
import Dashboard from './Dashboard'
import PrivateRoute from './PrivateRoutes'
import { useAuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Index() {
  const {isAuthenicated} = useAuthContext() 

  return (
    <main>
        <Routes>
        <Route path='/auth/*' element={!isAuthenicated ? <Auth /> : <Navigate to={"/"}/>} />
            <Route path='/dashboard/*' element={<PrivateRoute Component={Dashboard}/>} />
            <Route path='/*' element={<Frontend/>} />

            <Route path='*' element={<NoPage/>} />
        </Routes>
    </main>
  )
}

