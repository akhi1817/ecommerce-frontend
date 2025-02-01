import React from 'react';
import './Headers.css';
import { IoSearchOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Headers = () => {
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-12 header d-flex'>
                <div className='col-md-4'>
                    {/* logo */}
                   <Link to='/'> <img src='assets/logo.png' className='logo'/></Link>
                </div>
                <div className='col-md-4 search-icon d-flex p-2'>
                    <input type='text' placeholder='Search here...' className='form-control'/><button className='btn btn-light'><IoSearchOutline className='fs-3 text-dark' /></button>
                </div>
                <div className='col-md-4 login-cart-icon'>
                    <Link to='/login'><button className='btn btn-primary pt-2'><FaUserAlt className='fs-3 text-white '/>Login</button></Link>
                    <button className='btn btn-success pt-2 ms-3'><BsFillCartFill className='fs-3 text-white animate-bounce' /> My cart</button>

                </div>
            </div>
        </div>
      </div>
        
      
    </>
  );
};

export default Headers;
