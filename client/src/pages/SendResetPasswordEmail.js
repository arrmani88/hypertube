import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CardThemeBackground from '../components/CardThemeBackground'
import IMGgot from '../images/got.jpg'
import styles from './styles/SendResetPasswordEmail.module.css'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { BsPlayFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { hideLoading } from '../redux/loadingSlice'

const SendResetPasswordEmail = () => {
	const { t } = useTranslation()
	const [pageState, setPasgeState] = useState('showForm') // should be showForm or hideForm
	const [isButtonLoading, setIsButtonLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState(' ')
	const [input, setInput] = useState('')
	const dispatch = useDispatch()

	const sendResetPasswordEmail = async (e) => {
		try {
			if (!input) setErrorMessage('Login is a required field')
			else {
				setErrorMessage(' ')
				setIsButtonLoading(true)
				await axios.post(
					`${process.env.REACT_APP_SERVER_HOSTNAME}/reset_password`,
					{ login: input },
				)
				setPasgeState('hideForm')
			}
		} catch (err) {
			setIsButtonLoading(false)
			if (err.response.status === 404) setErrorMessage(err.response.data.error)
			console.log(err)
		}
	}

	useEffect(() => {
		dispatch(hideLoading())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		pageState === 'showForm'
			? <CardThemeBackground imgLink={IMGgot}>
				<h1 className={styles.cardTitle} >{t('reset_your_password')}</h1>
				<div className='mt-[30px]' />
				<h1 className={styles.fieldTitle} >{t('enter_email_or_username')}</h1>
				<input className={styles.field} onChange={(e) => {setInput(e.target.value); setErrorMessage(' ')}} />
				<div className='mt-[25px]' />
				<button onClick={sendResetPasswordEmail} className={styles.button} >
					{t('reset_password')}
					{isButtonLoading === true
						? <ReactLoading type='spin' className='p-3' />
						: <BsPlayFill className='text-[40px]' />
					}
				</button>
				<h1 className={styles.errorMessage} >{errorMessage}</h1>
			</CardThemeBackground>
			: <CardThemeBackground imgLink={IMGgot} >
				<h1 className={styles.cardTitle} >{t('an_email_sent_to_reset_password')}</h1>
				<h1 className={styles.cardText1} >{t('check_inbox_to_reset_password')}</h1>
				<div className='mt-[30px]' />
				<h1 onClick={sendResetPasswordEmail} className={styles.resendEmail} >Resend Email</h1>
			</CardThemeBackground>
	)
}

export default SendResetPasswordEmail
