import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'
import SignUp2 from './SignUp2'
import ForgetPassword from './ForgetPassword'


export default function index() {
  return (
    <>
    <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signup2' element={<SignUp2/>} />
        <Route path='/forgetpassword' element={<ForgetPassword/>} />
    </Routes>
    </>
  )
}
