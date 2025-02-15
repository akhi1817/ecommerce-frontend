import React, { useEffect, useState } from 'react';
import fetchCategoyWiseProduct from '../../config/fetchCategoryWiseProducts';

const HorizontalCard = ({ category, heading }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const categoryProduct = await fetchCategoyWiseProduct(category);
      console.log("Fetched category product:", categoryProduct);

      // Ensure that the fetched data is an array
      if (Array.isArray(categoryProduct?.data)) {
        setData(categoryProduct.data);
      } else {
        console.error("Expected data to be an array, got:", categoryProduct?.data?.data);
        setData([]); // default to an empty array
      }
    } catch (error) {
      console.error("Error fetching category products:", error);
      setData([]); // default to an empty array on error
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div>
      <h2 className='mt-4 ps-4'>{heading}</h2>
      <div className="row">
        {data.map((val, index) => (
          <div key={index} className="col-12 col-md-2 ps-3 mt-3">
            <div className="card">
              <img
                className="img-fluid"
                src={val.productImage}
                alt="Product"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h2 className="h5">{val.productName}</h2>
                <h5 className="text-success">₹{val.sellingPrice}</h5>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-success">Action</button>
                </div>
              </div>
            </div>
          </div>
        ))}

      
      </div>
    </div>
  );
};

export default HorizontalCard;
