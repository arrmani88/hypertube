import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CardThemeBackground from '../components/CardThemeBackground'
import IMGjohnSnow from '../images/john_snow.jpeg'
import styles from './styles/SendResetPasswordEmail.module.css'
import ReactLoading from 'react-loading'
import { BsPlayFill } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { hideLoading } from '../redux/loading'

const passwordLengthMessage = 'Password should be between 6 and 20 characters'
const ResetPassword = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const { token } = useParams()
	const [isButtonLoading, setIsButtonLoading] = useState(false)
	const [pageState, setPageState] = useState('showForm') // should be showForm or hideForm
	const passwordSchema = yup.object({
		password:		 yup.string().required(t('required_field')).min(6, passwordLengthMessage).max(20, passwordLengthMessage),
		confirmPassword: yup.string().required(t('required_field')).oneOf([yup.ref('password')], 'Passwords should match')
	}).required()
	const { register, handleSubmit, watch, formState: {errors} } = useForm({ resolver: yupResolver(passwordSchema) })
	const resetPassword = async () => {
		try {
			console.log(watch('password'))
			setIsButtonLoading(true)
			const rsp = await axios.post(
				`${process.env.REACT_APP_SERVER_HOSTNAME}/reset_password/${token}`,
				{ password: watch('password')}
			)
			localStorage.setItem('accessToken', rsp.data.accessToken)
			setPageState('hideForm')
			setIsButtonLoading(false)
		} catch (err) {
			setIsButtonLoading(false)
			console.log(err)
		}
	}
	
	const GoToHome = () => navigate('/')
	
	useEffect(() => { dispatch(hideLoading()) })

	return (
		pageState === 'showForm'
			? <CardThemeBackground imgLink={IMGjohnSnow} >
			<h1 className={styles.cardTitle} >{t('reset_your_password')}</h1>
			<div className='mt-[30px]' />
			<form onSubmit={handleSubmit(resetPassword)} >

				<h1 className={styles.fieldTitle} >{t('Choose a new password')}</h1>
				<input {...register('password')} className={styles.field}  />
				<h1 className={styles.errorMessage}>{errors.password?.message || ' '}</h1>

				<h1 className={styles.fieldTitle} >{t('Re-type your password')}</h1>
				<input {...register('confirmPassword')} className={styles.field}  />
				<h1 className={styles.errorMessage}>{errors.confirmPassword?.message || ' '}</h1>

				<div className='mt-[10px]' />
				<button className={styles.button} type='submit' >
					{t('reset_password')}
					{isButtonLoading === true
						? <ReactLoading type='spin' className='p-3' />
						: <BsPlayFill className='text-[40px]' />
					}
				</button>
			</form>
		</CardThemeBackground>
		: <CardThemeBackground imgLink={IMGjohnSnow} >
			<h1 className={styles.cardTitle} >{t('password_reset_successfully')}</h1>
			<div className='mt-[40px]' />
			<button onClick={GoToHome} className={styles.button}>
					{t('go_to_home')}
					<BsPlayFill className='text-[40px]' />
				</button>
		</CardThemeBackground>
	)
}

export default ResetPassword
