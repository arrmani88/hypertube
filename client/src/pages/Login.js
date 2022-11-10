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
import Loading from '../components/Loading'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


const Login = () => {
	const [pageState, setPageState] = useState('loading') // should be either loading or loading
	const { t } = useTranslation()
	const navigate = useNavigate()
	const loginSchema = yup.object({
		login: yup.string().required(t('required_field')),
		password: yup.string().required(t('required_field')).min(6, 'Invalid password').max(20, 'Invalid password'),
	}).required()
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(loginSchema)
	})

	const submitForm = async (loginData) => {
		try {
			console.log(loginData)
			const rsp = await axios.post(
				`${process.env.REACT_APP_SERVER_HOSTNAME}/login`,
				loginData,
				// {headers: {
				// 	'Content-Type': 'application/json'
				// }}
			)
			console.log(rsp)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		const checkAlreadyLogged = async () => {
			try {
				const storedAccessToken = localStorage.getItem('accessToken')
				if (!storedAccessToken) navigate('/login') // if no token was stored, continue to the page
				else { // else if a token is stored,
					const user = await axios.get(  // check if the token is valid (get either the user or status=4XX)
						`${process.env.REACT_APP_SERVER_HOSTNAME}/get_me`,
						{ headers: { Authorization: storedAccessToken } }
					)
					user.status === 200 ? navigate('/') : setPageState('login')
				}
			} catch (err) {
				console.log(err)
				if (err.response && err.response.status / 100 === 4) setPageState('login') // err.rsp.status / 100 -> means 400 or 401 or 403
			}
		}
		checkAlreadyLogged()
	}, [])

	return (<>
		{pageState === 'loading'
			? <Loading />
			: <CardThemeBackground imgLink={IMGnationalTreasure} loginButtonHidden={true} >
				<p className={styles.cardTitle} >{t('login_and_start_watching')}</p>
				<form onSubmit={handleSubmit(submitForm)} className={styles.loginForm} >
					<label >
						<p>Login</p>
						<input {...register('login')} className={styles.field} />
					</label>
					<div className='mt-[10px]' />
					<label >
						<p>{t('password')}</p>
						<input {...register('password')} className={styles.field} />
					</label>
					<div className='mt-[20px]' />
					<button type='submit' className={styles.loginButton} >
						<h1 className={styles.loginText}>{t('login')}</h1>
						<BsPlayFill className={`text-[40px]`} />
					</button>
				</form>
				<Divider><h1>{t('or')}</h1></Divider>
				<h1 className={styles.continueWith}>{t('continue_with')}</h1>
				<div className={styles.socialsContainer} >
					<BsFacebook className={styles.socialMediaIcon} />
					<ImGoogle3 className={styles.socialMediaIcon} />
					<img src={IMG42icon} className={styles.icon42} alt='42_icon' />
				</div>
			</CardThemeBackground>
		}
	</>)
}

export default Login
