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
import Layout from "./pages/HotelOwner/Layout";
import Dashboard from "./pages/HotelOwner/Dashboard";
import AddRoom from "./pages/HotelOwner/AddRoom";
import Listroom from "./pages/HotelOwner/Listroom";

const App = ()=>{
    const isowner = useLocation().pathname.includes("owner")

    return(
        <div>
           {!isowner && <Navbar/>}
          {false && <HotelReg />}
           <div className='min-h-[70vh]'>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/rooms' element={<AllRoom/>} />
                <Route path='/rooms/:id' element={<RoomDetails/>} />
                <Route path='/my-bookings' element={<Mybookings/>} />
                <Route path='/owner' element= {<Layout/>}>
                    <Route index element={<Dashboard/>} />
                    <Route path="add-room" element={<AddRoom/>} />
                    <Route path="list-room" element={<Listroom/>} />
                </Route>

            </Routes>
           </div>
           <Footer />
        </div>
    )
}

export default App;