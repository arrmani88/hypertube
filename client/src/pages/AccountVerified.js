import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsPlayFill } from 'react-icons/bs'
import styles from './styles/AccountVerified.module.css'
import CardThemeBackground from '../components/CardThemeBackground'
import IMGaladdin from '../images/aladdin.jpeg'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import axios from 'axios'


const AccountVerified = () => {
	const [pageState, setPageState] = useState('loading') // should be either loading or success
	const { t } = useTranslation()
	const { token } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const rsp = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/confirm_email/${token}`)
				rsp.status === 200
					? setPageState('success')
					: navigate('/not_found')
				localStorage.setItem('accessToken', `${rsp.data.access_token}`)
			} catch (err) {
				err.response.status === 400 && navigate('/not_found')
				console.log(err)
			}
		}
		fetchData()
	}, [])

	return (<>
		{pageState === 'loading'
			? <Loading />
			: <CardThemeBackground imgLink={IMGaladdin} loginButtonHidden={true} >
				<h1 className={styles.cardTitle}>{t('account_verified')}</h1>
				<h1 className={styles.cardDescription}>{t('your_account_has_been_verified')}</h1>
				<div className='mt-[20px]' />
				<button onClick={() => navigate('/home')} className={styles.continueButton} >
					<h1 className={styles.textButton} >{t('login')}</h1>
					<BsPlayFill className={`text-[40px]`} />
				</button>
			</CardThemeBackground>

		}
	</>)
}

export default AccountVerified

