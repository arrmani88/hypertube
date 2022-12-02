import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userData: {},
	isLoggedIn: null,
	accessToken: null,
	isAccountComplete: null
}
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
			state.isLoggedIn = true
			state.accessToken = actions.payload.accessToken
			state.userData = actions.payload.userData
		},
		setUserLoggedOut: (state) => {
			state.isLoggedIn = false
			state.accessToken = null
			state.userData = {}
		},
		updateUserData: (state, actions) => {
			state.userData = actions.payload
		},
		setProfileStatus: (state, actions) => {
			state.isAccountComplete = actions.payload.isAccountComplete
			if (actions.payload.username)
				state.userData = { username: actions.payload.username }
		}
	}
})

export const { setUserLoggedIn, setUserLoggedOut, updateUserData, setProfileStatus } = userSlice.actions
export const selectUser = (state) => state.user
export default userSlice.reducer

