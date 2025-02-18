import React, { useContext, useEffect, useState } from 'react';
import './app.css';
import fetchCategoryWiseProduct from '../../config/fetchCategoryWiseProducts';
import indianCurrency from '../../config/indianCurrency';
import addToCart from '../../config/addToCart';
import { Link } from 'react-router-dom';
import Context from '../../context';

const VerticalCardProduct = ({category , heading}) => {

      const [data, setData] = useState([]);
      const {fetchCartCount}=useContext(Context)
      const [loading,setLoading]=useState(true);

      const handleAddToCart=async(e,id)=>{
        await  addToCart(e,id)
        await fetchCartCount()
        }
    
      const fetchData = async () => {
        try {
          setLoading(true)
          const response = await fetchCategoryWiseProduct(category);
          console.log("Fetched product data:", response.data);
          
          const products = response.data.data || response.data || [];
          setData(products);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        finally {
          // Delay setting loading to false by 2 seconds
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      };
      useEffect(() => {
          if (category) {
            fetchData();
          }
        }, [category]);
  return (
    <>
     <div className="container position-relative ">
      <h2 className='mt-3 ps-4'>{heading}</h2>
      <div className='d-flex justify-content-start col-md-12 hide-scrollbar overflow-auto'> 
        
      {
        loading ?(
          data.map((product, index) => (
            <div className="col-12 col-md-4 ps-3 mt-3" >
              <div className="card ">
                <img className='bg-secondary pulse-animation' style={{ width: "100%", height: "200px", objectFit: "cover" }}/>
                <div className="card-body">
                  <p className="bg-secondary pulse-animation p-3"></p>
                  <p className="text-secondary bg-secondary pulse-animation p-2"></p>
                    <div className='d-flex'>
                      <p className='me-3 bg-secondary pulse-animation p-1'></p>
                      <p className='bg-secondary pulse-animation p-1'></p>
                    </div>
                    <button className='btn btn-primary px-5 bg-secondary pulse-animation'></button>
                </div>
              </div>
            </div>
          ))
        ):(
        data.map((product, index) => (
          <Link to={`product/${product?._id}`} className="col-12 col-md-4 ps-3 mt-3 text-decoration-none" >
            <div className="card ">
              <img  className="img-fluid"  src={product?.productImage?.[0]}  alt={"Product"}  style={{ width: "100%", height: "200px", objectFit: "cover" }}/>
              <div className="card-body">
                <p className="h5 two-line-ellipsis ">{product?.productName}</p>
                <p className="text-secondary">{product?.category}</p>
                  <div className='d-flex'>
                    <p className='me-3 text-success fw-bold'>{indianCurrency(product?.sellingPrice)}</p>
                    <p className='text-secondary text-decoration-line-through'>{indianCurrency(product?.price)}</p>
                  </div>
                  <button className='btn btn-primary px-3'onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
              </div>
            </div>
          </Link>
        )))
      }
      </div>
    </div>
    </>
  )
}

export default VerticalCardProduct
