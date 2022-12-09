import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BsPlayFill } from 'react-icons/bs'
import styles from './styles/AccountVerified.module.css'
import CardThemeBackground from '../components/CardThemeBackground'
import IMGaladdin from '../images/aladdin.jpeg'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/loadingSlice'
import { selectUser, setProfileStatus, setUserLoggedIn } from '../redux/userSlice'
import getUserIfLoggedIn from '../functions/getUserIfLoggedIn'

const AccountVerified = () => {
	const { t } = useTranslation()
	const { token } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector(selectUser)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const rsp = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/confirm_email/${token}`)
				if (rsp.status !== 200) navigate('/not-found')
				localStorage.setItem('accessToken', `${rsp.data.access_token}`)
				const result = await getUserIfLoggedIn()
				dispatch(setUserLoggedIn(result))
				dispatch(setProfileStatus({ isAccountComplete: true }))
				dispatch(hideLoading())
			} catch (err) {
				console.log(err)
				err.response.status === 400 && navigate('/not-found')
			}
		}
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onClick = () => {
		dispatch(showLoading())
		navigate('/')
	}

	return (
		<CardThemeBackground imgLink={IMGaladdin} >
			<h1 className={styles.cardTitle}>{t('account_verified')}</h1>
			<h1 className={styles.cardDescription}>{t('your_account_has_been_verified')}</h1>
			<div className='mt-[20px]' />
			<button onClick={onClick} className={styles.continueButton} >
				<h1 className={styles.textButton} >{t('login')}</h1>
				<BsPlayFill className={`text-[40px]`} />
			</button>
		</CardThemeBackground>
	)
}

export default AccountVerified

