import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sidebarSlice } from "./sidebar";

const userCredentials = JSON.parse(localStorage.getItem("userCredentials"))
const initialState = { userCredentials: (userCredentials || null) }

export const userCredentialsSlice = createSlice({
	name: 'userCredentialsSlice',
	initialState,
	reducers: {
		logIn: (state, action) => { state.userCredentials = action.payload },
		logOut: (state) => { state.userCredentials = null }
	}
})

export const { logIn, logOut } = userCredentialsSlice.actions
export default sidebarSlice.reducer
