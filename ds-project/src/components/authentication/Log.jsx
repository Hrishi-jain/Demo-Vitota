import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '../utils/instance';
import { getuser } from '../Home/store/userSlice';
import { useDispatch } from "react-redux";


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();


  
  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${USER_API_END_POINT}/user/signin`, {
        email,
        password,
      });
      console.log("USER DETAILS", response);
      dispatch(getuser(response?.data?.user));
      console.log("hogyaa login");
      navigate("/");
      localStorage.setItem("user", JSON.stringify(response.data));

    } catch (err) {
      setError(err.response);
      navigate("/login");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 mt-20 pt-20">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
