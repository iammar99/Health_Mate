import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import Topbar from './Topbar'
import Navbar from './Navbar'

export default function Header() {

    const { isAuthenicated } = useAuthContext()

    return (
        <>
        {isAuthenicated?  <Navbar/> : <Topbar/>}
        </>
    )
}
