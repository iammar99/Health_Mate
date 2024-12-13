import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { firestore } from 'Config/Firebase';
import Groq from 'groq-sdk';
import { setDoc } from 'firebase/firestore';
import PorgressCard from 'components/OtherComponents/PorgressCard';

export default function Diet_plan() {

    const [plan, setPlan] = useState([])
    const [single, setSingle] = useState(0)
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem("User"))
    const API_KEY = process.env.REACT_APP_GROQ_API;
    const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
    // console.log(user)

    const fetchData = async () => {
        setLoading(true)
        const docRef = doc(firestore, "Diet", user.userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setPlan(docSnap.data().plan)
        } else {
            // docSnap.data() will be undefined in this case
        }
        let ans = 0
        for(let i = 0 ; i < docSnap.data().plan.length ; i++){
            if(docSnap.data().plan[i].type == "task"){
                ans++
            }
            setSingle(100/ans)
        }
        setLoading(false)
    }


    useEffect(() => {
        fetchData()
    }, [])

    // Function to differentiate between task and heading 

    function parseContent(content) {
        const lines = content.split("\n");
        const parsed = [];

        lines.forEach((line) => {
            if (line.startsWith("**") && line.endsWith("**")) {
                parsed.push({ type: "header", text: line.slice(2, line.length - 2) });
            } else if (line.trim() !== "") {
                parsed.push({ type: "task", text: line.slice(2) });
            }
        });

        return parsed;
    }

    // Function to generate diet plan 

    async function dietGenerationFunction(age, weight, height, gender) {
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

    const handleGenrate = async () => {
        const response = await dietGenerationFunction(user.age, user.weight, user.height, user.gender);
        const content = response.choices[0]?.message?.content || "";
        const parsedContent = parseContent(content);
        const dietPlan = { plan: parsedContent }
        await setDoc(doc(firestore, "Diet", user.uid), dietPlan);
    }


    // Function to Check checkboxes

    const handleCheck = (id) => {
        setPlan((prevPlan) =>
            prevPlan.map((item) =>
                item.id <= id ? { ...item, checked: true, marked: true } : item
            )
        );
        setScore(single+score)
    }

    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <div className="col-8">
                        <h3 className="fw-bold">
                            Hello {user.fullName} ! Here is your personalized Diet plan
                        </h3>
                        {
                            loading
                                ?
                                "Getting diet..."
                                :

                                plan.length > 0 && (
                                    <ul style={{ listStyle: "none", padding: 0 }}>
                                        {plan.map((item, index) => (
                                            <li key={index} style={{ marginBottom: "10px" }}>
                                                {item.type === "header" ? (
                                                    <strong>{item.text}</strong>
                                                ) : (
                                                    <label>
                                                        <input type="checkbox" className='ms-5' disabled={item.checked} onChange={() => { handleCheck(item.id) }} />
                                                        <span style={{ marginLeft: "10px" }}>{item.text}</span>
                                                    </label>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )
                        }
                    </div>
                    <div className="col-4">
                        <PorgressCard score={score}/>
                    </div>
                </div>
            </div>
        </>
    )
}
