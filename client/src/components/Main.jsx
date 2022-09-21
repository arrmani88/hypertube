import React, { useEffect } from 'react'
import { useState } from 'react'
import requests from '../Requests.js'
import axios from 'axios'

const Main = () => {

	const [movies, setMovies] = useState([])

	useEffect(() => {
		axios.get(requests.requestPopular).then((response) => {
				setMovies(response.data.results)
			}
		)
	}, [])
	console.log(movies)
	return (
		<div>Main</div>
	)

}

export default Main
