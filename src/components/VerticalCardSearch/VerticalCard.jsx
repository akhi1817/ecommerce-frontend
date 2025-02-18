import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import indianCurrency from '../../config/indianCurrency';
import Context from '../../context';
import addToCart from '../../config/addToCart';
import './app.css';

const VerticalCard = ({ searchdata = [] }) => {
  const { fetchCartCount } = useContext(Context);
  const loadingList = new Array(13).fill(null);

  const handleAddToCart = async (e, id) => {
    e.preventDefault(); 
    await addToCart(e, id);
    await fetchCartCount();
  };

  return (
    <div className="d-flex justify-content-start flex-wrap col-md-12">
      {searchdata.length > 0
        ? searchdata.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="col-12 col-md-4 ps-3 mt-3 text-decoration-none"
            >
              <div className="card">
                <img
                  className="img-fluid"
                  src={product.productImage?.[0]}
                  alt="Product"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <p className="h5 two-line-ellipsis">{product.productName}</p>
                  <p className="text-secondary">{product.category}</p>
                  <div className="d-flex">
                    <p className="me-3 text-success fw-bold">
                      {indianCurrency(product.sellingPrice)}
                    </p>
                    <p className="text-secondary text-decoration-line-through">
                      {indianCurrency(product.price)}
                    </p>
                  </div>
                  <button
                    className="btn btn-primary px-3"
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))
        : loadingList.map((_, index) => (
            <div
              key={index}
              className="col-12 col-md-4 ps-3 mt-3 text-decoration-none"
            >
              <div className="card placeholder">
                <div
                  className="img-placeholder"
                  style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#eee',
                  }}
                ></div>
                <div className="card-body">
                  <p className="h5 text-placeholder">Loading...</p>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default VerticalCard;
