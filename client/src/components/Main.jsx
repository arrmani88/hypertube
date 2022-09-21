import React, { useEffect } from 'react'
import { useState } from 'react'
import requests from '../Requests.js'
import axios from 'axios'

const Main = () => {

	const [movies, setMovies] = useState([])
	const movie = movies[Math.floor(Math.random() * movies.length)]
	
	useEffect(() => {
		axios.get(requests.requestPopular).then((response) => {
				setMovies(response.data.results)
			}
		)
	}, [])
	console.log(movie)
	return (
		<div>Main</div>
	)
}

export default Main
