import React, { useEffect, useState } from 'react'
import styles from './styles/Home.module.css'
import { NavbarUserLoggedIn } from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading } from '../redux/loadingSlice'
import { selectUser } from '../redux/userSlice'
import axios from 'axios'
import Category from '../components/Category'

const tmpImg = 'https://image.tmdb.org/t/p/original//198vrF8k7mfQ4FjDJsBmdQcaiyq.jpg'
const requests = {
	requestPopular: `https://yts.mx/api/v2/list_movies.json?sort_by=like_count&minimum_rating=6`,
	requestLatest: `https://yts.mx/api/v2/list_movies.json?sort_by=date_added&minimum_rating=6`,
	requestTopRated: `https://yts.mx/api/v2/list_movies.json?sort_by=rating`,
	// requestNowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=4a3da46412d3067a8577584a5b63fdeb`,
	// requestUpcoming:  `https://api.themoviedb.org/3/movie/upcoming?api_key=4a3da46412d3067a8577584a5b63fdeb`
}

const Home = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const [movies, setMovies] = useState({})
	console.log('header=', movies.headerMovie)

	useEffect(() => {
		const getData = async () => {
			try {
				await Promise.all([
					axios.get(requests.requestPopular).then(rsp => {
						console.log('-------------------- data jaat --------------------')
						setMovies(prevState => ({ ...prevState, popular: rsp.data.data.movies, headerMovie: rsp.data.data.movies[Math.floor(Math.random() * rsp.data.data.movies.length)] }))
					}),
					// axios.get(requests.requestLatest).then(rsp => { setMovies(prevState => ({ ...prevState, latest: rsp.data.data.movies })) }),
					// axios.get(requests.requestTopRated).then(rsp => { setMovies(prevState => ({ ...prevState, topRated: rsp.data.data.movies })) }),
				])
				dispatch(hideLoading())
			} catch (error) {
				console.log(error)
			} finally {
				setMovies(prevState => ({ ...prevState, isDataLoaded: true }))
			}
		}
		getData()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		movies.isDataLoaded === true ? <>
			<NavbarUserLoggedIn />
			<div className={styles.container} >

				<div className={styles.header} >
					<img className={styles.headerImg} src={tmpImg} alt={'headerImg'} />
					<div className={styles.headerGradient} />
					<div className={styles.headerContent} >
						<h1 className={styles.movieTitle}>{movies.headerMovie.title}</h1>
						<div className='row'>
							<button className={styles.playButton}>Play</button>
							<button className={styles.watchLaterButton}>Watch later</button>
						</div>
						<h1 className={styles.rating}>IMDb rating: {movies.headerMovie.rating}/10</h1>
						<p className={styles.summary}>{movies.headerMovie?.summary}</p>
					</div>
				</div>

				<Category title='Popular' movies={movies.popular} />
				<Category title='Top rated' movies={movies.popular} />
				<Category title='Latest' movies={movies.popular} />

			</div>
		</> : <div />
	)
}

export default Home

