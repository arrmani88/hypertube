import { configureStore } from "@reduxjs/toolkit"
import sidebarReducer from './sidebar'

export default configureStore({
	reducer: {
		sidebar: sidebarReducer
	}
})
