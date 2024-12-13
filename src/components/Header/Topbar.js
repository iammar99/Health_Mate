import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

export default function Topbar() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <img src={logo} alt="logo" width={50} />
                    <Link to="/" className="navbar-brand menu__link" href="#">Health Mate</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <button className="nav-link menu__link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Authenticated</button>
                                <ul className="dropdown-menu">
                                    <li><Link to="/auth/login" className="dropdown-item" href="#">Login</Link></li>
                                    <li><Link to="/auth/signup" className="dropdown-item" href="#">SignUp</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link to="/auth/forgetpassword" className="dropdown-item" href="#">Forget Password</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
