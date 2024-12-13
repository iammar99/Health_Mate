import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Form, Input, message } from 'antd'
import {sendPasswordResetEmail} from "firebase/auth"
import { auth } from '../../Config/Firebase'


export default function ForgetPassword() {

    let users = JSON.parse(localStorage.getItem("users"))

    const [state, setState] = useState("")
    const [isLoading , setIsLoading] = useState(false)
    const navigate = useNavigate()

    const ForgetPassword = e => {
        e.preventDefault();
        let email = state;
        console.log('email', email)
        if (!email) {
            message.error("Enter Your Email")
            return;
        }
        sendPasswordResetEmail (auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
            message.success("Link Sent")
        })
        .catch((error) => {
            message.error("An Error Occured")
            // ..
        })
        .finally(()=>{
            setIsLoading(false)
        })
        // else {
        //     for (let i = 0; i < users.length; i++) {
        //         if (email == users[i].email) {
        //             navigate("/auth/resetpassword")
        //             localStorage.setItem("email", email)
        //             break;
        //         }
        //         else {
        //             message.error("This Email Doesn't Found")
        //             return;
        //         }
        //     }
        // }
    }

    return (
        <>
            <div className="img1">
                <div className="container py-3">
                    <div className="row">
                        <div className="col">
                            <Form className='d-flex justify-content-center align-items-center py-5'>
                                <div className="card beforeCard auth p-4">
                                    <h4>Forget Password</h4>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <h6 className='ms-1'>Email Address</h6>
                                            <Input type="email" name="email" onChange={(e) => { setState(e.target.value) }} className='form-control w-100 mt-2' placeholder='you@example.com' required />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col text-center">
                                            <button className='border-0 rounded-2 w-75 text-white' onClick={ForgetPassword} style={{ minHeight: 40, backgroundColor: "#588157" }}>
                                                {
                                                    isLoading
                                                    ?
                                                    <div className='spinner-grow spinner-grow-sm'></div>
                                                    :
                                                    "Forget Password"
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
