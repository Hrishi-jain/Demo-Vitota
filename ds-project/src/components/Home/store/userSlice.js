import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  otherUser: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getuser:(state , action) =>{
      state.user = action.payload
    },
    getotherUser:(state , action) =>{
      state.otherUser = action.payload
    },
    logoutuser:(state , action) =>{
      // state.logoutuser = action.payload
      state.user = null;
    }
  } 
})

// Action creators are generated for each case reducer function
export const { getuser , getotherUser, logoutuser} = userSlice.actions

export default userSlice.reducer