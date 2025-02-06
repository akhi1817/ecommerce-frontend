import React from 'react'
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";


const AdminPanel = () => {

               
                  const user = useSelector(state => state?.user?.user?.data);  

  return (
   <>
   
    <div className="d-flex" style={{ minHeight: "calc(100vh - 120px)" }}>
  <aside className="bg-light flex-grow-1 shadow-lg" style={{ minHeight: "100vh", maxWidth: "240px" }}>
    <div className='bg-danger h-25 flex justify-content-center align-items-center'>
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
              </div>
    </div>
  </aside>
  <main className="flex-grow-1">
    main
  </main>
</div>

    
   </>
  )
}

export default AdminPanel
