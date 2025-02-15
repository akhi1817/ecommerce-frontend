import React, { useState } from "react";
import ROLE from "../../config/role";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import toast from 'react-hot-toast';

const ChangeUserRole = ({ name, email, role,userId, onClose,callfunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleChange = (e) => {
    setUserRole(e.target.value);
    console.log("Selected Role:", e.target.value);
  };

  const updateUserRole = async () => {
    try {
      const token = localStorage.getItem("token"); 
  
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
  
      const fetchData = await axios.put(
        `${API_ENDPOINTS.UPDATE_USER_DETAILS}/${userId}`, { role: userRole },
        {headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},withCredentials: true,});
  
      console.log("Role Updated Successfully:", fetchData.data);
  
      if (fetchData.data.success) {
        toast.success(fetchData.data.message, { duration: 5000 });
        onClose();
        callfunc();  
      } else {
        toast.error(fetchData.data.message);
      }
    } catch (error) {
      console.error("Error updating role:", error.fetchData ? error.fetchData.data : error);
      toast.error("Failed to update role. Please try again.");
    }
  };
  

  return (
    <div className="container-fluid mt-5">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <button className="btn" onClick={onClose}>
                <IoCloseSharp />
              </button>
              <h5>Change User Role:</h5>
              <p>Name:{name}</p>
              <p>Email: {email}</p>
              <div className="d-flex justify-content-between">
                <p>Role</p>
                <select className="border" value={userRole} onChange={handleChange}>
                  {Object.values(ROLE).map((val) => (
                    <option value={val} key={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-success rounded-pill mx-auto" onClick={updateUserRole}>
                Change Role
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
