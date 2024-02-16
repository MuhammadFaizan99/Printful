import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import './SignUp.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    ApiKey: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}users/sign-up`, formData);

      if (response.status === 201) {
        // Show a success toast if the sign-up is successful
        toast.success('Sign up successful! You can now sign in.');
        // You can also redirect to the sign-in page or another page
        // history.push('/sign-in');
      } else {
        // Handle other status codes or error scenarios here
        toast.error('Sign up failed. Please try again.');
      }
    } catch (error) {
      // Handle network errors or other exceptions here
      console.error(error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <Transition in={true} appear={true} timeout={500}>
        {(state) => (
          <div className={`signup-container transition-${state}`}>
            <h1>Sign Up</h1>
            <p>Welcome to our platform! Fill out the form below to get started.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="UserName"
                  name="UserName"
                  placeholder="Enter your username"
                  value={formData.UserName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  placeholder="Enter your email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="Password"
                  name="Password"
                  placeholder="Enter your password"
                  value={formData.Password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="ConfirmPassword"
                  name="ConfirmPassword"
                  placeholder="Confirm your password"
                  value={formData.ConfirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="ApiKey"
                  name="ApiKey"
                  placeholder="Enter your API key"
                  value={formData.ApiKey}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className='sign-up-btn' type="submit">Sign Up</button>
            </form>
            <p>Already a member? <Link to="/sign-in"> Sign In</Link></p>
          </div>
        )}
      </Transition>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default SignUp;
