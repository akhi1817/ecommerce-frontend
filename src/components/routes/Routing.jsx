import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home/Home.jsx';
import About from '../../pages/About/About.jsx';
import Shop from '../../pages/Shop/Shop.jsx';
import Contact from '../../pages/Contact/Contact.jsx';
import Login from '../../pages/Login/Login.jsx';
import Register from '../../pages/Register/Register.jsx';

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

      </Routes>
    </>
  );
};

export default Routing;
