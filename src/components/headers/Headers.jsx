import React, { useState } from 'react';
import './Headers.css';
import { IoSearchOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { BsFillCartFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';
import toast from 'react-hot-toast';
import { setUserDetails } from '../../store/userSlice';

const Headers = () => {

              const [menuDisplay,setMenuDisplay]=useState(false)
              const toggleMenu = () => {
                setMenuDisplay((prev) => !prev); // Toggling the state
              };

              const user = useSelector(state => state?.user?.user?.data);  
              const dispatch=useDispatch();
              const navigate=useNavigate();

               console.log("User Data from Redux in Headers.jsx:", user);  




               const handleLogout=async()=>{
                  const fetchData= await axios.get(API_ENDPOINTS.LOGOUT,{withCredentials:true})

                
                  if(fetchData.success){
                    toast.success("Logout successfully..!",{duration:5000})
                    dispatch(setUserDetails(null));
                    navigate('/')
                  }
                  else {
                    toast.error(fetchData.message)
                  }
               }

  
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12 header d-flex'>
            <div className='col-md-4'>
              {/* Logo */}
              <Link to='/'> <img src='assets/logo.png' className='logo' alt="Logo" /></Link>
            </div>
            <div className='col-md-4 search-icon d-flex p-2'>
              <input type='text' placeholder='Search here...' className='form-control' />
              <button className='btn btn-light'><IoSearchOutline className='fs-3 text-dark' /></button>
            </div>
            <div className='col-md-4 login-cart-icon d-flex'>

            <div className="position-relative d-flex justify-content-center">
      <div onClick={toggleMenu} className="cursor-pointer">
        {user?.avatar ? (
          <img
            className="rounded-circle me-4"
            src={user?.avatar}
            style={{ width: "60px", height: "60px" }}
            alt="profilepic"
          />
        ) : (
          <FaRegUserCircle className="fs-3 me-4" />
        )}
      </div>

      {menuDisplay && (
        <div className="position-absolute bg-white p-2 rounded shadow" style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}>
          <nav>
            <Link to="/admin-panel" className="nav-link text-success">
              Admin Panel
            </Link>
          </nav>
        </div>
      )}
    </div>
              
             
             <div>
             {
                user?._id?(
                  <button onClick={handleLogout} className='btn btn-danger pt-2'><FaUserAlt className='fs-3 text-white '/> Logout</button>
                ):(
                  <Link to='/login'><button className='btn btn-primary pt-2'><FaUserAlt className='fs-3 text-white '/> Login</button></Link>
                )
              }
              {/* Cart Button */}
              <button className='btn btn-success pt-2 ms-3'>
                <BsFillCartFill className='fs-3 text-white animate-bounce' /> My cart
              </button>

             </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Headers;