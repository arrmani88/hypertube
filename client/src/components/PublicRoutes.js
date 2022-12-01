import React from 'react'
import { Navigate, Outlet, Redirect } from 'react-router-dom';

const PublicRoutes = ({ isLoggedIn }) => {
	return isLoggedIn === false
		? <Outlet />
		: <Navigate to='/upload-image?ekdf=khkh' />
}

export default PublicRoutes