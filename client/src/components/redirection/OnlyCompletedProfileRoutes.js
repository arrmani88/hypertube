import React from 'react'
import { selectUser } from '../../redux/userSlice';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const OnlyCompletedProfileRoutes = () => {
	const user = useSelector(selectUser)
	
	if (user.isAccountComplete === false)
		return <Navigate to={`/verify-your-account`} />
	else
		return <Outlet />
}

export default OnlyCompletedProfileRoutes