import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import CardThemeBackground from '../components/CardThemeBackground'
import { hideLoading } from '../redux/loadingSlice'
import IMGpeakyBlinders from '../images/peaky_blinders1.jpeg'
import styles from './styles/Search.module.css'
import { BsSearch } from 'react-icons/bs'
import DropDownMenu from '../components/DropDownMenu'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { AiFillStar } from 'react-icons/ai'
import { RiAddFill } from 'react-icons/ri'
import RedButton from '../components/RedButton'
import { BsPlayFill } from 'react-icons/bs'

const genres = ['Comedy', 'Sci-fi', 'Horror', 'Romance', 'Action', 'Thriller', 'Drama', 'Mystery', 'Crime', 'Animation', 'Adventure', 'Fantasy']
const qualities = ['720p', '1080p', '2160p', '3D']
const sortBy = ['Title', 'Year', 'Rating', 'Peers', 'Seeds', 'Download count', 'Like count', 'Date added']

const Search = () => {
	const dispatch = useDispatch()
	const searchRef = useRef(null)
	const [queryParams, setQueryParams] = useState({
		page: 0
	})
	const [pageState, setPageState] = useState({
		isPageLoading: false,
		films: null,
		lastPage: null
	})

	useEffect(() => { dispatch(hideLoading()) }, []) // eslint-disable-next-line

	const showMoreFilms = (e) => {
		e.preventDefault()
		if (queryParams.page < pageState.lastPage) search()
	}

	const searchForFilms = (e) => {
		e.preventDefault()
		if (queryParams.page === 0) search()
	}

	const search = async () => {
		try {
			setQueryParams(prevState => ({ ...prevState, page: prevState.page + 1 }))
			setPageState(prevState => ({ ...prevState, isPageLoading: true }))
			const resultFilms = await axios.get(
				`https://yts.mx/api/v2/list_movies.json` +
				`?limit=40&page=${queryParams.page + 1}` +
				(searchRef.current.value ? `&${new URLSearchParams({ query_term: searchRef.current.value }).toString()}` : ``) +
				(queryParams['Genre'] ? `&genre=${queryParams['Genre']}` : ``) +
				(queryParams['Quality'] ? `&quality=${queryParams['Quality']}` : ``) +
				(queryParams['Sort by'] ? `&sort_by=${queryParams['Sort by'].toLowerCase().replace(' ', '_')}` : ``)
			)
			console.log(resultFilms.data.data)
			if (pageState.films) // lakano deja kaynin aflam, gha appendi jdad 3la l9dam 
				resultFilms.data.data.movies = [].concat(pageState.films.data.data.movies, resultFilms.data.data.movies)
			setPageState(prevState => ({ ...prevState, films: resultFilms, lastPage: (resultFilms.data.data.movie_count / 40).toFixed() }))
		} catch (error) {
			console.log(error)
		} finally {
			setPageState(prevState => ({ ...prevState, isPageLoading: false }))
		}
	}

	return (
		<CardThemeBackground imgLink={IMGpeakyBlinders} >
			<div className={styles.container} >
				<form className='row flex' >
					<input ref={searchRef} className={styles.searchField} placeholder='Search' />
					<button onClick={searchForFilms} className={styles.searchButton} >
						<BsSearch />
					</button>
				</form>
				<div className='mt-[20px]' />
				<div className='flex row z-1000'>
					<DropDownMenu childs={genres} keyName='Genre' controller={{ queryParams, setQueryParams }} className='ml-[10px]' />
					<DropDownMenu childs={qualities} keyName='Quality' controller={{ queryParams, setQueryParams }} className='ml-[10px]' />
					<DropDownMenu childs={sortBy} keyName='Sort by' controller={{ queryParams, setQueryParams }} className='ml-[10px]' />
					{/* <DropDownMenu childs={limit} keyName='Film per page' controller={{queryParams, setQueryParams}} className='ml-[10px]' /> */}
				</div>

				{pageState.films ?
					<div className={styles.movies}>
						{pageState.films.data.data.movies.map((movie, index) => (
							<div className={styles.movie} key={index}>
								<div className={styles.thumbnail} >
									<img className={styles.movieImage} src={movie.medium_cover_image} alt={movie.title} />
									<div className={styles.movieDetails}>
										<h1 className={styles.movieYear} >{movie.year}</h1>
										{movie.genres.map(genre => (
											<h1 className={styles.movieGenre} key={genre}>{genre}</h1>
										))}
										<div className='mt-[10px]' />
										<button className={styles.playNow} >
											<h1>Play now</h1>
											<BsPlayFill className='mt-[3px] text-2xl' />
										</button>
									</div>
								</div>
								<h1 className={styles.movieTitle} key={`${movie.title}`}>{movie.title.substring(0, 40) + (movie.title.length > 40 ? '...' : '')}</h1>
								<div className='flex row' >
									<AiFillStar className={styles.starIcon} />
									<h1 className={styles.rating}>{movie.rating}/10</h1>
								</div>
							</div>
						))}
					</div> : <div />
				}

				{pageState.isPageLoading === true ?
					<div className='w-full h-full flex items-center justify-center my-[30px]'><ReactLoading type='spin' /></div> : <div />
				}

				{pageState.films && (queryParams.page < pageState.lastPage) &&
					<div className='w-[400px]' >
						<RedButton onClick={showMoreFilms} text={'Show more'} icon={<RiAddFill />} />
					</div>
				}

			</div>
		</CardThemeBackground>
	)
}

export default Search







// const limit = ['10', '20', '30', '40', '50']
// BA9I= minRating/10
// DONE= genre - quality - sortBy - pageNumber
// BLACH= limit - orderBy



// {/* <div className='items-start justify-start w-full h-full p-[100px] flex flex-row'>
// 	{mydata.map((movie) => (
// 		<div className={styles.movie} key={movie.id}>
// 			<img className={styles.thumbnail} src={movie.medium_cover_image} alt={movie.title} />
// 			<h1 className={styles.movieTitle} key={`${movie.title}`}>{movie.title.substring(0, 40) + (movie.title.length > 40 ? '...' : '')}</h1>
// 			<div className='flex row' >
// 				<AiFillStar className={styles.starIcon} />
// 				<h1 className={styles.rating}>{movie.rating}/10</h1>
// 			</div>
// 		</div>
// 	))}
// </div> */}



// const urlSeparator = (param) => {
// 	if (queryParams['Genre'] && param === 'Genre') {
// 		return '?'
// 	} if (!queryParams['Genre'] && queryParams['Quality'] && param === 'Quality') {
// 		return '?'
// 	} if (!queryParams['Genre'] && !queryParams['Quality'] && queryParams['Sort by'] && param === 'Sort by') {
// 		return '?'
// 	}
// 	return '&' // (queryParams['Genre'] ? `${urlSeparator('Genre')}genre=${queryParams['Genre']}` : ``) +
// }