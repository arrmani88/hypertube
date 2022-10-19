import React from 'react'
import Main from '../components/Main'
import Row from '../components/Recommendation'
import requests from '../Requests'
import { NavbarUserLoggedIn } from '../components/Navbar'

const Home = () => {
  return (
    <>
		<NavbarUserLoggedIn />
		<Main />
		{/* <Row title='Latest' fetchUrl={requests.requestLatest} /> */}
		<Row title='Popular' fetchUrl={requests.requestPopular} />
		<Row title='Top rated' fetchUrl={requests.requestTopRated} />
		<Row title='Now playing' fetchUrl={requests.requestNowPlaying} />
		<Row title='Upcoming' fetchUrl={requests.requestUpcoming} />
	</>
  )
}

export default Home
