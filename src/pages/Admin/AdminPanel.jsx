import React, { useEffect } from 'react';
import './AdminPanel.css';
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate }from 'react-router-dom';
import ROLE from '../../config/role.js'


const AdminPanel = () => {

               
                  const user = useSelector(state => state?.user?.user?.data);  
                  const navigate=useNavigate();

                  useEffect(() => {
                    if (!user || !user.role) {
                      return; 
                    }
                  
                    if (user.role !== ROLE.ADMIN) {
                      navigate('/');
                    }
                  }, [user]);
                  

  return (
   <>
   <div className="d-flex" style={{ minHeight: "calc(100vh - 120px)" }}>
      <aside className="bg-light flex-grow-1 shadow-lg" style={{ minHeight: "100vh", maxWidth: "240px" }}>
        <div className=' h-25 flex justify-content-center align-items-center'>
          <div className="cursor-pointer text-center">
                {user?.avatar ? (
                  <img
                    className="rounded-circle mt-5"
                    src={user?.avatar}
                    style={{ width: "60px", height: "60px" }}
                    alt="profilepic"
                  />
                ) : (
                  <FaRegUserCircle className="fs-1  mt-5" />
                )}
                <p className='fw-bold text-dark'>{user?.name}</p>
                <p>{user?.role}</p>
          </div>


                {/* navigation links  */}
                <nav className='d-flex flex-column '>
                  <Link className='nav-link p-2 shadow-lg' to='/admin-panel/all-users'>All Users</Link>
                  <Link className='nav-link p-2 shadow-lg' to='/admin-panel/all-products'>All Products</Link>
                </nav>

        </div>
      </aside>
      <main className="w-100 h-100 p-4 border">
              <Outlet/> 
      </main>
    </div>

    
   </>
  )
}

export default AdminPanel
