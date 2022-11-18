import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import Home from './Home'
import Landing from './Landing'

const Hypertube = () => {
	const [pageState, setPageState] = useState('loading') // should be either loading or home or landing

	useEffect(() => {
		const isUserLoggedIn = async () => {
			try {
				const userCredentials = JSON.parse(localStorage.getItem('userCredentials'))
				if (!userCredentials) return setPageState('landing') // if no userCredentials is stored, display the landing page
				const user = await axios.get(  // get the user or status=401 (401 means the accessToken isnt valid)
					`${process.env.REACT_APP_SERVER_HOSTNAME}/get_me`,
					{ headers: { Authorization: userCredentials.accessToken } }
				)
				if (user.status === 200) {
					
					setPageState('home')
				} else {
					setPageState('landing')
				}
			} catch (err) {
				console.log(err)
				if (err.response.status / 100 === 4) setPageState('landing')  // err.rsp.status / 100 -> means 400 or 401 or 403
			}
		}
		isUserLoggedIn()
	}, [])

	return (pageState === 'loading' ? <Loading /> : (pageState === 'home' ? <Home /> : <Landing />))
}

export default Hypertube