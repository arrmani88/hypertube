import React, { useEffect } from 'react'
import Main from '../components/Main'
import Row from '../components/Recommendation'
import { NavbarUserLoggedIn } from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading } from '../redux/loadingSlice'
import { selectUser } from '../redux/userSlice'

const key = '4a3da46412d3067a8577584a5b63fdeb'
const requests = {
	requestLatest: `https://api.themoviedb.org/3/movie/latest?api_key=${key}`,
	requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}`,
	requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
	requestNowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`,
	requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`

}

const Home = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)

	useEffect(() => { dispatch(hideLoading()) }, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='absolute h-full w-full flex-col' >
			<NavbarUserLoggedIn />
			<Main />
			<Row title='Popular' fetchUrl={requests.requestPopular} />
			<Row title='Top rated' fetchUrl={requests.requestTopRated} />
			<Row title='Now playing' fetchUrl={requests.requestNowPlaying} />
			<Row title='Upcoming' fetchUrl={requests.requestUpcoming} />
		</div>
	)
}

export default Home

