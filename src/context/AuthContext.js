import React, { createContext, useContext, useState, useReducer,useEffect } from 'react'
import { message } from 'antd'

const AuthContext = createContext()

export const initialState = { user: {}, isAuthenicated: false }

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_LOGGED_IN":
            return { isAuthenicated: true, user: action.payload.state };
        case "SET_LOGGED_OUT":
            return initialState;
        default:
            return state;
    }
}

export default function AuthContextProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)
    const [cart, setCart] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token === "true") {
            const user = JSON.parse(localStorage.getItem("User"))
            dispatch({ type: "SET_LOGGED_IN", payload: { state } })
        }
        setTimeout(() => {
            setIsAppLoading(false)
        }, 2000)
    }, [])
    const removeFromCart = (itemIndex) => {
        setCart((prevCart) => prevCart.filter((_, index) => index !== itemIndex));
        message.success("Removed Successfully")
    }

    return (
        <AuthContext.Provider value={{ cart, setCart, removeFromCart, dispatch, ...state, isAppLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export const useAuthContext = () => useContext(AuthContext)