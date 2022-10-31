import React from 'react'
import { useTranslation } from 'react-i18next'
import { BsPlayFill } from 'react-icons/bs'
import { NavbarUserUnlogged } from '../components/Navbar'
import styles from './styles/AccountVerified.module.css'

const AccountVerified = () => {
	const { t } = useTranslation()

	return (<>
		<NavbarUserUnlogged loginButtinHidden={true} />
		<div className={styles.page}>
			<img className={styles.backgroundImg} src='images/aladdin.jpeg' alt='background_img' />
			<div className={styles.gradient} />
			<div className={styles.card} >
				<div className={styles.cardContent} >
					<h1 className={styles.cardTitle}>{t('account_verified')}</h1>
					<h1 className={styles.cardDescription}>{t('your_account_has_been_verified')}</h1>
					<div className='mt-[20px]' />
						<button className={styles.continueButton} >
							<h1 className={styles.textButton} >{t('login')}</h1>
							<BsPlayFill className={`text-[40px]`} />
						</button>
				</div>
			</div>
		</div>
	</>)
}

export default AccountVerified
