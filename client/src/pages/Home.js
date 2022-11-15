import React, { useEffect } from 'react'
import Main from '../components/Main'
import Row from '../components/Recommendation'
import requests from '../Requests'
import { NavbarUserLoggedIn } from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { hideLoading } from '../redux/loading'

const Home = () => {
	const dispatch = useDispatch()
	// 
	useEffect(() => { dispatch(hideLoading()) }, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='absolute h-full w-full flex-col' >
			<NavbarUserLoggedIn />
			<Main />
			{/* <Row title='Latest' fetchUrl={requests.requestLatest} /> */}
			<Row title='Popular' fetchUrl={requests.requestPopular} />
			<Row title='Top rated' fetchUrl={requests.requestTopRated} />
			<Row title='Now playing' fetchUrl={requests.requestNowPlaying} />
			<Row title='Upcoming' fetchUrl={requests.requestUpcoming} />
		</div>
	)
}

export default Home

