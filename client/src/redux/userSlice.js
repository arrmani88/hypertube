import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null }

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		logIn: (state, actions) => { state.user = actions.payload },
		logOut: (state) => { state.user = null }
	}
})

export const { logIn, logOut } = userSlice.actions
export const selectUser = (state) => state.user.user
export default userSlice.reducer

