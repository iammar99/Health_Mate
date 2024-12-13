import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { useAuthContext } from '../../context/AuthContext'
import { message } from 'antd'

export default function Navbar() {
    const {  dispatch, isAuthenicated } = useAuthContext()

    const logout = () => {
        dispatch({ type: "SET_LOGGED_OUT" })
        localStorage.setItem("token", "false")
        localStorage.removeItem("User")
        message.success("You Logout Successfully")
    }

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <img src={logo} alt="logo" style={{ "width": "110px" }} />
                    <div className="container">
                        <Link to="/" className="py-0 navbar-brand menu__link">Health Mate</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/dashboard/profile" className="nav-link py-0 active menu__link">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/dashboard/diet_plan" className="nav-link py-0 active menu__link">Diet Plan</Link>
                                </li>
                            </ul>
                            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                                <li className="nav-item">
                                    {
                                        isAuthenicated
                                            ?
                                            <button className='button1' onClick={logout}>Logout</button>
                                            :
                                            <button className='button1'>
                                                <Link to={"/auth/login"}>
                                                    Login
                                                </Link>
                                            </button>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}