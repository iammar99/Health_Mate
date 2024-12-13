import React, { useState } from 'react'
import { Input, Form, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, firestore } from '../../Config/Firebase'
import { setDoc, doc } from "firebase/firestore";

const initialState = { gender: "", age: "", height: "", weight: "" }

export default function SignUp2() {

    // let users = [];
    // users = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];
    const User = localStorage.getItem("User")
    const [state, setState] = useState({});
    const { dispatch, user } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const signUp = e => {
        e.preventDefault();
        const mergedObject = {...User,...state}
        let { fullName,email, password, gender, age, height, weight } = mergedObject;
        setIsLoading(true)
        gender = gender.trim();
        age = age.trim();
        height = height.trim();
        weight = weight.trim();
        if (!gender) {
            message.error("Please Enter Your Full Name");
            return;
        }
        if (!age) {
            message.error("Please Enter Your Age");
            return;
        }
        if (!height) {
            message.error("Please Enter Your Height");
            return;
        }
        if (!weight) {
            message.error("Please Enter Your Weight");
            return;
        }
        console.log(mergedObject)
        navigate("/")
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;
                let userToStore = {
                    email,
                    password,
                    userId: user.uid,
                    fullName,
                    gender,
                    age,
                    height,
                    weight
                }
                console.log(userToStore)
                // return
                // ...
                // Add a new document with a generated id.
                await setDoc(doc(firestore, "Users", user.uid), userToStore);
                // await addDoc(collection(firestore, "Users",user.uid), state);

                localStorage.setItem("User", JSON.stringify(mergedObject))
                localStorage.setItem("token", "true")
                dispatch({ type: "SET_LOGGED_IN", payload: { state } })
                message.success("A new user added successfully");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            })
            .finally(() => {
                setIsLoading(false)
            });
    }

    return (
        <>
            <div className="img1">
                <div className="container py-3">
                    <div className="row">
                        <div className="col">
                            <Form className='d-flex justify-content-center align-items-center py-5'>
                                <div className="card beforeCard auth p-4">
                                    <h4>SignUp</h4>
                                    <h5>Next 2</h5>
                                    <div className="row">
                                        <div className="col">
                                            <h6>Full Name</h6>
                                            <Input type="text" name="gender" onChange={handleChange} id="gender" className='form-control w-100' placeholder='Gender' />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col">
                                            <h6>Email Address</h6>
                                            <Input type="number" name="age" onChange={handleChange} id="age" className='form-control w-100' placeholder='Age' />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col">
                                            <h6>Password</h6>
                                            <Input type="number" onChange={handleChange} name="height" id="height" className='form-control w-100 d-flex' placeholder='Height' />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6>Confirm Password</h6>
                                            <Input type="number" onChange={handleChange} name="weight" id="weight" className='form-control w-100 d-flex' placeholder='Weight' />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <input type="checkbox" name="" id="checkbox" />
                                            <label for="checkbox" className='ms-2'>Remember me</label>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col text-center">
                                            <button className='border-0 rounded-2 w-75 text-white' onClick={signUp} style={{ minHeight: 40, backgroundColor: "#588157" }}>
                                                {
                                                    isLoading
                                                        ?
                                                        <div className='spinner-grow spinner-grow-sm'></div>
                                                        :
                                                        "SignUp"
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
