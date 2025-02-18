import React, { useContext, useState } from 'react';
import './Headers.css';
import { IoSearchOutline } from "react-icons/io5";
import { FaUserAlt, FaRegUserCircle } from "react-icons/fa";
import { BsFillCartFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';
import toast from 'react-hot-toast';
import { setUserDetails } from '../../store/userSlice';
import ROLE from '../../config/role';
import Context from '../../context';

const Headers = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const toggleMenu = () => setMenuDisplay((prev) => !prev);
  const context=useContext(Context)
  //searchInput
  const searchInput=useLocation(); 
  const [search,setSearch]=useState(searchInput?.search?.split("=")[1])
  console.log("search ",searchInput?.search.split("=")[1])

  // user Information
  const user = useSelector(state => state?.user?.user?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.LOGOUT, { withCredentials: true });

      if (response.data.success) {
        toast.success("Logout successfully!", { duration: 5000 });
      
        dispatch(setUserDetails(null));

        navigate("/");
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Something went wrong. Try again!");
    }


  };
// search function
      const handleSearch= (e)=>{
        const {value} =e.target;
        setSearch(value)
        if(value){
          navigate(`/search?q=${value}`)
        }
        else{
          navigate(`/search`)
        }
      }
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow ">
      <div className="container-fluid">
        
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img src="assets/logo.png" className="logo" alt="Logo" style={{ height: '80px' }} />
        </Link>

        {/* Navbar Toggle Button for Mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex flex-column flex-lg-row justify-content-between w-100 align-items-center">
            
            {/* Search Bar */}
            <div className="d-flex align-items-center my-2 ms-5 my-lg-0 w-50">
              <input type="text" value={search} placeholder="Search here..." className="form-control me-2" onChange={handleSearch} />
              <button className="btn btn-light">
                <IoSearchOutline className="fs-3 text-dark" />
              </button>
            </div>

            {/* User Profile & Cart */}
            <div className="d-flex align-items-center">
              
              {/* User Profile Dropdown */}
              <div className="position-relative me-3">
                {
                    user?._id && (
                      <div onClick={toggleMenu} className="cursor-pointer">
                        {user?.avatar ? (
                          <img className="rounded-circle" src={user?.avatar} style={{ width: "50px", height: "50px" }} alt="profile" />
                        ) : (
                          <FaRegUserCircle className="fs-3" />
                        )}
                               </div>
                    )
                }
               
         

                {/* User Dropdown Menu */}
                {menuDisplay && (
                  <div className="position-absolute bg-white p-2 rounded shadow" style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}>
                    <nav>
                      {user?.role === ROLE.ADMIN && (
                        <Link to="/admin-panel/all-products" className="nav-link text-success" onClick={toggleMenu}>
                          Admin Panel
                        </Link>
                      )}
                    </nav>
                  </div>
                )}
              </div>

              {/* Login / Logout Button */}
              {user?._id ? (
                <button onClick={handleLogout} className="btn btn-danger d-flex align-items-center">
                  <FaUserAlt className="fs-3 text-white me-1" /> Logout
                </button>
              ) : (
                <Link to="/login">
                  <button className="btn btn-primary d-flex align-items-center">
                    <FaUserAlt className="fs-3 text-white me-1" /> Login
                  </button>
                </Link>
              )}

              {/* Cart Button */}
              <Link to="/cart" className="btn btn-warning d-flex align-items-center ms-2">
                <BsFillCartFill className="fs-3 text-white me-1 animate-bounce" /> My Cart
                <h5 className='fw-bold mx-1 px-1 text-dark'><sup>{context?.cartProductCount?.data || 0}</sup></h5>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Headers;
