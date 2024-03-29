import React, { useEffect, useRef, useState } from 'react'
import styles from './styles/Home.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading } from '../redux/loadingSlice'
import axios from 'axios'
import Category from '../components/Category'
import { useTranslation } from 'react-i18next'
import { BsPlayFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player'
import IMGhypertube from '../images/hypertube_logo.png'
import { BiPlay } from 'react-icons/bi'
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'
import { US, DE, DK, ES, IT, NO, SE } from 'country-flag-icons/react/3x2'
import i18n from 'i18next'
import { BsSearch } from 'react-icons/bs'
import { IoCloseSharp } from 'react-icons/io5'
import GlitchClip from 'react-glitch-effect/core/GlitchClip';
import GlitchText from 'react-glitch-effect/core/GlitchText';
import VideoTimer from '../components/VideoTimer'
import IMGarrowVhs from '../images/arrow_vhs.png'
import IMGmoviesWall from '../images/curved_movies_wall.png'
import FilmPreview from '../components/FilmPreview'

const ytbVariables = {
	playerVars: {
		// modestbranding: 1, // hide ytb logo// autoplay: 1,
		playing: 1, controls: 0, rel: 0, showinfo: 0, mute: 1, loop: 1
	}
}
const requests = {
	requestPopular: `https://yts.mx/api/v2/list_movies.json?sort_by=like_count&minimum_rating=6`,
	requestLatest: `https://yts.mx/api/v2/list_movies.json?sort_by=date_added&minimum_rating=6`,
	requestTopRated: `https://yts.mx/api/v2/list_movies.json?sort_by=rating`,
	// requestNowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=4a3da46412d3067a8577584a5b63fdeb`,
	// requestUpcoming:  `https://api.themoviedb.org/3/movie/upcoming?api_key=4a3da46412d3067a8577584a5b63fdeb`
}
const languages = [
	{ code: 'en', component: <US className={styles.flag} /> },
	{ code: 'de', component: <DE className={styles.flag} /> },
	{ code: 'dk', component: <DK className={styles.flag} /> },
	{ code: 'es', component: <ES className={styles.flag} /> },
	{ code: 'it', component: <IT className={styles.flag} /> },
	{ code: 'no', component: <NO className={styles.flag} /> },
	{ code: 'se', component: <SE className={styles.flag} /> },
]
let scrollTimeout = undefined
let noiseTimeout
let headervisibilityTimeout
let currentIndexVariable = 1
let pauseScrollWhileAnimation = 0

const Home = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [movies, setMovies] = useState({})
	const [menuState, setMenuState] = useState(false)
	let headerMovie
	let card3dMovie
	let randomIndex
	const [fullScreenState, setFullScreenState] = useState(false)
	const exitMenuRef = useRef([])
	const searchRef = useRef([])
	const [currentPageIndex, setCurrentPageIndex] = useState(1)
	const [noiseVisibility, setNoiseVisibility] = useState(false)

	// ----------------------------------- SET FULL SCREEN MODE -----------------------------------
	const fullScreenMode = (modeState) => {
		if (modeState === true) {
			document.body.requestFullscreen()
			setFullScreenState(true)
		} else {
			document.exitFullscreen();
			setFullScreenState(false)
		}
	}
	// ----------------------------------- GET MOVIES DATA -----------------------------------
	useEffect(() => {
		const getData = async () => {
			try {
				await Promise.all([
					axios.get(requests.requestPopular).then(async rsp => {
						randomIndex = Math.floor(Math.random() * rsp.data.data.movies.length)
						headerMovie = rsp.data.data.movies[randomIndex]
						card3dMovie = rsp.data.data.movies[(randomIndex === 0 ? 1 : randomIndex - 1)]
						await Promise.all([
							axios.get(`https://api.themoviedb.org/3/movie/${headerMovie.imdb_code}?api_key=${process.env.REACT_APP_TMDB_TOKEN}`).then(resp => {
								headerMovie.backdropImage = `https://image.tmdb.org/t/p/original/${resp.data.backdrop_path}`
								setMovies(prevState => ({ ...prevState, popular: rsp.data.data.movies, headerMovie }))
							}),
							axios.get(`https://yts.mx/api/v2/movie_details.json?imdb_id=${card3dMovie.imdb_code}&with_images=true`).then(async (respo) => {
								setMovies(prvState => ({ ...prvState, card3dMovie: { sourceYts: respo.data.data.movie } }))
								await axios.get(`https://api.themoviedb.org/3/movie/${card3dMovie.imdb_code}?api_key=${process.env.REACT_APP_TMDB_TOKEN}`).then(r => {
									setMovies(prevState => ({ ...prevState, card3dMovie: { sourceYts: prevState.card3dMovie.sourceYts, sourceTmdb: r.data } }))
								}).catch(error => error)
							})
						])
					}),
					axios.get(requests.requestLatest).then(rsp => { setMovies(prevState => ({ ...prevState, latest: rsp.data.data.movies })) }),
					axios.get(requests.requestTopRated).then(rsp => { setMovies(prevState => ({ ...prevState, topRated: rsp.data.data.movies })) }),
				])
				setTimeout(() => { setTimeout(() => dispatch(hideLoading()), 0) }, 7000)
			} catch (error) {
				console.log(error)
			} finally {
				setMovies(prevState => ({ ...prevState, isDataLoaded: true }))
			}
		}
		getData()
	}, []) // eslint-disable-line
	// ----------------------------------- EXIT MENU USEEFFECT -----------------------------------
	useEffect(() => {
		var clickInside
		const handleClick = (e) => {
			clickInside = false
			if (exitMenuRef.current) {
				exitMenuRef.current.forEach((elem, idx) => {
					if (elem?.contains(e.target)) clickInside = true
				})
				if (!clickInside) setMenuState(false)
			}
		}
		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	})
	// ------------------------------- HANDLE SHOW/HEADER SCROLL -------------------------------
	useEffect(() => {
		const displayNoiseAnimation = () => {
			setNoiseVisibility(true)
			noiseTimeout = setTimeout(() => { setNoiseVisibility(false) }, (1000))
			return () => { clearTimeout(noiseTimeout) }
		}
		const onScroll = (e) => {
			if (scrollTimeout)
				clearTimeout(scrollTimeout)
			scrollTimeout = setTimeout(async () => {
				if (e.deltaY > 100 && currentIndexVariable < 2 && !pauseScrollWhileAnimation) {  // scrolla lte7t
					pauseScrollWhileAnimation = 1
					displayNoiseAnimation()
					currentIndexVariable += 1
					headervisibilityTimeout = setTimeout(() => {
						setCurrentPageIndex(currentIndexVariable)
						pauseScrollWhileAnimation = 0
						console.log(currentIndexVariable)
					}, 650)
					return () => { clearTimeout(headervisibilityTimeout) }
				}
				else if (e.deltaY < -100 && currentIndexVariable > 0 && !pauseScrollWhileAnimation) {  // scrolla lfo9
					pauseScrollWhileAnimation = 1
					displayNoiseAnimation()
					currentIndexVariable -= 1
					headervisibilityTimeout = setTimeout(() => {
						setCurrentPageIndex(currentIndexVariable)
						pauseScrollWhileAnimation = 0
						console.log(currentIndexVariable)
					}, 650)
					return () => { clearTimeout(headervisibilityTimeout) }
				}
			}, 0)
			// }, 70)
		}
		window.addEventListener('wheel', onScroll);
		return () => window.removeEventListener("wheel", onScroll);
	}, [])

	return (
		movies.isDataLoaded === true &&
		<div className={styles.container}>
			{/* ------------------- FILM 3D CARD --------------------- */}
			<div className={currentPageIndex === 1 ? styles.moviePreviewContainer : 'hidden'} >
				<img src={IMGmoviesWall} className={styles.moviesWall} />
				<FilmPreview movie={movies.card3dMovie} />
				<div className='flex absolute bottom-[20px]' >
					<div className={styles.bottomArrowContainer} >
						<GlitchClip duration={1500} className='flex justify-center items-center' >
							<GlitchText component='h1' className={styles.vhsFont}>SCROLL</GlitchText>
							<img src={IMGarrowVhs} className='h-[70px] pl-[25px]' />
						</GlitchClip>
					</div>
				</div>
			</div>
			{/* ------------------------ CATEGORIES ------------------------ */}
			<div className={`${currentPageIndex === 2 ? 'w-full' : 'hidden'}`} >
				<div className='mt-[150px]' />
				<Category title='popular' movies={movies.popular} />
				<Category title='top_rated' movies={movies.latest} reverse={true} />
				<Category title='latest' movies={movies.topRated} />
				<div className='mt-[50px]' />
			</div>
			{/* ------------------------ HEADER ------------------------ */}
			<div className={`${styles.header} ${currentPageIndex === 0 ? '' : 'invisible'}`} >
				<ReactPlayer
					url={`https://www.youtube.com/embed/${movies.headerMovie.yt_trailer_code}`}
					playing={true}
					muted={true}
					loop={true}
					config={{ youtube: ytbVariables }}
					className={styles.video}
					onStart={() => { setTimeout(() => dispatch(hideLoading()), 0) }}
				/>
				<div className={styles.headerBlackLayer} />
				<div className={styles.headerContent} >
					{/* ----------------------search bar----------------------- */}
					{/* <div className='flex h-full absolute items-start top-[-9vh]' >
						<form onSubmit={() => { navigate(`/search-movies?search-key=${searchRef.current[6].value}`)}} className='flex items-center justify-end'>
							<input ref={elem => searchRef.current[6] = elem} className={styles.searchInput} placeholder='Search for a movie...' />
							<BsSearch type='submit' className={styles.searchIcon} />
						</form>
					</div> */}
					<GlitchClip className={`${styles.glitchClip} ${styles.scaleMovieTitleOnHover} `} duration={2000} >
						<GlitchText component='h1' className={styles.movieTitle}>
							{movies.headerMovie.title.toUpperCase()}
						</GlitchText>
					</GlitchClip>
					<div className='mt-[40px]' />
					<h1 className={styles.rating}>{t('imdb_rating')}: {movies.headerMovie.rating}/10</h1>
					<p className={styles.summary}>{movies.headerMovie?.summary}</p>
					<div className='mt-[15px]' />
					<a href={`${process.env.REACT_APP_CLIENT_HOSTNAME}/movie/${movies.headerMovie.imdb_code}`}>
						<div className={`flex row items-center text-[105px] ${styles.playNow} ${styles.scaleOnHover} `} >
							<h1>{'PLAY NOW'}</h1>
							<BiPlay className='scale-125' />
						</div>
					</a>
				</div>
				<div className={styles.bottomTimeCounterContainer}>
					<VideoTimer />
					<div className={styles.bottomArrowContainer} >
						<GlitchClip duration={1500} className='flex justify-center items-center' >
							<GlitchText component='h1' className={styles.vhsFont}>SCROLL</GlitchText>
							<img src={IMGarrowVhs} className='h-[70px] pl-[25px]' />
						</GlitchClip>
					</div>
					<GlitchText component='h1' className={styles.vhsFont}>
						PLAY_VHS_MODE
					</GlitchText>
				</div>
				<div className={styles.whiteFrame} />
			</div>
			{/* ------------------------ NAVBAR ------------------------ */}
			<div className={styles.customNavbarContainer} >{fullScreenState ? <BsFullscreenExit className={styles.customNavbarButton} /> : <BsFullscreen className={styles.customNavbarButton} />}
				{/* <div className={styles.customNavbarContainer} >{fullScreenState ? <BsFullscreenExit onClick={() => { fullScreenMode(false) }} className={styles.customNavbarButton} /> : <BsFullscreen onClick={() => { fullScreenMode(true) }} className={styles.customNavbarButton} />} */}
				<div className={styles.customNavbarMiddleButtons} >
					<a href={`${process.env.REACT_APP_CLIENT_HOSTNAME}/search-movies`}>
						<h1>Movies</h1>
					</a>
					<img className={styles.hypertubeLogo} src={IMGhypertube} alt='hytbLogo' />
					<h1>Log out</h1>
				</div>
				{menuState ? <IoCloseSharp onClick={() => { setMenuState(false) }} className={styles.customNavbarButton} /> : <AiOutlineMenu onClick={() => { setMenuState(true) }} className={styles.customNavbarButton} />}
			</div>
			{/* ------------------------ NOISE ------------------------ */}
			<div className='absolute' >
				<div className={noiseVisibility ? styles.showAnimationBlackFilter : styles.hideAnimationBlackFilter} />
				<section className={`${styles.noise} ${noiseVisibility ? styles.showTopNoise : styles.hideTopNoise}`} ></section>
				<section className={`${styles.noise} ${noiseVisibility ? styles.showBtmNoise : styles.hideBtmNoise}`} ></section>
				<svg>
					<filter id="noise">
						<feTurbulence id="turbulence">
							<animate
								attributeName="baseFrequency"
								dur="50s"
								values="0.9 0.9;0.8 0.8; 0.9 0.9"
								repeatCount="indefinite"
							></animate>
						</feTurbulence>
						<feDisplacementMap in="SourceGraphic" scale="60"></feDisplacementMap>
					</filter>
				</svg>
			</div>
			{/* ------------------------ MENU ------------------------ */}
			{menuState &&
				<div className={styles.menu} >
					<h1 ref={elem => exitMenuRef.current[0] = elem} className={styles.menuTitle}>LANGUAGES</h1>
					<div ref={elem => exitMenuRef.current[1] = elem} className={styles.flagsContainer} >
						{languages.map((flag, i) => (
							<div className={i18n.language === flag.code ? styles.selectedLang : ''} onClick={() => i18n.changeLanguage(flag.code)} key={i} >
								{flag.component}
							</div>
						))}
					</div>
					<div className='mt-[60px]' />
					<h1 ref={elem => exitMenuRef.current[2] = elem} className={styles.menuTitle}>{t('movies_search').toUpperCase()}</h1>



					<form ref={elem => exitMenuRef.current[3] = elem} onSubmit={() => { navigate(`/search-movies?search-key=${searchRef.current[0].value}`) }} className='flex items-center justify-end'>
						<input ref={elem => searchRef.current[0] = elem} className={styles.searchInput} placeholder='Search for a movie...' />
						<BsSearch type='submit' className={styles.searchIcon} />
					</form>

					<div className='mt-[60px]' />
					<h1 ref={elem => exitMenuRef.current[4] = elem} className={styles.menuTitle}>{t('search_for_users').toUpperCase()}</h1>

					<form onSubmit={() => { navigate(`/search-users?search-key=${searchRef.current[1].value}`) }} ref={elem => exitMenuRef.current[5] = elem} className='flex items-center justify-end'>
						<input ref={elem => searchRef.current[1] = elem} className={styles.searchInput} placeholder='Search for a user...' />
						<BsSearch type='submit' className={styles.searchIcon} />
					</form>



					<div className='mt-[60px]' />
					<h1 ref={elem => exitMenuRef.current[4] = elem} className={`cursor-pointer ${styles.menuTitle}`}>{t('My profile').toUpperCase()}</h1>
					<div className='mt-[60px]' />
					<h1 ref={elem => exitMenuRef.current[4] = elem} className={`cursor-pointer ${styles.menuTitle}`}>{t('log_out').toUpperCase()}</h1>
				</div>
			}
		</div>
	)
}

export default Home

// vhs effect
/*change header to true */