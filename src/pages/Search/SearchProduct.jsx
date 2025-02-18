import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';
import VerticalCard from '../../components/VerticalCardSearch/VerticalCard.jsx';

const SearchProduct = () => {
  const [data, setData] = useState([]);
  const query = useLocation();


  const fetchProduct = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.SEARCH_PRODUCT + query.search);
      if (response.data?.data) {
        setData(response.data.data);
      } else {
        setData([]);
      }
      console.log('Response from Search query:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [query.search]); // Re-run when query.search changes

  return (
    <div className="container-fluid">
      
      {data.length !== 0 &&
       <VerticalCard searchdata={data} />}
    </div>
  );
};

export default SearchProduct;
