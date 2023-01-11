import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import CardThemeBackground from '../components/CardThemeBackground'
import { hideLoading } from '../redux/loadingSlice'
import IMGpeakyBlinders from '../images/peaky_blinders1.jpeg'
import styles from './styles/SearchMovies.module.scss'
import { BsSearch } from 'react-icons/bs'
import DropDownMenu from '../components/DropDownMenu'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { RiAddFill } from 'react-icons/ri'
import RedButton from '../components/RedButton'
import { BsPlayFill } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import emptyMovieImage from '../images/empty_movie_image.jpeg'
import imdbLogo from '../images/imdb_logo.png'
import { useMutation } from 'react-query'
import { useParams, useSearchParams } from 'react-router-dom'

const genres = ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"]
const qualities = ['720p', '1080p', '2160p', '3D']
const sortBy = ['Title', 'Year', 'Rating', 'Peers', 'Seeds', 'Download count', 'Like count', 'Date added']
const filmPerPage = 50

const SearchMovies = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	var searchKey = searchParams.get('search-key')
	const dispatch = useDispatch()
	const searchRef = useRef(null)
	const { t } = useTranslation()
	const [queryParams, setQueryParams] = useState({})

	const showMoreFilms = async (e) => {
		e.preventDefault()
		if (pageState?.pageNumber < pageState.lastPage)
			await mutateAsync({ doAppendResult: true })
	}

	const searchForFilms = async (e) => {
		e.preventDefault()
		await mutateAsync({ doAppendResult: false })
	}

	const { data: pageState, error, status, mutateAsync } = useMutation({
		mutationFn: async (param) => {
			let pageNumber = pageState?.pageNumber ? pageState.pageNumber +1 : 1
			!param.doAppendResult && (pageNumber = 1)
			console.log('searchParams=', searchParams.get('search-key'))
			const resultFilms = await axios.get(
				`https://yts.mx/api/v2/list_movies.json?limit=${filmPerPage}&page=${pageNumber}` +
				(searchRef?.current?.value ? `&${new URLSearchParams({ query_term: searchRef.current.value }).toString()}` : (searchKey ? `&${new URLSearchParams({ query_term: searchKey }).toString()}` : ``)) +
				(queryParams['Genre'] ? `&genre=${queryParams['Genre']}` : ``) +
				(queryParams['Quality'] ? `&quality=${queryParams['Quality']}` : ``) +
				(queryParams['Sort by'] ? `&sort_by=${queryParams['Sort by'].toLowerCase().replace(' ', '_')}` : ``)
			)
			param.doAppendResult === true && (resultFilms.data.data.movies = [].concat(pageState.films.data.data.movies, resultFilms.data.data.movies))
			return { ...pageState, pageNumber, films: resultFilms, lastPage: (resultFilms.data.data.movie_count / filmPerPage).toFixed() }
		}
	})

	// eslint-disable-next-line
	useEffect(() => {
		const initPage = async () => {
			await mutateAsync({ doAppendResult: false })
			setTimeout(() => dispatch(hideLoading()), 0)
		}
		initPage()
	}, [])

	if (error) console.log(error)
	return (
		<CardThemeBackground imgLink={IMGpeakyBlinders} >
			<div className={styles.container} >
				<form className={styles.searchContainer} onSubmit={searchForFilms} >
					<input ref={searchRef} className={styles.searchField} placeholder={t('search')} />
					<button className={styles.searchButton} >
						<BsSearch />
					</button>
				</form>
				<div className='mt-[5px]' />
				<div className={styles.dropDownButtonsContainer}>
					<DropDownMenu childs={genres} keyName='Genre' controller={{ queryParams, setQueryParams }} className='ml-[10px] my-[5px]' />
					<DropDownMenu childs={qualities} keyName='Quality' controller={{ queryParams, setQueryParams }} className='ml-[10px] my-[5px]' />
					<DropDownMenu childs={sortBy} keyName='Sort by' controller={{ queryParams, setQueryParams }} className='ml-[10px] my-[5px]' />
					{/* <DropDownMenu childs={limit} keyName='Film per page' controller={{queryParams, setQueryParams}} className='ml-[10px]' /> */}
				</div>
				{(status === 'success' || status === 'loading') &&
					<div className={styles.movies}>
						{pageState?.films?.data.data.movies?.map((movie, index) => (
							<div className={styles.movie} key={index}>
								<div className={styles.thumbnail} >
									<img className={styles.movieImage} src={movie.medium_cover_image} onError={(err) => { err.target.src = emptyMovieImage }} alt={movie.title} />
									<a href={`${process.env.REACT_APP_CLIENT_HOSTNAME}/movie/${movie.imdb_code}`} className={styles.movieDetails}>
										<h1 className={styles.movieYear} >{movie.year}</h1>
										{movie.genres.map(genre => (
											<h1 className={styles.movieGenre} key={genre}>{genre}</h1>
										))}
										<div className='mt-[10px]' />
										<div className={styles.playNow} >
											<h1>{t('play')}</h1>
											<BsPlayFill className='mt-[3px] text-2xl'/>
										</div>
									</a>
								</div>
								<h1 className={styles.movieTitle} key={`${movie.title}`}>{movie.title.substring(0, 40) + (movie.title.length > 40 ? '...' : '')}</h1>
								{movie.rating > 0
									? <div className='flex row' >
										<img src={imdbLogo} className='h-[22px] mr-[5px]' alt='imdbLogo' />
										<h1 className={styles.rating}>{movie.rating}</h1>
									</div>
									: <div className='mt-[22px]' />
								}
							</div>
						))}
						{pageState?.films?.data.data.movie_count === 0 && 
							<div className='h-full w-full'>
								<h1 className={styles.oops} >Oops!</h1>
								<h1 className={styles.noResultsFound} >No results found...</h1>
							</div>
						}
					</div>
				}
				{status === 'loading' ?
					<div className='w-full h-full flex items-center justify-center my-[30px]'><ReactLoading type='spin' /></div> : <div />
				}
				{status === 'success' && ( pageState && pageState.pageNumber < pageState.lastPage) &&
					<div className={styles.showMoreFilms} >
						<RedButton onClick={showMoreFilms} text='show_more' icon={<RiAddFill />} tailwind='w-11/12' />
					</div>
				}
			</div>
		</CardThemeBackground>
	)
}

export default SearchMovies
