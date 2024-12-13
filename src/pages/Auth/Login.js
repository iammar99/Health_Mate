import React, { useState } from 'react'
import { Form, Input, message } from 'antd';
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, firestore } from '../../Config/Firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

let isAuthenicated = false;
const initialState = { email: "", password: "" }


export default function Login() {

    const [state, setState] = useState(initialState);
    const { dispatch } = useAuthContext()
    const [isLoading, setIsloading] = useState(false)
    let currentUser = {}


    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
        console.log(state)
    }

    const login = e => {
        e.preventDefault();
        setIsloading(true)
        let { email, password } = state;
        email = email.trim();
        password = password.trim();
        if (!email) {
            message.error("Please Enter Your Email")
            setIsloading(false)
            return;
        }
        if (!password ) {
            message.error("Please Enter Your Password");
            setIsloading(false)
            return;
        }
        if (password.length < 8) {
            message.error("Please Enter Valid Password");
            setIsloading(false)
            return;
        }
        // let registerUser = JSON.parse(localStorage.getItem("users"))
        // for (let i = 0; i < registerUser.length; i++) {
        //     if (email == registerUser[i].email) {
        //         if (password == registerUser[i].password) {
        //             message.success("You logged successfully");
        //             isAuthenicated = true;
        //             break
        //         }
        //         else {
        //             message.error("Incorrect Password")
        //             return;
        //         }
        //     }
        // }
        // if (isAuthenicated == false) {
        //     message.error("You don't signup yet");
        // }
        // const newUsers = registerUser.filter((filterUser) => {
        //     return filterUser.email == email
        // })
        signInWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...

                const q = query(collection(firestore, "Users"), where("userId", "==", user.uid));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    currentUser = doc.data()
                    console.log(doc.id, " => ", doc.data());
                });
                localStorage.setItem("token", "true")
                localStorage.setItem("User",JSON.stringify(currentUser))
                dispatch({ type: "SET_LOGGED_IN", payload: { state } })
                message.success("Logged In Successfully")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                message.error("Email or Password Incorrect")
            })
            .finally(() => {
                setIsloading(false)
            })
        // localStorage.setItem("User", JSON.stringify(newUsers))
    }

    return (
        <>
            <div className="img1">
                <div className="container py-3">
                    <div className="row">
                        <div className="col">
                            <Form className='d-flex justify-content-center align-items-center py-5'>
                                <div className="card beforeCard auth p-4">
                                    <h4>Login</h4>
                                    <div className="d-flex">
                                        <p>Doesn't have an account yet?</p>
                                        <Link to="/auth/signup" className="ms-1 text-decoration-none" style={{ color: "purple" }}>SignUp</Link>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6>Email Address</h6>
                                            <Input type="email" name="email" id="email" className='form-control w-100' placeholder='you@example.com' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col">
                                            <div className="d-flex">
                                                <h6>Password</h6>
                                                <Link to="/auth/forgetpassword" className='ms-auto'>Forget Password</Link>
                                            </div>
                                            <Input.Password type="password" name="password" id="password" className='form-control w-100 d-flex' placeholder='*********' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <input type="checkbox" name="" id="checkbox" />
                                            <label htmlFor="checkbox" className='ms-2'>Remember me</label>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col text-center">
                                            <button className='border-0 rounded-2 w-75 text-white' onClick={login} style={{ minHeight: 40, backgroundColor: "#588157" }}>
                                                {
                                                    isLoading
                                                        ?
                                                        <div className='spinner-grow spinner-grow-sm'></div>
                                                        :
                                                        "Login"
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
