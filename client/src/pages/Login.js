import React, { useEffect, useState } from 'react'
import { BsFacebook, BsPlayFill } from 'react-icons/bs'
import styles from './styles/Login.module.css'
import Divider from '../components/Divider'
import { useTranslation } from 'react-i18next'
import { ImGoogle3 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import CardThemeBackground from '../components/CardThemeBackground'
import IMGnationalTreasure from '../images/national-treasure.jpg'
import IMG42icon from '../images/42_icon.png'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading } from '../redux/loadingSlice'
import { setUserLoggedIn, selectUser } from '../redux/userSlice'

const Login = () => {
	const [errorMessage, setErrorMessage] = useState(' ')
	const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const loginSchema = yup.object({
		login: yup.string().required(t('required_field')),
		password: yup.string().required(t('required_field')).min(6, 'Invalid password').max(20, 'Invalid password'),
	}).required()
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(loginSchema)
	})

	const submitForm = async (loginData) => {
		try {
			const rsp = await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/login`, loginData)
			console.log(rsp.data)
			if (rsp.status === 200) {
				setErrorMessage(' ') // clear error msg
				dispatch(setUserLoggedIn(rsp.data))
				localStorage.setItem('accessToken', rsp.data.accessToken)
				navigate('/')
			}
		} catch (err) {
			console.log(err)
			if (err.response.status === 422 || err.response.status === 404) setErrorMessage(err.response.data.error.details)
			else if (err.response.status === 403) setErrorMessage(err.response.data)
		}
	}

	const redirectToResetPassword = async () => {
		try {
			navigate('/send-reset-password-email')
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		if (user.isLoggedIn) { // if the state isn't currently loading (will be true or false after loading)
			if (user.isLoggedIn === false) // no user is logged in
				dispatch(hideLoading())
			else if (user.isLoggedIn === true) // user is logged in
				navigate('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	return (
		<CardThemeBackground imgLink={IMGnationalTreasure} loginButtonHidden={true} >
			<p className={styles.cardTitle} >{t('login_and_start_watching')}</p>
			<form onSubmit={handleSubmit(submitForm)} className={styles.loginForm} >
				<label >
					<p>Login</p>
					<input {...register('login')} className={styles.field} onChange={() => setErrorMessage(' ')} />
					<h1 className={styles.errorMessage} >{errors.login?.message || ' '} </h1>
				</label>
				<label >
					<p>{t('password')}</p>
					<input {...register('password')} className={styles.field} onChange={() => setErrorMessage(' ')} type='password' />
					<h1 className={styles.errorMessage} >{errors.password?.message || ' '} </h1>
				</label>
				<button type='submit' onClick={() => setErrorMessage(' ')} className={styles.loginButton} >
					<h1 className={styles.loginText}>{t('login')}</h1>
					<BsPlayFill className={`text-[40px]`} />
				</button>
				<h1 className={styles.errorMessage} >{errorMessage}</h1>
			</form>
			<div className={styles.textCenter} >
				<h1 onClick={redirectToResetPassword} className={styles.passwordforgotten} >I forgot my password</h1>
			</div>
			<Divider><h1>{t('or')}</h1></Divider>
			<h1 className={styles.continueWith}>{t('continue_with')}</h1>
			<div className={styles.socialsContainer} >
				<BsFacebook className={styles.socialMediaIcon} />
				<ImGoogle3 className={styles.socialMediaIcon} />
				<img src={IMG42icon} className={styles.icon42} alt='42_icon' />
			</div>
		</CardThemeBackground>
	)
}

export default Login
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFycm1hbmk4OCIsImlkIjoxLCJpYXQiOjE2Njg4NjE1ODl9.o_XDsSsnRmDPwUlG9_EFU6T7MeLZTqXMcbt3qcUpGUg