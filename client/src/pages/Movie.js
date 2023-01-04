import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { hideLoading } from '../redux/loadingSlice'
import css from './styles/Movie.module.css'
import imdbLogo from '../images/imdb_logo.png'
import { AiFillHeart } from 'react-icons/ai'
import RedButton from '../components/RedButton'
import { BsPlayFill } from 'react-icons/bs'
import localeEmoji from 'locale-emoji'
import { useTranslation } from 'react-i18next'
import { NavbarUserLoggedIn } from '../components/Navbar'
import { useQuery } from 'react-query'
import i18n from "i18next"
import { ImDownload3 } from 'react-icons/im'

const dateFormat = { month: "long", day: "numeric", year: "numeric" }
const Movie = () => {
	const { imdbID } = useParams()
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false)

	const fetchData = async ({ isNotFoundInTmdb = null }) => {
		return await Promise.all([
			axios.get(`https://yts.mx/api/v2/movie_details.json?imdb_id=${imdbID}&with_images=true`),
			(!isNotFoundInTmdb && axios.get(`https://api.themoviedb.org/3/movie/${imdbID}?api_key=${process.env.REACT_APP_TMDB_TOKEN}`)),
		]).then(([ytsRsp, tmdbRsp]) => { return { sourceYts: ytsRsp.data.data.movie, sourceTmdb: tmdbRsp.data } })
	}

	const { error, data: movie, status, refetch } = useQuery({
		queryKey: 'key bach ki noumer data dial lmovie fel cache',
		queryFn: async () => {
			try {
				return await fetchData({})
			} catch (error) {
				if (error.response?.status === 404)
					return await fetchData({ isNotFoundInTmdb: true })
			}
		},
		refetchOnWindowFocus: false,
		staleTime: 14400000, // 4 dsway3 to ms bhac i3tabr data dial lcache qdima
		retry: 1,
	})

	useEffect(() => {
		if (status === 'success') dispatch(hideLoading())
	}, [status])

	const getDataSource = (dataName) => {
		if (dataName === 'backdrop_path') return movie.sourceTmdb ? `https://image.tmdb.org/t/p/original${movie.sourceTmdb.backdrop_path}` : movie.sourceYts.large_screenshot_image1
		if (dataName === 'popularity') return movie.sourceTmdb ? movie.sourceTmdb.popularity.toFixed() : movie.sourceYts.like_count
	}


	if (status === 'error') console.log(error)
	else if (status === 'success') {
		console.log(movie)
		if (movie.sourceYts.id === 0)
			return (<Navigate to='/not-found' />)
		else return (
			<div className={css.container} >
				<NavbarUserLoggedIn />
				<div className={css.backdropImageContainer} >
					<img className={css.backdropImage} src={getDataSource('backdrop_path')} alt='backdropImg' />
					<div className={css.gradient} />
				</div>
				<div className={css.content} >
					<div className={css.movieIntroduction} >
						<div className={css.contentLeftSection} >
							<img src={movie.sourceYts.large_cover_image} className={css.moviePoster} alt='largeCoverImg' />
						</div>
						<div className={css.contentRightSection} >
							<h1 className={css.movieTitle}>{movie.sourceYts.title}</h1>
							<div className={css.movieStatistics} >
								<div className='flex row items-center w-max' >
									<img src={imdbLogo} className={css.imdbLogo} alt='imdbLogo' />
									<h1 className={css.movieStat} >{movie.sourceYts.rating}</h1>
									<h1 className={css.separator} >|</h1>
									<h1 className={css.movieStat} >{movie.sourceYts.year}</h1>
								</div>
								<h1 className={css.movieStatsMiddleSeparator} >|</h1>
								<div className='flex row items-center w-max' >
									<ImDownload3 className={css.statsIcon} />
									<h1 className={css.movieStat} >{movie.sourceYts.download_count} </h1>
									<h1 className={css.separator} >|</h1>
									<AiFillHeart className={css.statsIcon} />
									<h1 className={css.movieStat} >{getDataSource('popularity')}</h1>
								</div>
							</div>
							<RedButton text='watch_now' icon={<BsPlayFill />} tailwind={css.redButton} />
							<img src={movie.sourceYts.large_cover_image} className={css.moviePosterBottom} alt='largeCoverImg' />
							<div className={css.descriptionTop} >
								<h1 className={css.movieDescription} >
									{movie.sourceYts.description_intro.length > 350
										? <>
											{isFullDescriptionShown ? movie.sourceYts.description_intro : movie.sourceYts.description_intro.substring(0, 350) + '...'}
											<button onClick={() => { setIsFullDescriptionShown(!isFullDescriptionShown) }} >
												<h1 className='text-white pl-[8px]' >{isFullDescriptionShown ? t('show_less') : t('show_more')}</h1>
											</button>
										</>
										: <>{movie.sourceYts.description_intro}</>
									}
								</h1>
							</div>
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
							{movie.sourceTmdb &&
								<div className={css.movieDetail} >
									<h1 className={css.detailTitle} >{t('adult')}</h1>
									<h1 className={css.detailContent + ' scale-150'}>{movie.sourceTmdb.adult ? '✅' : '❌'}</h1>
								</div>
							} {/* -------------------------------------------------------------------------------------- */}
							<div className={css.movieDetail} >
								<h1 className={css.detailTitle} >{t('duration')}</h1>
								<h1 className={css.detailContent}>{(movie.sourceYts.runtime === 0 || !(movie.sourceYts.runtime)) ? (movie.sourceTmdb && movie.sourceTmdb.runtime !== 0 ? movie.sourceTmdb.runtime + ' min' : t('unknown')) : movie.sourceYts.runtime + ' min'}</h1>
							</div> {/* -------------------------------------------------------------------------------------- */}
							<div className={css.movieDetail} >
								<h1 className={css.detailTitle} >{t('released')}</h1>
								<h1 className={css.detailContent}>{movie.sourceTmdb ? new Date(movie.sourceTmdb.release_date).toLocaleString(i18n.language, dateFormat) : t('unknown')}</h1>
							</div> {/* -------------------------------------------------------------------------------------- */}
						</div>
					</div>
					<div className={css.descriptionBottom} >
						<h1 className={css.movieDescription} >
							{movie.sourceYts.description_intro.length > 350
								? <>
									{isFullDescriptionShown ? movie.sourceYts.description_intro : movie.sourceYts.description_intro.substring(0, 350) + '...'}
									<button onClick={() => { setIsFullDescriptionShown(!isFullDescriptionShown) }} >
										<h1 className='text-white pl-[8px]' >{isFullDescriptionShown ? t('show_less') : t('show_more')}</h1>
									</button>
								</>
								: <>{movie.sourceYts.description_intro}</>
							}
						</h1>
					</div>

					<div className={css.ytbVideoContainer} >
						<iframe
							src={`https://www.youtube.com/embed/${movie.sourceYts.yt_trailer_code}`}
							width="1280"
							height="720"
							className={css.ytbVideo}
						// frameborder="0"
						// allowfullscreen="allowfullscreen"
						/>
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

