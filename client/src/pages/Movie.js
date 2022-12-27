import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { hideLoading } from '../redux/loadingSlice'
import css from './styles/Movie.module.css'

const Movie = () => {
	const { imdbID } = useParams()
	const dispatch = useDispatch()
	const [ movie, setMovie ] = useState({ isDataLoaded: false })
	console.log('move=', movie)

	useEffect(() => {
		const fetchData = async () => {
			try {
				await Promise.all([
					axios.get(`https://yts.mx/api/v2/movie_details.json?imdb_id=${imdbID}`).then(resp => {
						setMovie(prevState => ({ ...prevState, ...(resp.data.data.movie) }))
					}),
					axios.get(`https://api.themoviedb.org/3/movie/${imdbID}?api_key=${process.env.REACT_APP_TMDB_TOKEN}`).then(resp => {
						setMovie(prevState => ({ ...prevState, backdrop_image: `https://image.tmdb.org/t/p/original/${resp.data.backdrop_path}` }))
					})
				])
				setMovie(prevState => ({ ...prevState, isDataLoaded: true }))

			} catch (error) {
				console.log(error)
			} finally {
				dispatch(hideLoading())
			}
		}
		fetchData()
	}, [])

	return (
		<>{movie.isDataLoaded &&
			<div className={css.container} >
				<div className={css.header} >
					<img className={css.backdropImage} src={movie.backdrop_image} />
					<div className={css.gradient} />
				</div>
				<div className={css.filmContent} >

				</div>
			</div>
		}</>
	)
}

export default Movie