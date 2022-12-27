import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { hideLoading } from '../redux/loadingSlice'
import css from './styles/Movie.module.css'

const Movie = () => {
	const { imdbID } = useParams()
	const dispatch = useDispatch()

	useEffect( async () => {
		try {
			const result = await axios.get(`https://yts.mx/api/v2/movie_details.json?imdb_id=${imdbID}`)
		} catch (error) {
			
		} finally {
			dispatch(hideLoading())
		}
	}, [])

	return (
		<div>Movie</div>
	)
}

export default Movie