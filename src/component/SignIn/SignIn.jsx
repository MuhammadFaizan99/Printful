import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import './SignIn.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
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
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}users/sign-in`, formData);

      if (response.status === 200 && response.data.token) {
        // Save the token in localStorage
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('ApiKey', response.data.user.ApiKey);
        
        // Show a success toast if the sign-in is successful
        toast.success('Sign in successful!');
      } else {
        // Handle other status codes or error scenarios here
        toast.error('Sign in failed. Please check your credentials.');
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
          <div className={`signin-container transition-${state}`}>
            <h1>Sign In</h1>
            <p>Welcome back! Please sign in to your account.</p>
            <form onSubmit={handleSubmit}>
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
              <button className='sign-in-btn' type="submit">Sign In</button>
            </form>
            <p>Not a member yet? <Link to="/sign-up"> Sign Up</Link></p>
          </div>
        )}
      </Transition>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default SignIn;