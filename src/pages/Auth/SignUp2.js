import React, { useState } from 'react'
import { Input, Form, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, firestore } from '../../Config/Firebase'
import { setDoc, doc } from "firebase/firestore";
import Groq from 'groq-sdk'



export default function SignUp2() {

    const API_KEY = process.env.REACT_APP_GROQ_API;
    const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
    const User = JSON.parse(localStorage.getItem("User"))
    const [state, setState] = useState({});
    const { dispatch, user } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    // Function to differentiate between task and heading 

    function parseContent(content) {
        const lines = content.split("\n");
        const parsed = [];
        let id = 0
        lines.forEach((line) => {
            if (line.startsWith("**") && line.endsWith("**")) {
                parsed.push({ type: "header", text: line.slice(2, line.length - 2) });
            } else if (line.trim() !== "") {
                parsed.push({ type: "task", text: line.slice(2) ,id:id , checked:false});
                id++
            }
        });

        return parsed;
    }


    // Function to generate diet plan 

    async function dietGenerationFunction(age, weight, height,gender) {
        return groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `Act as a professional nutritionist. Based on the following user data, generate a personalized diet plan. Include only the diet plan in the response. Do not include hydration tips, explanations, or any additional information. Provide meal sections like Breakfast, Mid-morning snack, Lunch, Evening snack, and Dinner with food items and portion sizes in **grams** (not ounces). Ensure the portion sizes are realistic and appropriate for the user’s needs.\n
                    **User Details**:\n
                    - Height: ${height}\n
                    - Gender: ${gender}\n
                    - Weight: ${weight}\n
                    - Age: ${age}\n\n`,
                }

            ],
            model: "llama3-8b-8192", // Your specified model
        });
    }

    const signUp = e => {
        e.preventDefault();
        const mergedObject = { ...User, ...state }
        let { fullName, email, password, gender, age, height, weight } = mergedObject;
        setIsLoading(true)
        if (!gender) {
            message.error("Please Enter Your Full Name");
            setIsLoading(false)
            return;
        }
        if (!age) {
            message.error("Please Enter Your Age");
            setIsLoading(false)
            return;
        }
        if (!height) {
            message.error("Please Enter Your Height");
            setIsLoading(false)
            return;
        }
        if (!weight) {
            message.error("Please Enter Your Weight");
            setIsLoading(false)
            return;
        }
        gender = gender.trim();
        age = age.trim();
        height = height.trim();
        weight = weight.trim();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;

                mergedObject.userId = user.uid
                const response = await dietGenerationFunction(age, weight, height,gender);
                const content = response.choices[0]?.message?.content || "";
                const parsedContent = parseContent(content);
                parsedContent.shift();
                const dietPlan = { plan: parsedContent }
                await setDoc(doc(firestore, "Diet", user.uid), dietPlan);

                await setDoc(doc(firestore, "Users", user.uid), mergedObject);

                localStorage.setItem("User", JSON.stringify(mergedObject))
                localStorage.setItem("token", "true")
                dispatch({ type: "SET_LOGGED_IN", payload: { mergedObject } })
                message.success("A new user added successfully");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
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
                                            <label htmlFor="checkbox" className='ms-2'>Remember me</label>
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
