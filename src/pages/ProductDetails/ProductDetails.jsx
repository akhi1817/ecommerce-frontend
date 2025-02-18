import React, { useContext, useEffect, useState } from 'react';
import './app.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';
import toast from 'react-hot-toast';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import indianCurrency from '../../config/indianCurrency';
import RecommendedProducts from '../../components/RecommendedProducts/RecommendedProducts';
import addToCart from '../../config/addToCart';
import Context from '../../context';

const ProductDetails = () => {
  const [data, setData] = useState({ productName: '', category: '', productImage: [], description: '', price: '', sellingPrice: '' });
  const [loading, setLoading] = useState(true);
  const {fetchCartCount}=useContext(Context)
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const navigate=useNavigate();

  const { productId } = useParams();
  console.log("Product ID:", productId);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.GET_PRODUCT_BY_ID, { productId }, { headers: { 'Content-Type': 'application/json' } });
      console.log("Response Data:", response.data.data);

      if (response.data.success) {
        toast.success(response.data.message);
        setData(response?.data?.data);
        setActiveImage(response?.data?.data?.productImage[0]);
      } else {
        toast.error(response.data.message);
        console.error("Failed to fetch product details:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  // choose image
  const handleMouseHoverImage = (image) => {
    setActiveImage(image);
  };

  // image zoom
  const handleZoomImage = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomImageCoordinate({ x, y });
  };

  //add to cart
  const handleAddToCart=async(e,id)=>{
    await  addToCart(e,id)
    await fetchCartCount()
    }

  const handleBuyNow=async(e,id)=>{
    await  addToCart(e,id)
    await fetchCartCount()
    navigate('/cart')
  }


  return (
    <>
      <div className='container-fluid bg-light' style={{ paddingTop: '90px' }}>
        {loading ? (
          // Loading state
          <div style={{ margin: '0px', padding: '0px' }} className='row'>
            <div className='col-md-6 d-flex'>
              <div className='d-flex gap-2 flex-column mt-2'>
                {data?.productImage?.map((image) => (
                  <div style={{ width: '90px', height: '90px' }} className='bg-secondary pulse-animation' key={image}></div>
                ))}
              </div>
              <div className='ms-3'>
                {activeImage && (
                  <div style={{ width: '500px', height: '500px' }} className='bg-secondary pulse-animation'></div>
                )}
              </div>
            </div>
            <div className='col-md-6 d-flex flex-column'>
              <h2 className='mt-3 px-3 py-3 bg-secondary pulse-animation'></h2>
              <h5 className='mt-3 px-3 py-3 bg-secondary pulse-animation'></h5>
              <div className='d-flex fs-3'>
                <FaStar className='p-2 bg-secondary pulse-animation' />
                <FaStar className='p-2 bg-secondary pulse-animation' />
                <FaStar className='p-2 bg-secondary pulse-animation' />
                <FaStar className='p-2 bg-secondary pulse-animation' />
                <FaStar className='p-2 bg-secondary pulse-animation' />
              </div>
              <div className='d-flex mt-3'>
                <h5 className='me-3 px-5 py-3 bg-secondary pulse-animation'></h5>
                <h5 className='px-5 py-3 bg-secondary pulse-animation'></h5>
              </div>
              <div className='mt-3'>
                <button className='bg-secondary pulse-animation btn mx-2 my-3 px-4 py-2'></button>
                <button className='bg-secondary pulse-animation btn mx-2 my-3 px-4 py-2'></button>
              </div>
            </div>
          </div>
        ) : (
          <div className='row'>
            {/* Product Image Section */}
            <div className='col-md-6 d-flex flex-wrap'>
              <div className='d-flex flex-wrap flex-md-column gap-2  mt-2'>
                {
                data?.productImage?.map((image) =>{
              return(
                      <div style={{ width: '90px', height: '90px' }} key={image}>
                        <img src={image} className='w-100 h-100' alt="thumbnail" onMouseEnter={() => handleMouseHoverImage(image)}/>
                      </div>
                    )
              })
              }
              </div>
              <div className='ms-3 mt-3 position-relative'>
                {
                activeImage && (
                  <div style={{ width: '500px', height: '500px' }} className='position-relative'>
                    <img  src={activeImage}  className='w-100 h-100 img-fluid'  alt="Product"  onMouseMove={handleZoomImage}  onMouseEnter={() => setShowZoom(true)}  onMouseLeave={() => setShowZoom(false)}/>
                    {
                    showZoom && (
                      <div style={{  position: 'absolute',  top: 0,  left: '105%',  width: '600px',  height: '500px',
                          backgroundImage: `url(${activeImage})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '400%',
                          backgroundPosition: `${zoomImageCoordinate.x}% ${zoomImageCoordinate.y}%`}} className='d-none d-md-block'></div>
                    )
                    }
                  </div>
                )
                }
              </div>
            </div>
            {/* Product Details Section */}

            <div className='col-md-6 d-flex flex-wrap flex-column'>
              <h2 className='mt-3 text-capitalize'>{data.productName}</h2>
              <h5 className='mt-2 text-capitalize'>{data.category}</h5>
              <div className='text-warning d-flex fs-4 mt-2'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <div className='d-flex mt-3'>
                <h5 className='me-3 text-success fw-bold'>{indianCurrency(data?.sellingPrice)}</h5>
                <h5 className='text-secondary text-decoration-line-through'>{indianCurrency(data?.price)}</h5>
              </div>
              <div className='mt-3'>
                <button className='btn btn-warning mx-2 my-3 px-4 py-2' onClick={(e)=>handleBuyNow(e,productId)}>Buy Now</button>
                <button className='btn btn-primary mx-2 my-3 px-4 py-2' onClick={(e)=>handleAddToCart(e,productId)}>Add to Cart</button>
              </div>
            </div>
          </div>
        )}

            <RecommendedProducts  category={data?.category} heading={`Recommended Products`} />
      </div>

      
    </>
  );
};

export default ProductDetails;
