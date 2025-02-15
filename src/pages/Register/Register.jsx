import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import axios from "axios";
import AxiosToastError from "../../config/AxiosToastError";
import { API_ENDPOINTS } from "../../config/api";

const Register = () => {
  const navigate = useNavigate();

  
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER, {
        name: values.name,
        email: values.email,
        password: values.password,
      })
       if(response.data.error){
        toast.error(response.data.message,{duration:5000});
       }
      console.log("Response Data:", response.data);
      toast.success(response.data.message,{duration:5000});
      resetForm();
      navigate("/login")
    } catch (error) {
      console.error("Error during registration:", error);
      AxiosToastError(error)
      
    } 
  };

  return (
    <div className="container-fluid">
    
      <div className="row">
        <div className="col-md-12 d-flex  flex-column flex-md-row p-5">
          <div className="col-md-6">
            <img src="assets/chair.png" alt="Chair" className="img-fluid w-75 h-75" />
          </div>
          <div className="col-md-6">
            <h2 className="text-dark">Sign Up</h2>
            <p className="text-secondary">
              Already have an account ?
              <Link to="/login"><span className="text-success fw-bold">Sign In</span></Link></p>
                   <Formik initialValues={{name: "",email: "",password: "",confirmPassword: "",}} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <Field type="text" name="name" id="name" className="form-control" placeholder="Enter your name"/>
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <Field type="email" name="email" id="email" className="form-control" placeholder="Enter your E-mail"/>
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <Field type="password" name="password" id="password" className="form-control" placeholder="Enter your Password" />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    <Field type="password" name="confirmPassword" id="confirmPassword" className="form-control" placeholder="Confirm your password" />
                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting} >{isSubmitting ? "Submitting..." : "Register"}</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;



