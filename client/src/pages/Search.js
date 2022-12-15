import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CardThemeBackground from '../components/CardThemeBackground'
import { hideLoading } from '../redux/loadingSlice'
import IMGpeakyBlinders from '../images/peaky_blinders.jpg'
import styles from './styles/Search.module.css'
import { BsSearch } from 'react-icons/bs'
import DropDownMenu from '../components/DropDownMenu'

const genres = ['Comedy', 'Sci-fi', 'Horror', 'Romance', 'Action', 'Thriller', 'Drama', 'Mystery', 'Crime', 'Animation', 'Adventure', 'Fantasy']
const qualities = ['720p', '1080p', '2160p', '3D']
// limit - pageNumber - quality - minRating/10 - sortBy - orderBy 
// genre 

const Search = () => {
	const dispatch = useDispatch()
	const [queryParams, setQueryParams] = useState({})

	useEffect(() => {
		dispatch(hideLoading())
	}, [])

	return (
		<CardThemeBackground imgLink={IMGpeakyBlinders} >
			<div className={styles.container} >
				<div className='row flex ' >
					<input className={styles.searchField} placeholder='Search' />
					<DropDownMenu childs={genres} keyName='Genre' controller={{queryParams, setQueryParams}} className='ml-[10px]' />
					<DropDownMenu childs={qualities} keyName='Quality' controller={{queryParams, setQueryParams}} className='ml-[10px]' />
					<button className={styles.searchButton} >
						<BsSearch />
					</button>
				</div>
				{/* <input className={styles.searchField} placeholder='Search' /> */}
				<div className='mt-[20px]' />
				<div className='flex row' >
				</div>
			</div>
		</CardThemeBackground>
	)
}

export default Search
