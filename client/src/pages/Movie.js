import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { hideLoading } from '../redux/loadingSlice'
import css from './styles/Movie.module.css'
import imdbLogo from '../images/imdb_logo.png'
import { AiFillHeart } from 'react-icons/ai'
import RedButton from '../components/RedButton'
import { BsPlayFill } from 'react-icons/bs'
import localeEmoji from 'locale-emoji';
import { useTranslation } from 'react-i18next'
import i18n from "i18next";
import { NavbarUserLoggedIn } from '../components/Navbar'
import { useQuery } from 'react-query'

const dateFormat = { month: "long", day: "numeric", year: "numeric" }
const Movie = () => {
	const { imdbID } = useParams()
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const { error, data: movie, status, refetch } = useQuery({
		queryKey: 'key bach ki noumer data dial lmovie fel cache',
		queryFn: async (par) => {
			console.log('par=', par)
			const movieDeata = await Promise.all([
				axios.get(`https://yts.mx/api/v2/movie_details.json?imdb_id=${imdbID}`),
				axios.get(`https://api.themoviedb.org/3/movie/${imdbID}?api_key=${process.env.REACT_APP_TMDB_TOKEN}`),
			]).then(([ytsRsp, tmdbRsp]) => {
				return { sourceYts: ytsRsp.data.data.movie, sourceTmdb: tmdbRsp.data }
			})
			return movieDeata
		},

		onError: (error) => {
			// refetch('123')
		},
		refetchOnWindowFocus: false,
		staleTime: 14400000, // 4 dsway3 to ms bhac i3tabr data dial lcache qdima
	})

	useEffect(() => {
		if (status === 'success') dispatch(hideLoading())
	}, [status])

	if (error) 
		console.log(error)
	else if (status === 'success') {
		return (
			<div className={css.container} >
				<NavbarUserLoggedIn />
				<div className={css.backdropImageContainer} >
					<img className={css.backdropImage} src={`https://image.tmdb.org/t/p/original${movie.sourceTmdb.backdrop_path}`} alt='backdropImg' />
					<div className={css.gradient} />
				</div>
				<div className={css.content} >
					<div className={css.contentLeftSection} >
						<img src={movie.sourceYts.large_cover_image} className={css.moviePoster} alt='largeCoverImg' />
					</div>
					<div className={css.contentRightSection} >
						<h1 className={css.movieTitle}>{movie.sourceYts.title}</h1>
						<div className='flex row w-full items-center' >
							<img src={imdbLogo} className='w-[60px] mr-[10px]' alt='imdbLogo' />
							<h1 className='text-[25px] text-gray-400' >{movie.sourceYts.rating}</h1>
							<h1 className='mx-[20px] text-white text-[25px]' >|</h1>
							<h1 className='text-[25px] text-gray-400' >{movie.sourceYts.year}</h1>
							<h1 className='mx-[20px] text-white text-[25px]' >|</h1>
							<AiFillHeart className='text-[25px] text-gray-400 mr-[10px]' />
							<h1 className='text-[25px] text-gray-400' >{movie.sourceTmdb.popularity.toFixed()}</h1>
							<h1 className='mx-[20px] text-white text-[25px]' >|</h1>
							<h1 className='text-[25px] text-gray-400' >{movie.sourceYts.download_count + ' ' + t('downloads')} </h1>
						</div>
						<RedButton text='watch_now' icon={<BsPlayFill />} tailwind='my-[15px] w-[350px]' />
						<p className={css.movieDescription} >
							{movie.sourceYts.description_intro}
						</p>
						<div className={css.movieDetail} >
							<h1 className={css.detailTitle} >{t('genres')}</h1>
							<div className={css.movieGenresContainer} >
								{movie.sourceYts.genres.map(genre => (
									<div className={css.movieGenre} key={genre}>
										{genre}
									</div>
								))}
							</div>
						</div> {/* -------------------------------------------------------------------------------------- */}
						<div className={css.movieDetail} >
							<h1 className={css.detailTitle} >{t('language')}</h1>
							<h1 className={css.flag} >{localeEmoji('en')}</h1>
						</div> {/* -------------------------------------------------------------------------------------- */}
						<div className={css.movieDetail} >
							<h1 className={css.detailTitle} >{t('adult')}</h1>
							<h1 className='text-[20px] scale-150'>{movie.sourceTmdb.adult ? '✅' : '❌'}</h1>
						</div> {/* -------------------------------------------------------------------------------------- */}
						<div className={css.movieDetail} >
							<h1 className={css.detailTitle} >{t('duration')}</h1>
							<h1 className='text-[25px] text-white'>{(movie.sourceYts.runtime === 0 || !(movie.sourceYts.runtime)) ? movie.sourceTmdb.runtime : movie.sourceYts.runtime} min</h1>
						</div> {/* -------------------------------------------------------------------------------------- */}
						<div className={css.movieDetail} >
							<h1 className={css.detailTitle} >{t('released')}</h1>
							<h1 className='text-[25px] text-white'>{new Date(movie.sourceTmdb.release_date).toLocaleString(i18n.language, dateFormat)}</h1>
						</div> {/* -------------------------------------------------------------------------------------- */}
					</div>
				</div>
			</div>
		)
	} else {
		return (<div />)
	}
}

export default Movie


// useEffect(() => {
// 	const fetchData = async () => {
// 		try {
// 			await Promise.all([
// 				axios.get(`https://yts.mx/api/v2/movie_details.json?imdb_id=${imdbID}`).then(resp => {
// 					setMovie(prevState => ({ ...prevState, sourceYts: resp.data.data.movie }))
// 				}),
// 				axios.get(`https://api.themoviedb.org/3/movie/${imdbID}?api_key=${process.env.REACT_APP_TMDB_TOKEN}`).then(resp => {
// 					setMovie(prevState => ({ ...prevState, sourceTmdb: resp.data }))
// 				})
// 			])
// 			setMovie(prevState => ({ ...prevState, isDataLoaded: true }))
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			dispatch(hideLoading())
// 		}
// 	}
// 	fetchData()
// }, [])

