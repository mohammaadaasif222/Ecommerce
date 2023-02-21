import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginUser, registerUser } from "../../actions/authActions";

const initialState = {
  loading: false,
  authenticate:false,
  user :[]
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },
  extraReducers: {
    // ****************login********************

    [loginUser.pending]: (state, action) => {
      state.loading = true;
      state.authenticate = false
    },
    [loginUser.fulfilled]: (state,action) => {
      state.loading = false;
      state.authenticate = true
      state.user = action.payload


    },
    [loginUser.rejected]: (state, action) => {
      state.loading = true;
      state.authenticate = false
    },

    // *************************** register****************
    [registerUser.pending]: (state, action) => {
      state.loading = true;
      state.authenticate= false
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.authenticate= true
      state.user = action.payload
     
    },
    [registerUser.rejected]: (state,{ payload: error, message } ) => {
      state.authenticate= false
      state.loading = true;
    },
  },
});


export default authSlice.reducer;
