import { createSlice } from "@reduxjs/toolkit";

const initialState = { userData: {}, isLoggedIn: null } 
// the `userData` property should be either: 
//		1: null if the app is currently searching for user credentials --> (state is loading)
//		2: {} if the search is finished and no user is connected --> (state is loaded)
//		3: { /*data*/ } if the user is loaded --> (state is loaded)

// the `isLoggedIn` property should be either:
//		1: null --> means state is loading
//		2: true
//		3: false

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUserLoggedIn: (state, actions) => {
			state.userData = actions.payload
			state.isLoggedIn = true
		},
		setUserLoggedOut: (state) => {
			state.userData = {}
			state.isLoggedIn = false
		},
		updateUserData: (state, actions) => {
			state.userData = actions.payload
		}
	}
})

export const { setUserLoggedIn, setUserLoggedOut, updateUserData } = userSlice.actions
export const selectUser = (state) => state.user
export default userSlice.reducer

