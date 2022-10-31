import React from 'react'
import { BsFacebook, BsPlayFill } from 'react-icons/bs'
import { NavbarUserUnlogged } from '../components/Navbar'
import styles from './styles/Login.module.css'
import Divider from '../components/Divider'
import { useTranslation } from 'react-i18next'
import { ImGoogle3 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const { t } = useTranslation()
	const navigate  = useNavigate()
	const login = (e) =>{
		e.preventDefault()
		return navigate('/home')
	}

	return (<>
		<NavbarUserUnlogged loginButtonHidden={true} />
		<div className={styles.login}>
			<img className={styles.backgroundImg} src='images/national-treasure.jpg' alt='background_img' />
			<div className={styles.gradient} />
			<div className={styles.card} >
				<div className={styles.cardContent}>
					<form className={styles.loginForm} >
						<label >
							<p>Login</p>
							<input className={styles.field} />
						</label>
						<div className='mt-[10px]' />
						<label >
							<p>{t('password')}</p>
							<input className={styles.field} />
						</label>
						<div className='mt-[20px]' />
						<button className={styles.loginButton} onClick={login} >
							<h1 className={styles.loginText}>{t('login')}</h1>
							<BsPlayFill className={`text-[40px]`} />
						</button>
					</form>
					<Divider><h1>{t('or')}</h1></Divider>
					<h1 className={styles.continueWith}>{t('continue_with')}</h1>
						<div className={styles.socialsContainer} >
							<BsFacebook className={styles.socialMediaIcon} />
							<ImGoogle3 className={styles.socialMediaIcon} />
							<img src='images/42_icon.png' className={styles.icon42} alt='42_icon' />
						</div>
				</div>
			</div>
		</div>
	</>)
}

export default Login
