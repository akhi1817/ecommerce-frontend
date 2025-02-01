import React, { useEffect } from 'react';
import Headers from './components/headers/Headers';
import Routing from './components/routes/Routing';
import Footers from './components/footers/Footers';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import fetchUserDetails from './config/fetchUserDetails.js';

const App = () => {

      const fetchUser=async()=>{
        const userData= await fetchUserDetails()
        console.log("userdata",userData);
      }
      useEffect(()=>{
        fetchUser()
      },[])

  return (
    <Router>
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <Headers />
        <Routing />
        <Footers />
      </>
    </Router>
  );
};

export default App;
