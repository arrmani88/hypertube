import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardThemeBackground from '../components/CardThemeBackground'
import { hideLoading } from '../redux/loadingSlice'
import IMGwolverine from '../images/wolverine.jpg'
import stylesDup from './styles/Search.module.scss'
import styles from './styles/SearchUsers.module.css'
import { BsSearch } from 'react-icons/bs'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { RiAddFill } from 'react-icons/ri'
import RedButton from '../components/RedButton'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { selectUser } from '../redux/userSlice'


const SearchUsers = () => {
	const searchRef = useRef(null)
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const user = useSelector(selectUser)

	// eslint-disable-next-line
	useEffect(() => { dispatch(hideLoading()) }, [])

	const { data: users, error, status, mutateAsync } = useMutation({
		mutationFn: async (e) => {
			e.preventDefault()
			return (await axios.get(
				`${process.env.REACT_APP_SERVER_HOSTNAME}/search-users/${searchRef.current.value}`,
				{ headers: { 'Content-Type': 'application/json', Authorization: user.accessToken } },
			)).data
		},
		// useErrorBoundary: true
		onError: (er) => {
			console.log('onError onError onError')
		}
	})

	console.log('-----------------------------')
	console.log('statusis=', status)
	console.log('usersare=', users)
	console.log('error caught', error)
	console.log('-----------------------------')

	return (
		<CardThemeBackground imgLink={IMGwolverine} >
			<div className={stylesDup.container} >
				<form className={stylesDup.searchContainer} onSubmit={mutateAsync} >
					<input ref={searchRef} className={stylesDup.searchField} placeholder={t('search')} />
					<button className={stylesDup.searchButton} >
						<BsSearch />
					</button>
				</form>

				{(status === 'success' || status === 'loading') &&
					<div className={styles.users} >
						{users?.map((user, index) => (
							<a href={`${process.env.REACT_APP_CLIENT_HOSTNAME}/user/${user.username}`} className={styles.user} key={index} >
								<img className={styles.userImage} src={`${process.env.REACT_APP_SERVER_HOSTNAME}/images/${user.profileImage ?? 'blank-profile-image.png'}`} alt={index} />
								<div className={styles.gradient} />
								<div className={styles.namesContainer} >
									<h1 className={styles.username} >{'@' + user.username}</h1>
									<h1 className={styles.userFirstLastName} >{user.firstName + ' ' + user.lastName}</h1>
								</div>
							</a>
						))}
					</div>
				}
				{error?.response?.status === 404 &&
					<div className='h-full w-full'>
						<h1 className={stylesDup.oops} >Oops!</h1>
						<h1 className={stylesDup.noResultsFound} >No results found...</h1>
					</div>
				}

				{status === 'loading' ?
					<div className='w-full h-full flex items-center justify-center my-[30px]'><ReactLoading type='spin' /></div> : <div />
				}

				{/*status === 'success' && (pageState && pageState.pageNumber < pageState.lastPage) &&
					<div className={stylesDup.showMoreFilms} >
						<RedButton onClick={showMoreFilms} text='show_more' icon={<RiAddFill />} tailwind='w-11/12' />
					</div>
				*/}

			</div>
		</CardThemeBackground>

	)
}

export default SearchUsers