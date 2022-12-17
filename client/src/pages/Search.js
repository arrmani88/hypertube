import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CardThemeBackground from '../components/CardThemeBackground'
import { hideLoading } from '../redux/loadingSlice'
import IMGpeakyBlinders from '../images/peaky_blinders.jpg'
import styles from './styles/Search.module.css'
import { BsSearch } from 'react-icons/bs'
import DropDownMenu from '../components/DropDownMenu'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { AiFillStar } from 'react-icons/ai'

const genres = ['Comedy', 'Sci-fi', 'Horror', 'Romance', 'Action', 'Thriller', 'Drama', 'Mystery', 'Crime', 'Animation', 'Adventure', 'Fantasy']
const qualities = ['720p', '1080p', '2160p', '3D']
const sortBy = ['Title', 'Year', 'Rating', 'Peers', 'Seeds', 'Download count', 'Like count', 'Date added']

const mydata = [{ "id": 47571, "url": "https://yts.mx/movies/20-years-of-christmas-with-the-tabernacle-choir-2021", "imdb_code": "tt16440930", "title": "20 Years of Christmas with the Tabernacle Choir", "title_english": "20 Years of Christmas with the Tabernacle Choir", "title_long": "20 Years of Christmas with the Tabernacle Choir (2021)", "slug": "20-years-of-christmas-with-the-tabernacle-choir-2021", "year": 2021, "rating": 9, "runtime": 0, "genres": ["Action"], "summary": "", "description_full": "", "synopsis": "", "yt_trailer_code": "", "language": "en", "mpa_rating": "", "background_image": "https://yts.mx/assets/images/movies/20_years_of_christmas_with_the_tabernacle_choir_2021/background.jpg", "background_image_original": "https://yts.mx/assets/images/movies/20_years_of_christmas_with_the_tabernacle_choir_2021/background.jpg", "small_cover_image": "https://yts.mx/assets/images/movies/20_years_of_christmas_with_the_tabernacle_choir_2021/small-cover.jpg", "medium_cover_image": "https://yts.mx/assets/images/movies/20_years_of_christmas_with_the_tabernacle_choir_2021/medium-cover.jpg", "large_cover_image": "https://yts.mx/assets/images/movies/20_years_of_christmas_with_the_tabernacle_choir_2021/large-cover.jpg", "state": "ok", "torrents": [{ "url": "https://yts.mx/torrent/download/55670FE0F851CC1C0F686A9B1A9A9B1FF764821E", "hash": "55670FE0F851CC1C0F686A9B1A9A9B1FF764821E", "quality": "720p", "type": "web", "seeds": 80, "peers": 21, "size": "521.76 MB", "size_bytes": 547105014, "date_uploaded": "2022-12-15 23:17:37", "date_uploaded_unix": 1671142657 }, { "url": "https://yts.mx/torrent/download/0704EBFA979D84E5DE95D9375835E66BB8AE987B", "hash": "0704EBFA979D84E5DE95D9375835E66BB8AE987B", "quality": "1080p", "type": "web", "seeds": 128, "peers": 48, "size": "966.02 MB", "size_bytes": 1012945388, "date_uploaded": "2022-12-16 00:00:09", "date_uploaded_unix": 1671145209 }], "date_uploaded": "2022-12-15 23:17:37", "date_uploaded_unix": 1671142657 }, { "id": 47540, "url": "https://yts.mx/movies/strive-strive-strive-2021", "imdb_code": "tt14687192", "title": "Strive, Strive, Strive", "title_english": "Strive, Strive, Strive", "title_long": "Strive, Strive, Strive (2021)", "slug": "strive-strive-strive-2021", "year": 2021, "rating": 9.1, "runtime": 110, "genres": ["Documentary", "Sport"], "summary": "Documentary film about the Brazilian football club Atletico Mineiro, but also about something intangible: football, its emotion and imperishable spirit.", "description_full": "Documentary film about the Brazilian football club Atletico Mineiro, but also about something intangible: football, its emotion and imperishable spirit.", "synopsis": "Documentary film about the Brazilian football club Atletico Mineiro, but also about something intangible: football, its emotion and imperishable spirit.", "yt_trailer_code": "Hkw-OFNo3SU", "language": "pt", "mpa_rating": "", "background_image": "https://yts.mx/assets/images/movies/strive_strive_strive_2021/background.jpg", "background_image_original": "https://yts.mx/assets/images/movies/strive_strive_strive_2021/background.jpg", "small_cover_image": "https://yts.mx/assets/images/movies/strive_strive_strive_2021/small-cover.jpg", "medium_cover_image": "https://yts.mx/assets/images/movies/strive_strive_strive_2021/medium-cover.jpg", "large_cover_image": "https://yts.mx/assets/images/movies/strive_strive_strive_2021/large-cover.jpg", "state": "ok", "torrents": [{ "url": "https://yts.mx/torrent/download/4E62D7BD628B6ADB3D86BA77251157BBBB50E027", "hash": "4E62D7BD628B6ADB3D86BA77251157BBBB50E027", "quality": "720p", "type": "web", "seeds": 13, "peers": 5, "size": "1018.39 MB", "size_bytes": 1067859313, "date_uploaded": "2022-12-14 21:37:50", "date_uploaded_unix": 1671050270 }, { "url": "https://yts.mx/torrent/download/F9E56B4F7A72494F53A8EB0A1BAC3835BA3F0903", "hash": "F9E56B4F7A72494F53A8EB0A1BAC3835BA3F0903", "quality": "1080p", "type": "web", "seeds": 14, "peers": 9, "size": "1.84 GB", "size_bytes": 1975684956, "date_uploaded": "2022-12-14 22:52:49", "date_uploaded_unix": 1671054769 }], "date_uploaded": "2022-12-14 21:37:50", "date_uploaded_unix": 1671050270 }, { "id": 44943, "url": "https://yts.mx/movies/taylor-hawkins-tribute-concert-2022", "imdb_code": "tt21984858", "title": "Taylor Hawkins Tribute Concert", "title_english": "Taylor Hawkins Tribute Concert", "title_long": "Taylor Hawkins Tribute Concert (2022)", "slug": "taylor-hawkins-tribute-concert-2022", "year": 2022, "rating": 9, "runtime": 0, "genres": ["Action", "Music"], "summary": "", "description_full": "", "synopsis": "", "yt_trailer_code": "P2KnD7sfpoA", "language": "en", "mpa_rating": "", "background_image": "https://yts.mx/assets/images/movies/taylor_hawkins_tribute_concert_2022/background.jpg", "background_image_original": "https://yts.mx/assets/images/movies/taylor_hawkins_tribute_concert_2022/background.jpg", "small_cover_image": "https://yts.mx/assets/images/movies/taylor_hawkins_tribute_concert_2022/small-cover.jpg", "medium_cover_image": "https://yts.mx/assets/images/movies/taylor_hawkins_tribute_concert_2022/medium-cover.jpg", "large_cover_image": "https://yts.mx/assets/images/movies/taylor_hawkins_tribute_concert_2022/large-cover.jpg", "state": "ok", "torrents": [{ "url": "https://yts.mx/torrent/download/A8B0DDC0DAA2B6367FDB6317AEA8C7C6952653E5", "hash": "A8B0DDC0DAA2B6367FDB6317AEA8C7C6952653E5", "quality": "720p", "type": "web", "seeds": 18, "peers": 2, "size": "3.05 GB", "size_bytes": 3274912563, "date_uploaded": "2022-09-08 02:22:23", "date_uploaded_unix": 1662596543 }, { "url": "https://yts.mx/torrent/download/6E33119C84F7634CCA354F7D7D4A90CCC08CB572", "hash": "6E33119C84F7634CCA354F7D7D4A90CCC08CB572", "quality": "1080p", "type": "web", "seeds": 41, "peers": 2, "size": "5.66 GB", "size_bytes": 6077378724, "date_uploaded": "2022-09-08 07:08:21", "date_uploaded_unix": 1662613701 }], "date_uploaded": "2022-09-08 02:22:23", "date_uploaded_unix": 1662596543 }, { "id": 43909, "url": "https://yts.mx/movies/wash-my-soul-in-the-rivers-flow-2021", "imdb_code": "tt14985732", "title": "Wash My Soul in the River's Flow", "title_english": "Wash My Soul in the River's Flow", "title_long": "Wash My Soul in the River's Flow (2021)", "slug": "wash-my-soul-in-the-rivers-flow-2021", "year": 2021, "rating": 9, "runtime": 90, "genres": ["Action", "Biography", "Documentary", "History", "Music"], "summary": "Wash My Soul in the River's Flow is a cinematic reinvention of a legendary concert that premiered in 2004. Kura Tungar-Songs from the River was a collaboration between First Nations singer-songwriters Archie Roach and Ruby Hunter working with Paul Grabowsky and the 22-piece Australian Art Orchestra. Using footage combining conversations, rehearsals, and the opening night, with breathtaking images of Hunter's Ngarrindjeri country in South Australia, the film is a portrait of artists at the peak of their powers and a profoundly moving story of loss, love and what it means to truly come 'home'.", "description_full": "Wash My Soul in the River's Flow is a cinematic reinvention of a legendary concert that premiered in 2004. Kura Tungar-Songs from the River was a collaboration between First Nations singer-songwriters Archie Roach and Ruby Hunter working with Paul Grabowsky and the 22-piece Australian Art Orchestra. Using footage combining conversations, rehearsals, and the opening night, with breathtaking images of Hunter's Ngarrindjeri country in South Australia, the film is a portrait of artists at the peak of their powers and a profoundly moving story of loss, love and what it means to truly come 'home'.", "synopsis": "Wash My Soul in the River's Flow is a cinematic reinvention of a legendary concert that premiered in 2004. Kura Tungar-Songs from the River was a collaboration between First Nations singer-songwriters Archie Roach and Ruby Hunter working with Paul Grabowsky and the 22-piece Australian Art Orchestra. Using footage combining conversations, rehearsals, and the opening night, with breathtaking images of Hunter's Ngarrindjeri country in South Australia, the film is a portrait of artists at the peak of their powers and a profoundly moving story of loss, love and what it means to truly come 'home'.", "yt_trailer_code": "JC3BfFd7_PE", "language": "en", "mpa_rating": "", "background_image": "https://yts.mx/assets/images/movies/wash_my_soul_in_the_rivers_flow_2021/background.jpg", "background_image_original": "https://yts.mx/assets/images/movies/wash_my_soul_in_the_rivers_flow_2021/background.jpg", "small_cover_image": "https://yts.mx/assets/images/movies/wash_my_soul_in_the_rivers_flow_2021/small-cover.jpg", "medium_cover_image": "https://yts.mx/assets/images/movies/wash_my_soul_in_the_rivers_flow_2021/medium-cover.jpg", "large_cover_image": "https://yts.mx/assets/images/movies/wash_my_soul_in_the_rivers_flow_2021/large-cover.jpg", "state": "ok", "torrents": [{ "url": "https://yts.mx/torrent/download/688F65E175F1D8E3C4D5E180977943A7548C661C", "hash": "688F65E175F1D8E3C4D5E180977943A7548C661C", "quality": "720p", "type": "web", "seeds": 3, "peers": 1, "size": "816.38 MB", "size_bytes": 856036475, "date_uploaded": "2022-07-31 15:10:11", "date_uploaded_unix": 1659273011 }, { "url": "https://yts.mx/torrent/download/AF4FD1AA3DED6554557E310B1C7D3E10DC7FB0DA", "hash": "AF4FD1AA3DED6554557E310B1C7D3E10DC7FB0DA", "quality": "1080p", "type": "web", "seeds": 7, "peers": 2, "size": "1.64 GB", "size_bytes": 1760936591, "date_uploaded": "2022-07-31 16:15:20", "date_uploaded_unix": 1659276920 }], "date_uploaded": "2022-07-31 15:10:11", "date_uploaded_unix": 1659273011 }, { "id": 43565, "url": "https://yts.mx/movies/bleeding-audio-2020", "imdb_code": "tt6379564", "title": "Bleeding Audio", "title_english": "Bleeding Audio", "title_long": "Bleeding Audio (2020)", "slug": "bleeding-audio-2020", "year": 2020, "rating": 9.1, "runtime": 90, "genres": ["Biography", "Documentary", "Music"], "summary": "", "description_full": "", "synopsis": "", "yt_trailer_code": "wrDjxzt2oRs", "language": "en", "mpa_rating": "", "background_image": "https://yts.mx/assets/images/movies/bleeding_audio_2020/background.jpg", "background_image_original": "https://yts.mx/assets/images/movies/bleeding_audio_2020/background.jpg", "small_cover_image": "https://yts.mx/assets/images/movies/bleeding_audio_2020/small-cover.jpg", "medium_cover_image": "https://yts.mx/assets/images/movies/bleeding_audio_2020/medium-cover.jpg", "large_cover_image": "https://yts.mx/assets/images/movies/bleeding_audio_2020/large-cover.jpg", "state": "ok", "torrents": [{ "url": "https://yts.mx/torrent/download/E4C28CFE0DC7977D118C481259DA42F5DAD30F0A", "hash": "E4C28CFE0DC7977D118C481259DA42F5DAD30F0A", "quality": "720p", "type": "web", "seeds": 1, "peers": 0, "size": "847.46 MB", "size_bytes": 888626217, "date_uploaded": "2022-07-18 15:48:59", "date_uploaded_unix": 1658152139 }, { "url": "https://yts.mx/torrent/download/A1541CAA16D6CA67D6BADA673591CA766843422F", "hash": "A1541CAA16D6CA67D6BADA673591CA766843422F", "quality": "1080p", "type": "web", "seeds": 3, "peers": 4, "size": "1.7 GB", "size_bytes": 1825361101, "date_uploaded": "2022-07-18 16:50:42", "date_uploaded_unix": 1658155842 }], "date_uploaded": "2022-07-18 15:48:59", "date_uploaded_unix": 1658152139 }]

const Search = () => {
	const dispatch = useDispatch()
	const [queryParams, setQueryParams] = useState({})
	const [pageState, setPageState] = useState({
		isPageLoading: true,
		films: null
	})

	useEffect(() => {
		dispatch(hideLoading()) // eslint-disable-next-line
	}, [])

	const urlSeparator = (param) => {
		if (queryParams['Genre'] && param === 'Genre') {
			return '?'
		} if (!queryParams['Genre'] && queryParams['Quality'] && param === 'Quality') {
			return '?'
		} if (!queryParams['Genre'] && !queryParams['Quality'] && queryParams['Sort by'] && param === 'Sort by') {
			return '?'
		}
		return '&' // (queryParams['Genre'] ? `${urlSeparator('Genre')}genre=${queryParams['Genre']}` : ``) +
	}

	const searchForFilms = async () => {
		try {
			setPageState(prevState => ({ ...prevState, isPageLoading: true }))
			const resultFilms = await axios.get(
				`https://yts.mx/api/v2/list_movies.json` +
				`?limit=49` +
				(queryParams['Genre'] ? `&genre=${queryParams['Genre']}` : ``) +
				(queryParams['Quality'] ? `&quality=${queryParams['Quality']}` : ``) +
				(queryParams['Sort by'] ? `&sort_by=${queryParams['Sort by'].replace(' ', '_')}` : ``)
			)
			setPageState(prevState => ({ ...prevState, films: resultFilms }))
		} catch (error) {
			console.log(error)
		} finally {
			setPageState(prevState => ({ ...prevState, isPageLoading: false }))
		}
	}

	return (
		<CardThemeBackground imgLink={IMGpeakyBlinders} >
			<div className={styles.container} >
				<div>
					<div className='row flex' >
						<input className={styles.searchField} placeholder='Search' />
						<button onClick={searchForFilms} className={styles.searchButton} >
							<BsSearch />
						</button>
					</div>
					{/* <input className={styles.searchField} placeholder='Search' /> */}
					<div className='mt-[20px]' />
					<div className='flex row' >
						<DropDownMenu childs={genres} keyName='Genre' controller={{ queryParams, setQueryParams }} className='ml-[10px]' />
						<DropDownMenu childs={qualities} keyName='Quality' controller={{ queryParams, setQueryParams }} className='ml-[10px]' />
						<DropDownMenu childs={sortBy} keyName='Sort by' controller={{ queryParams, setQueryParams }} className='ml-[10px]' />
						{/* <DropDownMenu childs={limit} keyName='Film per page' controller={{queryParams, setQueryParams}} className='ml-[10px]' /> */}
					</div>
				</div>


				{pageState.isPageLoading === true
					? <div className='w-full h-full flex items-center justify-center absolute'><ReactLoading type='spin' /></div>
					: <div />
				}


				{pageState.isPageLoading === false && pageState.films ?
					<div className={styles.movies}>
						{pageState.films.data.data.movies.map(movie => (
							<div className={styles.movie} key={movie.id}>
								<img className={styles.thumbnail} src={movie.medium_cover_image} alt={movie.title} />
								<h1 className={styles.movieTitle} key={`${movie.title}`}>{movie.title.substring(0, 40) + (movie.title.length > 40 ? '...' : '')}</h1>
								<div className='flex row' >
									<AiFillStar className={styles.starIcon} />
									<h1 className={styles.rating}>{movie.rating}/10</h1>
								</div>
							</div>
						))}
					</div>
					: <div />
				}


				{/* <div className='items-start justify-start w-full h-full p-[100px] flex flex-row'>
					{mydata.map((movie) => (
						<div className={styles.movie} key={movie.id}>
							<img className={styles.thumbnail} src={movie.medium_cover_image} alt={movie.title} />
							<h1 className={styles.movieTitle} key={`${movie.title}`}>{movie.title.substring(0, 40) + (movie.title.length > 40 ? '...' : '')}</h1>
							<div className='flex row' >
								<AiFillStar className={styles.starIcon} />
								<h1 className={styles.rating}>{movie.rating}/10</h1>
							</div>
						</div>
					))}
				</div> */}


			</div>
		</CardThemeBackground>
	)
}

export default Search

// const limit = ['10', '20', '30', '40', '50']
// pageNumber - minRating/10 - orderBy
// DONE= genre - quality - sortBy -
// BLACH= limit - orderBy