import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import CardThemeBackground from '../components/CardThemeBackground'
import { hideLoading } from '../redux/loadingSlice'
import IMGwolverine from '../images/wolverine.jpg'
import styles from './styles/Search.module.scss'
import { BsSearch } from 'react-icons/bs'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { RiAddFill } from 'react-icons/ri'
import RedButton from '../components/RedButton'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'


const UserSearch = () => {
	const searchRef = useRef(null)
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { data: users, error, status, mutateAsync } = useMutation({
		mutationFn: async () => {

		}
	})

	// eslint-disable-next-line
	useEffect(() => { dispatch(hideLoading()) }, [])

	return (
		<CardThemeBackground imgLink={IMGwolverine} >
			<div className={styles.container} >
				<form className={styles.searchContainer} onSubmit={() => { }} >
					<input ref={searchRef} className={styles.searchField} placeholder={t('search')} />
					<button className={styles.searchButton} >
						<BsSearch />
					</button>
				</form>

				{/* {status === 'loading' ?
					<div className='w-full h-full flex items-center justify-center my-[30px]'><ReactLoading type='spin' /></div> : <div />
				}

				{status === 'success' && (pageState && pageState.pageNumber < pageState.lastPage) &&
					<div className={styles.showMoreFilms} >
						<RedButton onClick={showMoreFilms} text='show_more' icon={<RiAddFill />} tailwind='w-11/12' />
					</div>
				} */}

			</div>
		</CardThemeBackground>

	)
}

export default UserSearch