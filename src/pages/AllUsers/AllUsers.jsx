import React, { useEffect, useState } from 'react';
import './AllUsers.css';
import axios from 'axios';
import moment from 'moment';
import { API_ENDPOINTS } from '../../config/api';
import toast from 'react-hot-toast';
import { FaUserEdit } from "react-icons/fa";
import ChangeUserRole from '../../components/UserRole/ChangeUserRole';


const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [openUpdateRole,setOpenUpdateRole]=useState(false);
    const [updateUserDetails,setUpdateUserDetails]=useState({
        _id:'' ,
        email:'',
        name:'',
        role:'',

    })

    const fetchAllUsers = async () => {
        try {
            const fetchData = await axios.get(API_ENDPOINTS.GET_ALL_USERS, { withCredentials: true });
            console.log("Users Data:", fetchData.data.data); 

            if (fetchData.data.success) {
              toast.success(fetchData.data.message,{duration:5000});
                setAllUsers(fetchData.data.data);
            } else {
                toast.error(fetchData.data.message);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    useEffect(() => {
        console.log("Updated Users State:", allUsers);
    }, [allUsers]);

    return (
        <>
            <table className='w-100 table table-striped table-bordered table-hover text-center'>
                <thead>
                    <tr>
                        <th>Sr.no</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Avatar</th>
                        <th>Created Date and Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    Array.isArray(allUsers) && allUsers.length > 0 ? (
                        allUsers.map((val, index) => (
                            <tr key={val._id || index}>
                                <td>{index + 1}</td>
                                <td>{val?.name}</td>
                                <td>{val?.email}</td>
                                <td>{val?.role}</td>
                                <td>
                                    <img src={val?.avatar} alt="avatar" width="50" height="50" />
                                </td>
                                <td>{moment(val?.createdAt).format('LLL')}</td>
                                <td className='text-center'>
                                <button className='btn btn-success ms-3'><FaUserEdit className='fs-4' onClick={()=>{
                                    setUpdateUserDetails(val)
                                    setOpenUpdateRole(true)
                                    
                                    }} /></button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {
                openUpdateRole &&(
                    <ChangeUserRole onClose={()=>setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callfunc={fetchAllUsers}/>
                )
            }
        </>
    );
};

export default AllUsers;
