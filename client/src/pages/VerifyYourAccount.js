import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavbarUserUnlogged } from '../components/Navbar'
import styles from './styles/AccountVerified.module.css'
import IMGdark2 from '../images/dark2.jpg'
import Divider from '../components/Divider'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading } from '../redux/loadingSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ReactLoading from 'react-loading'
import { GoCheck } from 'react-icons/go'
import styles2 from './styles/VerifyYourAccount.module.css'
import { selectUser } from '../redux/userSlice'

const VerfifyYourAccount = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	const [loadingIconState, setLoadingIconState] = useState(false)
	const [checkIconState, setCheckIconState] = useState(false)
	const [errorMessage, setErrorMessage] = useState(' ')
	let result

	useEffect(() => {
		console.log(user.isAccountComplete)
		if (!(user.userData.username)) navigate('*')
		else if (user.isAccountComplete === true) navigate('/')
		setTimeout(() => dispatch(hideLoading()), 0)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const resendEmail = async () => {
		try {
			setCheckIconState(false)
			setLoadingIconState(true)
			await Promise.all([
				new Promise(resolve => setTimeout(resolve, 1000)),
				axios.get(process.env.REACT_APP_SERVER_HOSTNAME + '/send-confirmation-email/' + user.userData.username)
					.then(rsp => { result = rsp })
			])
			setLoadingIconState(false)
			setCheckIconState(true)
			await new Promise(resolve => setTimeout(resolve, 1500))
			setCheckIconState(false)
		} catch (error) {
			setLoadingIconState(false)
			error.response?.status === 404 && setErrorMessage(error.response.data)
		}
	}

	return (<>
		<NavbarUserUnlogged />
		<div className={styles.page}>
			<img className={styles.backgroundImg} src={IMGdark2} alt='background_img' />
			<div className={styles2.gradient} />
			<div className={styles.card} >
				<div className={styles2.cardContent} >
					<h1 className={styles.cardTitle}>{t('please_confrim_your_account')}</h1>
					<h1 className={styles.cardDescription}>{t('check_your_inbox_to_confirm')}</h1>
					<div className='w-[100%]' >
						<Divider> {t('or')} </Divider>
					</div>
					<h1 className={styles.cardDescription} >{t('no_mail_received')}</h1>
					<div className='flex items-center' >
						<div className='w-[25px]' />
						<h1 onClick={resendEmail} className={styles2.textButton} >{t('resend_confirmation_email')}</h1>
						<div className='w-[25px] h-[25px] ml-[10px]' >
							{ loadingIconState === true && <ReactLoading type='spin' height={'100%'} width={'100%'} /> }
							{ checkIconState === true && <GoCheck className={styles2.checkIcon} /> }
						</div>
					</div>
					<h1 className={styles2.errorMessage} >{errorMessage}</h1>
				</div>
			</div>
		</div>
	</>)
}

export default VerfifyYourAccount
