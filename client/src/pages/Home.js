import React, { useEffect, useState } from 'react'
import styles from './styles/Home.module.css'
import { NavbarUserLoggedIn } from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading } from '../redux/loadingSlice'
import axios from 'axios'
import Category from '../components/Category'
import { useTranslation } from 'react-i18next'

const requests = {
	requestPopular: `https://yts.mx/api/v2/list_movies.json?sort_by=like_count&minimum_rating=6`,
	requestLatest: `https://yts.mx/api/v2/list_movies.json?sort_by=date_added&minimum_rating=6`,
	requestTopRated: `https://yts.mx/api/v2/list_movies.json?sort_by=rating`,
	// requestNowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=4a3da46412d3067a8577584a5b63fdeb`,
	// requestUpcoming:  `https://api.themoviedb.org/3/movie/upcoming?api_key=4a3da46412d3067a8577584a5b63fdeb`
}

const Home = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const [movies, setMovies] = useState({})
	var headerMovie
	

	useEffect(() => {
		const getData = async () => {
			try {
				await Promise.all([
					axios.get(requests.requestPopular).then(async rsp => {
						headerMovie = rsp.data.data.movies[Math.floor(Math.random() * rsp.data.data.movies.length)]
						await axios.get(`https://yts.mx/api/v2/movie_details.json?imdb_id=${headerMovie.imdb_code}&with_images=true`).then(resp => {
							headerMovie.wallpaper = resp.data.data.movie.large_screenshot_image1
							setMovies(prevState => ({ ...prevState, popular: rsp.data.data.movies, headerMovie }))
						})
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
	}, []) // eslint-disable-line

	return (
		movies.isDataLoaded === true ? <>
			<NavbarUserLoggedIn />
			<div className={styles.container} >

				<div className={styles.header} >
					<img className={styles.headerImg} src={movies.headerMovie.wallpaper} alt={'headerImg'} />
					<div className={styles.headerGradient} />
					<div className={styles.headerContent} >
						<h1 className={styles.movieTitle}>{movies.headerMovie.title}</h1>
						<div className='row'>
							<button className={styles.playButton}>{t('play')}</button>
							<button className={styles.watchLaterButton}>{t('watch_later')}</button>
						</div>
						<h1 className={styles.rating}>{t('imdb_rating')}: {movies.headerMovie.rating}/10</h1>
						<p className={styles.summary}>{movies.headerMovie?.summary}</p>
					</div>
				</div>
				<Category title='popular' movies={movies.popular} />
				<Category title='top_rated' movies={movies.popular} />
				<Category title='latest' movies={movies.popular} />
			</div>
		</> : <div />
	)
}

export default Home

