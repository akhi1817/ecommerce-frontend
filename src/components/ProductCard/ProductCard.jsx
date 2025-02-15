import React, { useState } from 'react';
import { MdOutlineEdit } from "react-icons/md";
import EditProduct from '../EditProduct/EditProduct';

const ProductCard = ({ product }) => {

      const[editProduct,setEditProduct]=useState(false);
  return (
      
      <div className="col-12 col-md-3 ps-3 mt-3">
      <div className="card ">
        <img
          className="img-fluid"
          src={product?.productImage?.[0]}
          alt={product?.productName || "Product"}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h2 className="h5">{product?.productName}</h2>
          <h5 className="text-success">₹{product?.sellingPrice}</h5>
          <div className="d-flex justify-content-end">
            <button className="btn btn-success">
              <MdOutlineEdit onClick={() => setEditProduct(true)} className="fs-3" />
            </button>
          </div>
        </div>
      </div>
        {
          editProduct &&(
            <EditProduct product={product} onClose={()=>setEditProduct(false)}/>
          )
        }
    </div>
    

   
     


  );
}; 

export default ProductCard;
