import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import './styles/Recommendation.css'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
// import useWindowDimensions from '../functions/getWindowDimensions'

const Row = ({title, fetchUrl}) => {
	const [movies, setMovies] = useState([])
	// const windowDimensions = useWindowDimensions()

	function scroll (size) {
		var slider = document.getElementById(`slider${title}`)
		slider.scrollLeft = slider.scrollLeft + size
	}
	useEffect(() => {
		axios.get(fetchUrl).then((response) => {
			setMovies(response.data.results)
	})}, [fetchUrl])
	
	return (
		movies === [] ? <div /> : 
		<div>
			<h2 className='title'>{title}</h2>
			<div className='row' id={`slider${title}`}>
				{movies.map((movie) => (
					<img key={`${movie?.id}`} className='thumbnail' src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt={movie?.original_title} />
				))}
				<button className='arrowScrollBkgr left-0' onClick={() => scroll(-window.innerWidth * 0.65)}>
					<MdChevronLeft className='arrowScroll'/>
				</button>
				<button className='arrowScrollBkgr right-0' onClick={() => scroll(window.innerWidth  * 0.65)}>
					<MdChevronRight className='arrowScroll'/>
				</button>
			</div>
		</div>
	)
}

export default Row

