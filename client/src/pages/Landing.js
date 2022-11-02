import React from 'react'
import { BsFacebook, BsPlayFill } from 'react-icons/bs'
import { NavbarUserUnlogged } from '../components/Navbar'
import Divider from '../components/Divider'
import { ImGoogle3 } from 'react-icons/im'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './styles/Landing.module.css'
import { useNavigate } from 'react-router-dom'
import { kEmailRegex } from '../constants/regex'

const Landing = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const emailRef = useRef(null)
	const [isEmailValid, setIsEmailValid] = useState(null)

	const redirect = (e) => {
		e.preventDefault()
		const isEmailMatched = Boolean(String(emailRef.current.value).toLowerCase().match(kEmailRegex) !== null)
		setIsEmailValid(isEmailMatched)
		if (isEmailMatched === true)
			navigate({
				pathname: '/register',
				search: 'email=' + emailRef.current.value
			})
	}

	return (
		<>
			<NavbarUserUnlogged />
			<div className={styles.container}>
				<img className={styles.backgroundImage} src='images/movies.jpeg' alt='bgr_img' />
				<div className={styles.gradient} />
				<div className={styles.emptyBox} />
				<div className={styles.card}>
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
							<img src='images/42_icon.png' className={styles.icon42} alt='42_icon' />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Landing
