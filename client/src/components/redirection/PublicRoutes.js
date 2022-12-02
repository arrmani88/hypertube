import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = ({ isLoggedIn }) => {
	return isLoggedIn === false ? <Outlet /> : <Navigate to='/' />
}

export default PublicRoutes

