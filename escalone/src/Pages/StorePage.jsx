import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../Components/sections/header'
import Footer from '../Components/sections/footer'
import Shop from '../Components/store/shop'
import Checkout from '../Components/store/checkout'

export default function Store() {
    //console.log(import.meta.env.VITE_API_URL)
    return (
        <>
        <Header />
        <Routes>
            <Route index element={<Shop />} />
            <Route path="checkout" element={ <Checkout/>} />
        </Routes>
        <Footer />
        </>
    )
}