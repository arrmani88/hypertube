import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
	name: 'loadingSlice',
	initialState: { value: false },
	reducers: {
		showLoading: (state) => { state.value = true },
		hideLoading: (state) => { state.value = false }
	}
})

export const { showLoading, hideLoading } = loadingSlice.actions
export default loadingSlice.reducer