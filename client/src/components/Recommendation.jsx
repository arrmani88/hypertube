import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import './styles/Recommendation.css'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

const Row = ({title, fetchUrl}) => {
	const [movies, setMovies] = useState([])

	function scrollLeft () {
		var slider = document.getElementById(`slider${title}`)
		slider.scrollLeft = slider.scrollLeft - 1000
	}
	function scrollRight () {
		var slider = document.getElementById(`slider${title}`)
		slider.scrollLeft = slider.scrollLeft + 1000
	}
	useEffect(() => {
		axios.get(fetchUrl).then((response) => {
			setMovies(response.data.results)
		})
	}, [fetchUrl])

	return (
		movies === [] ? <div /> : 
		<div>
			<h2 className='title'>{title}</h2>
			<div className='row flex w-full' id={`slider${title}`}>
				<button className='arrowScrollBgr left-0' onClick={scrollLeft}>
					<MdChevronLeft className='arrowScroll'/>
				</button>
				<div className='m-[40px]' />
				{movies.map((movie) => (
					<img key={`${movie?.id}`} className='thumbnail' src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt={movie?.original_title} />
				))}
				<div className='m-[40px]'/>
				<button className='arrowScrollBgr right-0' onClick={scrollRight}>
					<MdChevronRight className='arrowScroll'/>
				</button>
			</div>
		</div>
	)
}

export default Row

