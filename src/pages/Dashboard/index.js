import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from './Profile'
import Diet_plan from './Diet_plan'
import Header from 'components/Header'
import Footer from 'components/Footer'

export default function Dashboard() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/diet_plan" element={<Diet_plan />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}
