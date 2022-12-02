import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectUser } from '../redux/userSlice'
import Home from './Home'
import Landing from './Landing'

const Hypertube = ({isLoggedIn}) => {
	const user = useSelector(selectUser)

	if (user.isAccountComplete === false)
		return <Navigate to={`/verify-your-account`} />

	return (isLoggedIn === true ?  <Home /> : <Landing />)
}

export default Hypertube
