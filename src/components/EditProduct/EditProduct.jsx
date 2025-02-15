import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import productCategory from '../../config/productCategory.js';  
import { IoIosCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import uploadImage from '../../config/uploadImage.js';
import DisplayImage from '../DisplayImage/DisplayImage.jsx';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EditProduct = ({
    onClose,product
}) => {

    const navigate = useNavigate();

  const [data, setData] = useState({
    id: product._id,
    productName: product.productName,
    category:product.category,
    productImage: product.productImage,
    description:product.description,
    price:product.price,
    sellingPrice:product.sellingPrice
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // For image uploading
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    console.log("file", file);

    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.secure_url]
      };
    });

    console.log("upload image", uploadImageCloudinary.secure_url);
  };

  // For deleting selected photo
  const handleDelete = async (index) => {
    console.log("image index", index);

    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage]
      };
    });
  };

  // For submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure price and sellingPrice are numbers
    const updatedData = {
      ...data,
      price: parseFloat(data.price),
      sellingPrice: parseFloat(data.sellingPrice)
    };
  
    const token = localStorage.getItem("authToken");
    const productId = updatedData.id;
  
    // Debugging step
    console.log("Product ID:", productId);
  
    if (!productId) {
      toast.error("Product ID is missing.");
      return;
    }
  
    try {
      const fetchData = await axios.put(
        `${API_ENDPOINTS.UPDATE_PRODUCT}/${productId}`,
        updatedData, // Send product data in request body
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      console.log(fetchData.data);
  
      if (fetchData?.data?.success) {
        toast.success(fetchData?.data?.message, { duration: 5000 });
        onClose();
        navigate('/admin-panel/all-products');
        window.location.reload();
      } else {
        toast.error(fetchData.data.message || "Failed to upload product. Please try again.", { duration: 5000 });
      }
    } catch (error) {
      console.error("Error during product update:", error.response?.data || error.message);
      toast.error("Failed to upload product. Please try again.", { duration: 5000 });
    }
  };
  
  return (
    <div className="container-fluid bg-white" style={{ height: '700px' }}>
    <div className="row justify-content-center align-items-center">
      <div className="col-md-10 position-absolute top-50 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
        <div className="card  shadow-lg p-4 rounded bg-white w-50 position-relative">
          <div className="card-body d-flex justify-content-between">
            <h4>Edit Product</h4>
            <button className="btn" onClick={onClose}><IoClose className="fs-3 pointer" /></button>
          </div>

          <form onSubmit={handleSubmit} className="overflow-y-scroll" style={{ height: '700px' }}>
            <div className="row ms-5">
              <div className="col-md-8 mt-3">
                <label htmlFor="productName" className="fw-bold">Product Name:</label>
                <input
                  className="form-control mt-2"
                  id="productName"
                  type="text"
                  value={data.productName}
                  name="productName"
                  placeholder="Enter the name of product"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-8 mt-3">
                <label htmlFor="category" className="fw-bold">Category:</label>
                <select
                  className="form-control mt-2"
                  onChange={handleChange}
                  value={data.category}
                  id="category"
                  name="category"
                  required
                >
                  {productCategory.map((val, index) => (
                    <option value={val.value} key={val.value + index}>{val.label}</option>
                  ))}
                </select>
              </div>

              {/* Uploading image */}
              <div className="col-md-8 mt-3">
                <label htmlFor="productImage" className="fw-bold">Product Image:</label>
                <label htmlFor="uploadImage" className="form-control w-100 h-100 cursor-pointer">
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <span><IoIosCloudUpload className="fs-1" /></span>
                    <p>Upload Product Image</p>
                    <input type="file" id="uploadImage" className="d-none" onChange={handleUpload} />
                  </div>
                </label>
              </div>

              {/* Displaying image */}
              <div className="col-md-8 mt-5 d-flex">
                {data?.productImage[0] ? (
                  data.productImage.map((val, index) => (
                    <div className="position-relative" key={index}>
                      <img
                        className="img-fluid border"
                        alt={val}
                        src={val}
                        style={{ width: '100px', height: '100px', marginLeft: '20px' }}
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(val);
                        }}
                      />
                      <div className="position-absolute bottom-0 ps-3">
                        <MdDelete
                          className="fs-5 text-white bg-danger rounded-circle"
                          onClick={() => handleDelete(index)}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>*Please Upload Product Image</p>
                )}
              </div>

              {/* Price */}
              <div className="col-md-8 mt-3">
                <label htmlFor="price" className="fw-bold">Price:</label>
                <input
                  className="form-control mt-2"
                  id="price"
                  type="number"
                  value={data.price}
                  name="price"
                  placeholder="Enter the price of product"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Selling Price */}
              <div className="col-md-8 mt-3">
                <label htmlFor="sellingPrice" className="fw-bold">Selling Price:</label>
                <input
                  className="form-control mt-2"
                  id="sellingPrice"
                  type="number"
                  value={data.sellingPrice}
                  name="sellingPrice"
                  placeholder="Enter the selling price of product"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="col-md-8 mt-3">
                <label htmlFor="description" className="fw-bold">Product Description:</label>
                <textarea
                  className="h-100 w-100 form-control mt-2"
                  id="description"
                  value={data.description}
                  name="description"
                  placeholder="Enter product description"
                  style={{ resize: 'none' }}
                  rows={2}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <div className="col-md-8 mt-5 text-center">
                <button className="btn btn-success">Edit Product</button>
              </div>
            </div>
          </form>
        </div>

        {/* Display image full screen */}
        <div className="position-absolute top-50 start-50 translate-middle">
          {openFullScreenImage && (
            <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgurl={fullScreenImage} />
          )}
        </div>
      </div>
    </div>
  </div>
  )
}

export default EditProduct
