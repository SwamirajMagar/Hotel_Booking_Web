import React from "react";
import "./index.css";
import Navbar from "./components/navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRoom from "./pages/AllRoom";
import RoomDetails from "./pages/RoomDetails";
import Mybookings from "./pages/Mybookings";
import HotelReg from "./components/HotelReg";

const App = ()=>{
    const isowner = useLocation().pathname.includes("owner")

    return(
        <div>
           {!isowner && <Navbar/>}
           <HotelReg />
           <div className='min-h-[70vh]'>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/rooms' element={<AllRoom/>} />
                <Route path='/rooms/:id' element={<RoomDetails/>} />
                <Route path='/my-bookings' element={<Mybookings/>} />

            </Routes>
           </div>
           <Footer />
        </div>
    )
}

export default App;