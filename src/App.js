import React, { useEffect } from 'react';
import Headers from './components/headers/Headers';
import Routing from './components/routes/Routing';
import Footers from './components/footers/Footers';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from './config/api.js';
import Context from './context/index.js';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice.js';

const App = () => {
      const dispatch=useDispatch();
      const fetchLoginUser=async()=>{
        const userData= await axios.get(API_ENDPOINTS.LOGIN_USER_DETAILS,{withCredentials:true})
        console.log("userdata",userData);
        if(userData){
          dispatch(setUserDetails(userData.data))
        }
      }
      useEffect(()=>{
        fetchLoginUser()
      },[])

  return (
    <Router>
      <>
      <Context.Provider value={{
        fetchLoginUser
      }}>
        <Toaster position="top-center" reverseOrder={false} />
        <Headers />
        <Routing />
        <Footers />
      </Context.Provider>
      </>
    </Router>
  );
};

export default App;
