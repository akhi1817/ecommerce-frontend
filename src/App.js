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
import AOS from 'aos';
import { setUserDetails } from './store/userSlice.js';

const App = () => {
  const dispatch = useDispatch();

  // Fetch Logged-in User Details
  const fetchLoginUser = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.LOGIN_USER_DETAILS, { withCredentials: true });
      
      if (response?.data) {
        dispatch(setUserDetails(response.data));
        console.log("User Data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchLoginUser();
  }, [dispatch]);

  // aos animation initialize
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);
  

  return (
    <Router>
      <Context.Provider value={{ fetchLoginUser }}>
        <Toaster position="top-center" reverseOrder={false} />
        <Headers />
        <Routing />
        <Footers />
      </Context.Provider>
    </Router>
  );
};

export default App;
