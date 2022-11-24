import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardThemeBackground from '../components/CardThemeBackground'
import IMGvikings2 from '../images/vikings2.jpg'
import { hideLoading } from '../redux/loadingSlice'
import { selectUser } from '../redux/userSlice'
import styles from './styles/User.module.css'

const User = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	let avatarImage = process.env.REACT_APP_SERVER_HOSTNAME + '/images/'
		+ ((user.userData.images[0]?.image) || 'blank-profile-image.png')
		
	useEffect(() => {
		dispatch(hideLoading())
	}, [])

	return (
		<CardThemeBackground imgLink={IMGvikings2} >
			<img className={styles.userAvatarImg} src={avatarImage} alt='userImg' />
			<h1 className={styles.username}>{user.userData.firstName+' '+user.userData.lastName}</h1>
			
		</CardThemeBackground>
	)
}

export default User
