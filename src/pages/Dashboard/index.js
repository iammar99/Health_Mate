import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from './Profile'
import Diet_plan from './Diet_plan'
import UpdatePassword from './UpdatePassword'

export default function Dashboard() {
    return (
        <>
            <Routes>
                <Route path="/profile" element={<Profile/>} />
                <Route path="/diet_plan" element={<Diet_plan/>} />
                <Route path="/updatepassword" element={<UpdatePassword/>} />
            </Routes>
        </>
    )
}
