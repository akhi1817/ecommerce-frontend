import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import AxiosToastError from "../../config/AxiosToastError";
import { API_ENDPOINTS } from "../../config/api";
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setUserDetails } from '../../store/userSlice'; // Import setUserDetails action

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();  // Initialize dispatch

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const response = await axios.post(
        API_ENDPOINTS.LOGIN,
        { email: values.email, password: values.password },
        { withCredentials: true }
      );
  
      if (response.data.success) {
        toast.success("Login Successful!", { duration: 5000 });
        
        // Debugging the response data
        console.log('Login Response:', response.data);
   
        dispatch(setUserDetails(response.data.user));  // Assuming response.data.user contains the user details
        navigate("/");  // Redirect after successful login
      } else {
        toast.error(response.data.message || "Login failed. Please try again.", { duration: 5000 });
      }
  
      resetForm();
    } catch (error) {
      console.error("Login Error:", error);
      AxiosToastError(error);
    }
  };
  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 d-flex">
          <div className="col-md-6">
            <img src="assets/chair.png" alt="Chair" className="img-fluid w-75 h-75" />
          </div>
          <div className="col-md-6">
            <h2 className="text-dark">Sign In</h2>
            <p className="text-secondary">
              Don't have an account? 
              <Link to="/register">
                <span className="text-success fw-bold"> Sign Up</span>
              </Link>
            </p>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <Field type="email" name="email" id="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Field type="password" name="password" id="password" className="form-control" />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>

                  <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
