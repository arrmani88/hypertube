import React from 'react'
import { useTranslation } from 'react-i18next'
import { BsPlayFill } from 'react-icons/bs'
import styles from './styles/AccountVerified.module.css'
import CardThemeBackground from '../components/CardThemeBackground'

const AccountVerified = () => {
	const { t } = useTranslation()

	return (<>
		<CardThemeBackground imgLink={'images/aladdin.jpeg'} loginButtonHidden={true} >
			<h1 className={styles.cardTitle}>{t('account_verified')}</h1>
			<h1 className={styles.cardDescription}>{t('your_account_has_been_verified')}</h1>
			<div className='mt-[20px]' />
			<button className={styles.continueButton} >
				<h1 className={styles.textButton} >{t('login')}</h1>
				<BsPlayFill className={`text-[40px]`} />
			</button>
		</CardThemeBackground>
	</>)
}

export default AccountVerified
