import React from 'react'
import './styles/Category.css'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import styles from '../pages/styles/SearchMovies.module.scss'
import emptyMovieImage from '../images/empty_movie_image.jpeg'
import imdbLogo from '../images/imdb_logo.png'
import { BsPlayFill } from 'react-icons/bs'

const Category = ({ title, movies }) => {
	const { t } = useTranslation()

	const scroll = (size) => {
		var slider = document.getElementById(`slider${title}`)
		slider.scrollLeft = slider.scrollLeft + size
	}

	return (
		movies === [] ? <div /> :
			<div>
				<h2 className='title'>{t(title)}</h2>
				<div className='container' id={`slider${title}`}>

					<div className='flex row'>
						{movies.map((movie, index) => (
							<div className={styles.movie} key={index}>
								<div className={styles.thumbnail} >
									<img className={styles.movieImage} src={movie.medium_cover_image} onError={(err) => { err.target.src = emptyMovieImage }} alt={movie.title} />
									<div className={styles.movieDetails}>
										<h1 className={styles.movieYear} >{movie.year}</h1>
										{movie.genres.map(genre => (
											<h1 className={styles.movieGenre} key={genre}>{genre}</h1>
										))}
										<div className='mt-[10px]' />
										<a href={`${process.env.REACT_APP_CLIENT_HOSTNAME}/movie/${movie.imdb_code}`} className={styles.playNow} >
											<h1>{t('play')}</h1>
											<BsPlayFill className='mt-[3px] text-2xl' />
										</a>
									</div>
								</div>
								<h1 className={styles.movieTitle} key={`${movie.title}`}>{movie.title.substring(0, 40) + (movie.title.length > 40 ? '...' : '')}</h1>
								{movie.rating > 0
									? <div className='flex row' >
										<img src={imdbLogo} className='h-[22px] mr-[5px]' />
										<h1 className={styles.rating}>{movie.rating}</h1>
									</div>
									: <div className='mt-[22px]' />
								}
							</div>
						))}
					</div>

					<button className='arrowScrollBkgr left-0' onClick={() => scroll(-window.innerWidth * 0.65)}>
						<MdChevronLeft className='arrowScroll' />
					</button>
					<button className='arrowScrollBkgr right-0' onClick={() => scroll(window.innerWidth * 0.65)}>
						<MdChevronRight className='arrowScroll' />
					</button>
				</div>
			</div>
	)
}

export default Category

// {movies.map((movie) => (
// 	<img key={`${movie?.id}`} className='thumbnail' src={movie?.medium_cover_image} alt={movie?.title} />
// ))}