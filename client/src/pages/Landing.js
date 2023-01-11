import React, { useEffect } from 'react'
import { BsFacebook, BsPlayFill } from 'react-icons/bs'
import Divider from '../components/Divider'
import { ImGoogle3 } from 'react-icons/im'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './styles/Landing.module.css'
import { useNavigate } from 'react-router-dom'
import { kEmailRegex } from '../constants/regex'
import CardThemeBackground from '../components/CardThemeBackground'
import IMGmovies from '../images/movies.jpeg'
import IMG42icon from '../images/42_icon.png'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/loadingSlice'

const Landing = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const navigate = useNavigate()
	const emailRef = useRef(null)
	const [isEmailValid, setIsEmailValid] = useState(null)

	const redirect = (e) => {
		e.preventDefault()
		const isEmailMatched = Boolean(String(emailRef.current.value).toLowerCase().match(kEmailRegex) !== null)
		setIsEmailValid(isEmailMatched)
		if (isEmailMatched === true) {
			dispatch(showLoading())
			navigate({
				pathname: '/register',
				search: 'email=' + emailRef.current.value
			})
		}
	}
	
	useEffect(() => { setTimeout(() => dispatch(hideLoading()), 0) }, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (<>
		<CardThemeBackground imgLink={IMGmovies} loginButtonShown={true}>
			<h1 className={styles.cardTitle}>{t("see_whats_next")}</h1>
			<h1 className={styles.cardText1}>{t("watch_limitless")}</h1>
			<h1 className={`${styles.cardText2} hideOnMobileVersion`}>{t("ready_to_watch")}</h1>
			<div>
				<input className={`${styles.emailField} ${(isEmailValid === false && 'emailFieldError')}`} ref={emailRef} onChange={() => setIsEmailValid(true)} placeholder={t("enter_your_email")} />
				<div className={styles.containerInvalidEmail}>
					{isEmailValid === false
						? <h1 className={styles.invalidEmail}>{t("invalid_email")}</h1>
						: <h1 className={styles.invalidEmail}> </h1>
					}
				</div>
				<button className={styles.cardButton} onClick={redirect}>
					<h1 className={styles.buttonText}>{t('start_watching_free')}</h1>
					<BsPlayFill className={styles.cardPlayIcon} />
				</button>
				<Divider><h1>{t('or')}</h1></Divider>
				<h1 className={styles.cardText2}>{t('continue_with')}</h1>
				<div className={styles.socialsContainer} >
					<BsFacebook className={styles.socialMediaIcon} />
					<ImGoogle3 className={styles.socialMediaIcon} />
					<img src={IMG42icon} className={styles.icon42} alt='42_icon' />
				</div>
			</div>
		</CardThemeBackground>
	</>)
}

export default Landing
