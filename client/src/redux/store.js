import { configureStore } from "@reduxjs/toolkit"
import sidebarReducer from './sidebarSlice'
import loadingReducer from './loadingSlice'
import userReducer from './userSlice'

export default configureStore({
	reducer: {
		sidebar: sidebarReducer,
		loading: loadingReducer,
		user: userReducer,
	}
})
