import React, { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './app.css';
import fetchCategoryWiseProduct from '../../config/fetchCategoryWiseProducts';
import indianCurrency from '../../config/indianCurrency';
import addToCart from '../../config/addToCart';
import Context from '../../context';

const HorizontalCard = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const {fetchCartCount}=useContext(Context)

  const[loading,setLoading]=useState(true)

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
    }},[category]);


  

  return (
    <div className="container position-relative">
      <h2 className='mt-3 ps-4'>{heading}</h2>
      <div className='d-flex justify-content-start col-md-12 hide-scrollbar overflow-auto'>
        
      {
        loading ?(
            data.map(() => (
          <div className="col-12 col-md-4 ps-3 mt-3" >
            <div className="card ">
              <div className="card-body d-flex justify-content-around">
                <div className='bg-secondary pulse-animation '>
                <img style={{ width: "200px", height: "130px" }}/>

                </div>
                <div className='ms-3'>
                  <p className=" p-3  bg-secondary pulse-animation rounded-pill"></p>
                  <p className=" p-2  bg-secondary  rounded-pill"></p>
                    <div className='d-flex'>
                      <p className=' p-3  bg-secondary pulse-animation'></p>
                      <p className=' p-3  bg-secondary pulse-animation'></p>
                    </div>
                    <button className='btn btn-primary px-5  pulse-animation'></button>
                </div>
              </div>
            </div>
          </div>
        ))
        ):(
        data.map((product, index) =>{
          return (
          <Link to={`product/${product?._id}`} key={product?._id || index} className="col-12 col-md-4 ps-3 mt-3 text-decoration-none">
            <div className="card ">
              <div className="card-body d-flex justify-content-around">
                <div className='me-3'>
                  <img  className="img-fluid"  src={product?.productImage?.[0]}  alt={"Product"}  style={{ width: "200px", height: "130px", objectFit: "cover" }}/>
                </div>
                <div className='ms-3'>
                  <p className="h5 two-line-ellipsis">{product?.productName}</p>
                  <p className="text-secondary">{product?.category}</p>
                    <div className='d-flex'>
                      <p className='me-3 text-success fw-bold'>{indianCurrency(product?.sellingPrice)}</p>
                      <p className='text-secondary text-decoration-line-through'>{indianCurrency(product?.price)}</p>
                    </div>
                    <button className='btn btn-primary px-3' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                </div>
              </div>
            </div>
          </Link>
        )
}))
      } 
      </div>
    </div>
  );
};

export default HorizontalCard;
