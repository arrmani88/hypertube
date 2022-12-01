import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/userSlice'
import Home from './Home'
import Landing from './Landing'

const Hypertube = ({isLoggedIn}) => {
	return (isLoggedIn === true ?  <Home /> : <Landing />)
}

export default Hypertube
