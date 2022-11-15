import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { NavbarUserUnlogged } from '../components/Navbar'
import styles from './styles/AccountVerified.module.css'
import IMGdark2 from '../images/dark2.jpg'
// import { BsPlayFill } from 'react-icons/bs'
// import Divider from '../components/Divider'
import { useDispatch } from 'react-redux'
import { hideLoading } from '../redux/loading'

const gradient = {
	position: 'absolute',
	background: 'radial-gradient(circle, rgba(0,0,0,0) 15%, rgba(0,0,0,1) 100%)',
	height: '100vh',
	width: '100vw'
}
// const button = {
// 	display: 'flex',
// 	flexDirection: 'row',
// 	alignItems: 'center',
// 	justifyContent: 'center',
// 	background: '#474747',
// 	color: 'white',
// 	cursor: 'pointer',
// 	margin: '10px',
// 	padding: '5px 10px 5px 10px',
// 	borderRadius: '5px',
// }
const cardContent = {
	display: 'flex',
	flexDirection: 'column',
	width: 'min(80vw, 500px)',
	alignItems: 'center',
	padding: '10px'
}
// const textButton = {
// 	fontSize: '18px'
// }

const VerfifyYourAccount = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()

	useEffect(() => { dispatch(hideLoading()) }, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (<>
		<NavbarUserUnlogged loginButtonHidden={true} />
		<div className={styles.page}>
			<img className={styles.backgroundImg} src={IMGdark2} alt='background_img' />
			<div style={gradient} />
			<div className={styles.card} >
				<div style={cardContent} >
					<h1 className={styles.cardTitle}>{t('please_confrim_your_account')}</h1>
					<h1 className={styles.cardDescription}>{t('check_your_inbox_to_confirm')}</h1>
					{/* <div className='w-[100%]' >
						<Divider> {t('or')} </Divider>
					</div>
					<h1 className={styles.cardDescription} >{t('no_mail_received')}</h1>
					<button style={button} >
						<h1 style={textButton} >{t('resend_confirmation_email')}</h1>
						<BsPlayFill className={`text-[40px]`} />
					</button> */}
				</div>
			</div>
		</div>
	</>)
}

export default VerfifyYourAccount
