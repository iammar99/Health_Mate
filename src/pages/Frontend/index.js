import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Footer from 'components/Footer'
import Header from 'components/Header'

export default function Frontend() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}
