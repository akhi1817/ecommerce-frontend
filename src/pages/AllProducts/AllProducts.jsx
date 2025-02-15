import React, { useEffect, useState } from 'react';
import './AllProducts.css';
import UploadProduct from '../../components/UploadProduct/UploadProduct';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';
import ProductCard from '../../components/ProductCard/ProductCard';

const AllProducts = () => {


  const [openUploadProduct,setOpenUploadProduct]=useState(false);
  const [allProducts,setAllProducts]=useState([]);


  const fetchProducts=async()=>{

    const fetchdata=await axios.get(API_ENDPOINTS.GET_ALL_PRODUCTS)

    console.log("Product data coming successfully...",fetchdata.data.data )

    setAllProducts(fetchdata?.data?.data || [])

  }


  useEffect(()=>{
    fetchProducts()
  },[])
  

  return (
    <>
      <div className='container-fluid bg-light '>
        <div className='row'>
          <div className='col-md-12 bg-white p-4 d-flex justify-content-between'>
            <h2>All Products</h2>
           
            <button className='btn btn-primary hover-btn rounded-pill'onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
          </div>

          <div className='d-flex justify-content-start col-md-12 flex-wrap overflow-y-scroll' style={{height:'500px'}}>
            {allProducts.map((val, index) => (
              <ProductCard key={index} product={val} />
            ))}
          </div>

           {/* Upload Product Compoent */}
          {
            openUploadProduct && (
                <UploadProduct  onClose={()=>setOpenUploadProduct(false)}/>
            )

          }
 
          
        </div>
      </div>
    </>
  )
}

export default AllProducts
