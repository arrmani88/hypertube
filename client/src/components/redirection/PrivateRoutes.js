import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ isLoggedIn }) => {
	return isLoggedIn === true ? <Outlet /> : <Navigate to='/' />
}
export default PrivateRoutes
