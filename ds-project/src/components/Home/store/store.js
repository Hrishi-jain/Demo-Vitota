import {configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import authSlice from './authSlice';
import userSlice from './userSlice';


const store=configureStore({
    reducer:{
        cart:cartSlice,
        auth:authSlice,
        user: userSlice
    }
})
export default store;