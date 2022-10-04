import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const Row = ({title, fetchUrl}) => {
	const [movies, setMovies] = useState([])

	useEffect(() => {
		axios.get(fetchUrl).then((response) => {
			setMovies(response.data.results)
		})
	}, [fetchUrl])

	// console.log(movies)
	return (
		movies === [] ? <div /> : 
		<>
			<h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
			<div className='flex flex-1 overflow-auto'>
				<div className='flex min-w-min'>

				</div>
			</div>
		</>
	)
}

export default Row
