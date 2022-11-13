import { configureStore } from "@reduxjs/toolkit"
import sidebarReducer from './sidebar'
import loadingReducer from './loading'

export default configureStore({
	reducer: {
		sidebar: sidebarReducer,
		loading: loadingReducer
	}
})
