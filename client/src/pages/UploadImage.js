import React, { useState } from 'react'
import CardThemeBackground from '../components/CardThemeBackground'
import styles from './styles/UploadImage.module.css'
import { AiOutlineFileImage } from 'react-icons/ai'
import { BsPlayFill } from 'react-icons/bs'
import ReactLoading from 'react-loading'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import IMGvikings from '../images/vikings.jpg'
import IMGarrmani88 from '../images/arrmani88.jpeg'

const UploadImage = () => {
	const { t } = useTranslation()
	const [isLoading, setIsLoading] = useState(false)
	const formData = new FormData()
	const navigate = useNavigate()

	const chooseImage = async e => {
		if (e.target.files[0]) {			
			try {
				setIsLoading(true)
				const file = e.target.files[0]
				formData.delete('image') // case if the user uploaded a picture, then uploaded a second one: delete the first one from formData
				formData.append('image', file)
				await axios.post(
					process.env.REACT_APP_SERVER_HOSTNAME + '/upload_profile_image',
					formData,
					{headers: {
						'Content-Type': file.type,
						Authorization: `${process.env.REACT_APP_MANUALTOKEN}`
					}}
				)
			} catch (err) {
				console.log(err)
				console.log(err.response.data)
			} finally {
				setIsLoading(false)
			}
		}
	}
	const navigateToHome = e => {
		navigate({ pathname: '/home' })
	}
	
	return (<>
		<CardThemeBackground imgLink={IMGvikings} >
			<h1 className={styles.title}>{t('one_last_step')}</h1>
			<h1 className={styles.label} >{t('add_profile_image')}</h1>
			<div className={styles.changeImageContainer}>
				<img className={styles.userAvatarImg} src={IMGarrmani88} alt='userImg' />
				<label className={styles.uploadIconContainer} onChange={chooseImage} htmlFor='imgUpload' >
					<input hidden id='imgUpload' type='file' />
					<div className={styles.uploadIconBackground} >
						{isLoading === true
							? <ReactLoading className={styles.uploadIcon} type='spin' />
							: <AiOutlineFileImage className={styles.uploadIcon} />
						}
					</div>
				</label>
			</div>

			<button className={styles.submitButton} onClick={navigateToHome} >
				<p>{t('start_watching')}</p>
				<BsPlayFill className={`text-[40px]`} />
			</button>
		</CardThemeBackground>
	</>)
}

export default UploadImage

