import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '../utils/instance';
import { useDispatch } from 'react-redux';
import { getuser } from '../Home/store/userSlice';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
 const naviget = useNavigate();
 const Dispatch = useDispatch()


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleMobileChange = (e) => {
    setphoneNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      const {data} = await axios.post(`${USER_API_END_POINT}/user/send-otp`, { phoneNumber });
      console.log("data" ,data);
      setIsOtpSent(true);
    } catch (error) {
      console.log("OTP Sended :", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("hii buddy")
      const response = await axios.post(`${USER_API_END_POINT}/user/signup`, {
        name, email, phoneNumber, password, otp
      })
      Dispatch(getuser(response?.data?.user))
      localStorage.setItem("user", JSON.stringify(response.data));

      if (response.status === 201) {
        setIsRegistered(true)
        console.log("registration successfull");
        naviget('/')
      }
    } catch (error) {
      console.log(error);
    }
    setIsRegistered(true);
    console.log('Registration Details:', { name, email, password, contact });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-20 pt-20">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {!isRegistered ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-600">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-sm font-semibold text-gray-600">Conatct</label>
              <input
                type="text"
                id="contact"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your mobile number"
                value={phoneNumber}
                onChange={handleMobileChange}
                required
              />
            </div>
            {isOtpSent ? (
              <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-semibold text-gray-600">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  required
                />
              </div>
            ) : (
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">OTP will be sent to your mobile number</span>
                <button
                  type="button"
                  className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
              </div>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Register
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Registration Successful!</h3>
            <p>Your account has been registered successfully.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;