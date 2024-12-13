import React, { useState } from 'react'
import { Form, Input, message } from 'antd';

const initialState = { oldPassword: "", newPassword: "", confirmPassword: "" }

export default function UpdatePassword() {

    const [state, setState] = useState(initialState)

    const users = JSON.parse(localStorage.getItem("users"))
    let user = JSON.parse(localStorage.getItem("User"))

    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const updatePassword = e => {
        e.preventDefault();
        let { oldPassword, newPassword, confirmPassword } = state;
        oldPassword = oldPassword.trim();
        newPassword = newPassword.trim();
        confirmPassword = confirmPassword.trim();
        if (!oldPassword) {
            message.error("Enter Your Old Password")
            return;
        }
        if (user.password != oldPassword) {
            message.error("Enter Your Correct Password")
            return;
        }
        console.log('user.password', user.password)
        if (!newPassword) {
            message.error("Enter Your New Password")
            return;
        }
        if (!confirmPassword) {
            message.error("Enter Your Confirm Password")
            return;
        }
        if (confirmPassword !== newPassword) {
            message.error("Both New And Confirm Password Doesn't Match");
            return;
        }
        const newUsers = users.filter((filterUser) => {
            return filterUser.email != user.email
        })
        user = { ...user, password: newPassword }
        newUsers.push(user)
        console.log('newUsers', newUsers)
        localStorage.setItem("users", JSON.stringify(newUsers))
        localStorage.setItem("User", JSON.stringify(user))
        message.success("Password Successfully Updated")
    }

    return (
        <>
            <div className="img1">
                <div className="container py-3">
                    <div className="row">
                        <div className="col">
                            <Form className="d-flex justify-content-center align-items-center py-5">
                                <div className="card beforeCard auth p-4">
                                    <h4>Update Password</h4>
                                    <div className="row mt-2">
                                        <div className="col">
                                            <h6>Old Password</h6>
                                            <Input.Password type="password" name="oldPassword" onChange={handleChange} className='form-control w-100 d-flex' placeholder='********' />
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col">
                                            <h6>New Password</h6>
                                            <Input.Password type="password" name="newPassword" onChange={handleChange} className='form-control w-100 d-flex' placeholder='Enter 6 character or more' />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6>Confirm Password</h6>
                                            <Input.Password type="password" name="confirmPassword" onChange={handleChange} className='form-control w-100 d-flex' placeholder='Enter 6 character or more' />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col text-center">
                                            <button className='btn btn-info border-0 rounded-2 w-75 text-white' onClick={updatePassword} style={{ backgroundColor:"#588157", minHeight: 40 }}>Update Password</button>
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
