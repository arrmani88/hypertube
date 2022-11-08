import React from 'react'
import { useTranslation } from 'react-i18next'
import { BsPlayFill } from 'react-icons/bs'
import { NavbarUserUnlogged } from '../components/Navbar'
import styles from './styles/AccountVerified.module.css'
import IMGdark2 from '../images/dark2.jpg'

const gradient = {
	position: 'absolute',
	background: 'radial-gradient(circle, rgba(0,0,0,0) 15%, rgba(0,0,0,1) 100%)',
	height: '100vh',
	width: '100vw'
}

const button = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	background: 'red',
	color: 'white',
	cursor: 'pointer',
	margin: '10px',
	padding: '10px 5px 10px 5px ',
	fontSize: '30px',
	width: '95%',
	borderRadius: '5px',
}

const cardContent  = {
	width: 'min(90%, 500px)'
}

const VerfifyYourAccount = () => {
	const { t } = useTranslation()
	localStorage.setItem("token", "hsjkdhkdhjksdhjkdsdh")

	return (<>
		<NavbarUserUnlogged loginButtinHidden={true} />
		<div className={styles.page}>
			<img className={styles.backgroundImg} src={IMGdark2} alt='background_img' />
			<div style={gradient} />
			<div className={styles.card} >
				<div style={cardContent} >
					<h1 className={styles.cardTitle}>{t('please_confrim_your_account')}</h1>
					<h1 className={styles.cardDescription}>{t('check_your_inbox_to_confirm')}</h1>
					<div className='mt-[20px]' />
						<button style={button} >
							<h1 className={styles.textButton} >{t('resend_confirmation_email')}</h1>
							<BsPlayFill className={`text-[40px]`} />
						</button>
				</div>
			</div>
		</div>
	</>)
}

export default VerfifyYourAccount
