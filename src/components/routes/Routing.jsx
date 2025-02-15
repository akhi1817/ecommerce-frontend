import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home/Home.jsx';
import About from '../../pages/About/About.jsx';
import Shop from '../../pages/Shop/Shop.jsx';
import Contact from '../../pages/Contact/Contact.jsx';
import Login from '../../pages/Login/Login.jsx';
import Register from '../../pages/Register/Register.jsx';
import AdminPanel from '../../pages/Admin/AdminPanel.jsx';
import AllUsers from '../../pages/AllUsers/AllUsers.jsx';
import AllProducts from '../../pages/AllProducts/AllProducts.jsx';
import CategoryProduct from '../../pages/CategoryProduct/CategoryProduct.jsx';

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/category/:categoryName' element={<CategoryProduct/>}></Route>
        {/* Admin Panel */}
        <Route path='/admin-panel' element={<AdminPanel/>}>
        <Route path='all-users' element={<AllUsers/>}/>
        <Route path='all-products' element={<AllProducts/>}/></Route>

      </Routes>
    </>
  );
};

export default Routing;
