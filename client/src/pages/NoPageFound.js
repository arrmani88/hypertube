import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CardThemeBackground from '../components/CardThemeBackground'
import styles from './styles/Landing.module.css'
import { BsPlayFill } from 'react-icons/bs'
import IMGinterstellar from '../images/interstellar.jpeg'
import { useDispatch } from 'react-redux'
import { hideLoading } from '../redux/loadingSlice'

const NoPageFound = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const redirect = () => navigate({ pathname: '/' })

	useEffect(() => {
		setTimeout(() => dispatch(hideLoading()), 0)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (<>
		<CardThemeBackground imgLink={IMGinterstellar} >
			<h1 className={styles.cardTitle} >Oops!</h1>
			<h1 className={styles.cardText1}>{t('no_page_exists')}</h1>
			<div className='py-5' />
			<button className={styles.cardButton} onClick={redirect}>
				<h1 className={styles.buttonText}>{t('go_back_home')}</h1>
				<BsPlayFill className={styles.cardPlayIcon} />
			</button>
		</CardThemeBackground>
	</>)
}

export default NoPageFound