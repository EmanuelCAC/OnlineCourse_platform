import { createSlice } from "@reduxjs/toolkit";
import { decodeJwt } from "jose";

const initialState = {
  status: false,
  userData: null
}

if (localStorage.getItem('token')) {
  const data = localStorage.getItem('token')
  initialState.status = true;
  initialState.userData = decodeJwt(data)
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = decodeJwt(action.payload)
    },
    logout: (state) => {
      state.status = false;
      state.userData = null
    }
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
