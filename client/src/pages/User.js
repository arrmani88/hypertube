import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardThemeBackground from '../components/CardThemeBackground'
import IMGvikings2 from '../images/vikings2.jpg'
import { hideLoading } from '../redux/loadingSlice'
import { selectUser } from '../redux/userSlice'
import styles from './styles/User.module.css'
import { FaBirthdayCake, FaGenderless } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { BiEditAlt } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const User = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const { t } = useTranslation()
	const { parameterUsername } = useParams()
	const usergender = user.userData.gender === 'M' ? 'male' : 'female'
	let avatarImage = process.env.REACT_APP_SERVER_HOSTNAME + '/images/'
		+ ((user.userData.images[0]?.image) || 'blank-profile-image.png')

	useEffect(() => {
		const getPageData = async () => {
		try {
			console.log('token=', user.accessToken)
			console.log('envToken=', process.env.REACT_APP_MANUALTOKEN)
				const result = await axios.get(
					process.env.REACT_APP_SERVER_HOSTNAME + '/get_user',
					{ idOrUsername: parameterUsername },
					{ headers: { 'Content-Type': 'application/json', Authorization: `${user.accessToken}` } }
				)
				console.log('===========================')
				console.log(result)
				console.log('===========================')
			} catch (error) {
				console.log(error)
			} finally {
				dispatch(hideLoading())
			}
		}
		getPageData()
	}, [])

	return (
		<CardThemeBackground imgLink={IMGvikings2} >
			<div className={styles.avatarContainer} >
				<img className={styles.userAvatarImg} src={avatarImage} alt='userImg' />
			</div>
			<h1 className={styles.firstLastName}>{user.userData.firstName + ' ' + user.userData.lastName}</h1>
			<div>
				<div className={styles.row} >
					<h1 className={styles.icon}>@</h1>
					<h1 className={styles.userData} >{user.userData.username}</h1>
				</div>
				<div className='mt-[15px]' />
				<div className={styles.row} >
					<FaBirthdayCake className={styles.icon} />
					<h1 className={styles.userData} >{user.userData.birthday}</h1>
				</div>
				<div className='mt-[20px]' />
				<div className={styles.row} >
					<FaGenderless className={styles.icon} />
					<h1 className={styles.userData}>{t(usergender)}</h1>
				</div>
			</div>
			<div className='mt-[20px]' />
			<button className={styles.editButton} onClick={() => {}} >
				<p>{t('edit')}</p>
				<BiEditAlt className={`text-[40px]`} />
			</button>
		</CardThemeBackground>
	)
}

export default User
