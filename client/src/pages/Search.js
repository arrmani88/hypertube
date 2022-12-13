import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CardThemeBackground from '../components/CardThemeBackground'
import { hideLoading } from '../redux/loadingSlice'
import IMGpeakyBlinders from '../images/peaky_blinders.jpg'

const Search = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(hideLoading())
	}, [])

	return (
		<CardThemeBackground imgLink={IMGpeakyBlinders} >
			<div className='h-[500px] w-[500px]' ></div>
		</CardThemeBackground>
	)
}

export default Search