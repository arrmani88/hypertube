import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ isLoggedIn, isProfileComlete, username }) => {
	return isLoggedIn === true
		? <Outlet />
		: <Navigate to='/' />
}
export default PrivateRoutes


// const PrivateRoutes = ({ isLoggedIn, isProfileComlete, username }) => {
// 	return isLoggedIn === true
// 		? (
// 			isProfileComlete === true
// 				? <Outlet />
				// : <Navigate to={`/verify-your-account?username=${username}`} />
// 		)
// 		: <Navigate to='/' />
// }