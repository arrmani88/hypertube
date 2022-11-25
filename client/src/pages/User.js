import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardThemeBackground from '../components/CardThemeBackground'
import IMGvikings2 from '../images/vikings2.jpg'
import { hideLoading } from '../redux/loadingSlice'
import { selectUser } from '../redux/userSlice'
import styles from './styles/User.module.css'
import { FaBirthdayCake, FaGenderless } from 'react-icons/fa'

const User = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const usergender = user.userData.gender === 'M' ? 'Male' : 'Female'
	let avatarImage = process.env.REACT_APP_SERVER_HOSTNAME + '/images/'
		+ ((user.userData.images[0]?.image) || 'blank-profile-image.png')

	useEffect(() => {
		dispatch(hideLoading())
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
					<h1 className={styles.userData}>{usergender}</h1>
				</div>
			</div>
			<button className={styles.editButton} onClick={() => {}} >
				<p>{t('start_watching')}</p>
				<BsPlayFill className={`text-[40px]`} />
			</button>
		</CardThemeBackground>
	)
}

export default User
