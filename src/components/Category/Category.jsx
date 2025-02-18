import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api.js';
import { Link } from 'react-router-dom';

const Category = () => {

    const[categoryProduct,setCategoryProduct]=useState([]);




        const fetchCategoryProduct=async()=>{
                const response=await axios.get(API_ENDPOINTS.GET_PRODUCT_BY_CATEGORY)
                setCategoryProduct(response.data.data || []);
        }



    useEffect(()=>{
        fetchCategoryProduct()
    },[])
  return (
   <>
   <div className='container-fluid'>
    <div className='row p-4'>
        <div className='col-md-12 d-flex justify-content-around p-3 flex-wrap '>
            {
                categoryProduct.map((val,index)=>{
                    return(
                        <Link to={'/category?category='+val.category} className='p-2 nav-link ' key={index}>
                            <div data-aos='zoom-in' style={{overflow:'hidden'}}>
                                <img src={val?.productImage[0]} alt={val?.category} className='img-fluid rounded-circle' style={{width:'180px',height:'180px',objectFit:'fill',cursor:'pointer'}}/>    
                            </div> 
                            <p className='text-center text-capitalize mt-2'>{val?.category}</p>   
                        </Link>
                    )
                })
            }
        </div>
    </div>
   </div>
   
   </>
  )
}

export default Category
