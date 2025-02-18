import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api.js';
import Context from '../../context/index.js';
import indianCurrency from '../../config/indianCurrency.js';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";

const Cart = () => {


      const[data,setData]=useState([]);

      const context=useContext(Context)
//display cart Products
      const fetchData=async()=>{
        const response= await axios.get(API_ENDPOINTS.DISPLAY_CART_PRODUCTS,{withCredentials:true})

        console.log("cart products fetched",response?.data?.data);
        if(response.data.success){
          setData(response.data.data)
        }
      }

      useEffect(()=>{
        fetchData();
      },[])

//qty add
      const increaseQty = async (id, qty) => {
        try {
          const response = await axios.put(API_ENDPOINTS.UPDATE_CART,{ _id: id, quantity: qty + 1 },{ withCredentials: true });
      
          if (response.data.success) {
            toast.success(response.data.message);
            fetchData(); 
          } else {
            toast.error(response.data.message);
            console.error(response.data);
          }
        } catch (error) {
          console.error("Error updating quantity:", error.response?.data || error.message);
          toast.error("Failed to update quantity");
        }
      };
//qty sub
      const decreaseQty = async (id, qty) => {
        try {

          if(qty>=2){
          const response = await axios.put(  API_ENDPOINTS.UPDATE_CART, { _id: id, quantity: qty - 1 },
            { withCredentials: true });
      
          if (response.data.success) {
            toast.success(response.data.message);
            fetchData(); 
          } else {
            toast.error(response.data.message);
            console.error(response.data);
          }
        }
        } catch (error) {
          console.error("Error updating quantity:", error.response?.data || error.message);
          toast.error("Failed to update quantity");
        }
      };

//delete cart items
const deleteCartItem = async (id) => {
  try {
    const response = await axios.delete(`${API_ENDPOINTS.DELETE_CART}/${id}`,{ withCredentials: true });
    
    if (response.data.success) {
      toast.success(response.data.message);
      fetchData();   
      context.fetchCartCount();
    } else {
      toast.error(response.data.message);
      console.error(response.data.error);
    }
  } catch (error) {
    console.error("Error deleting cart item:", error.response?.data || error.message);
    toast.error("Failed to delete cart item");
  }
};


const totalQty= data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
const totalPrice= data.reduce((prev,curr)=> prev + (curr.quantity * curr?.productId?.sellingPrice),0)
      

  return (
    <>
    <div className='container-fluid col-md-12 w-100 h-100'>
      <div className='row'>
        <div className='col-md-6'>
        {
          data.map((product,index)=>{
            return(
              <div className='row d-flex justify-content-between bg-light my-3 p-3' key={product?._id}>
                    <div className='col-md-4'>
                        <div style={{width:'180px',height:'180px',objectFit:'cover'}} >
                            <img src={product?.productId?.productImage[0]} className='img-fluid' />
                        </div>
                       
                    </div>
                    <div className='col-md-8 d-flex justify-content-between ms-3 mt-2'>
                        <div className='col-md-10'>
                            <h4 className='text-capitalize'>{product?.productId?.productName}</h4>
                            <p className='text-capitalize'>{product?.productId?.category}</p>
                            <div className='d-flex justify-content-between'>
                                <p className='me-3'>{indianCurrency(product?.productId?.sellingPrice)}</p>
                                <p>{indianCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                            </div>
                            <div>
                                <button className='btn btn-outline-dark'onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                <span className='mx-2'>{product?.quantity}</span>
                                <button className='btn btn-outline-warning' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                            </div>
                        </div>
                        <div className='col-md-2'>
                          <button onClick={()=>deleteCartItem(product?._id)} className='btn btn-danger rounded-circle'><MdDelete className='fs-4'/></button>
                        </div>
                     
                      
                    </div>
                    
              </div>
            )
          })
        }
        </div>
      
      <div className='col-md-6 justify-content-center'>
                        <h2 className='me-3 bg-warning text-dark px-3 py-2 border border-5 border-dark'>Summary </h2>
                        <div className='me-3 d-flex justify-content-between align-items-center'>
                          <p className='fw-bold fs-5 me-3'>Quantity :</p>
                          <p className='fw-bold fs-5'>{totalQty}</p>
                        </div>
                        <div className='me-3 d-flex justify-content-between align-items-center'>
                          <p className='fw-bold fs-5 me-3'>Total Price :</p>
                          <p className='fw-bold fs-5'>{indianCurrency(totalPrice)}</p>
                        </div>
                        <div className='text-center'>
                            <button className='btn btn-outline-primary px-5  my-3 fw-bold fs-5'>Payment</button>
                        </div>
      </div>

</div>
    </div>
    
    </>
  )
}

export default Cart
