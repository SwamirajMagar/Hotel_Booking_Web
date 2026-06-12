import React from "react";
import Navbar from "./components/navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";

const App = ()=>{
    const isowner = useLocation().pathname.includes("owner")

    return(
        <div>
           {!isowner && <Navbar/>}
           <div className='min-h-[70vh]'>
            <Routes>
                <Route path='/' element={<Home/>} />
            </Routes>
           </div>
           <Footer />
        </div>
    )
}

export default App;