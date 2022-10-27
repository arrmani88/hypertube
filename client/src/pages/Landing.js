import React from 'react'
import { BsFacebook, BsPlayFill } from 'react-icons/bs'
import { NavbarUserUnlogged } from '../components/Navbar'
import Divider from '../components/Divider'
import { ImGoogle3 } from 'react-icons/im'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './styles/Landing.module.css'

const Landing = () => {
	const { t } = useTranslation()
	const emailRef = useRef(null)
	const [isEmailValid, setIsEmailValid] = useState(true)

	const click = () => {
		setIsEmailValid(Boolean(String(emailRef.current.value).toLowerCase()
			.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
		))
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
						<input className={`${styles.emailField} ${(isEmailValid === false && 'emailFieldError')}`} ref={emailRef} onChange={() => setIsEmailValid(true)} placeholder={t("enter_your_email")} type='text' />
						<div className={styles.containerInvalidEmail}>
							{isEmailValid === false
								? <h1 className={styles.invalidEmail}>{t("invalid_email")}</h1>
								: <h1 className={styles.invalidEmail}> </h1>
							}
						</div>
						<button className={styles.cardButton} onClick={click}>
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
