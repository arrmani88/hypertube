import React, { useState } from 'react'
import CardThemeBackground from '../components/CardThemeBackground'
import styles from './styles/UploadImage.module.css'
import { AiOutlineFileImage } from 'react-icons/ai'
import { BsPlayFill } from 'react-icons/bs'
import ReactLoading from 'react-loading'
import { useTranslation } from 'react-i18next'

const UploadImage = () => {
	const { t } = useTranslation()
	const [isLoading, setIsLoading] = useState(false)
	const chooseImage = e => {
		const lien = URL.createObjectURL(e.target.files[0])
		console.log(e.target.files[0])
	}
	const uploadImage = e => {
		setIsLoading(true)
	}
	
	return (<>
		<CardThemeBackground imgLink='images/vikings.jpg' >
			<h1 className={styles.title}>{t('one_last_step')}</h1>
			<h1 className={styles.label} >{t('add_profile_image')}</h1>
			<div className={styles.changeImageContainer}>
				<img className={styles.userAvatarImg} src='images/arrmani88.jpeg' alt='userImg' />
				<label className={styles.uploadIconContainer} onChange={chooseImage} htmlFor='imgUpload' >
					<input hidden id='imgUpload' type='file' />
					<div className={styles.uploadIconBackground} >
						<AiOutlineFileImage className={styles.uploadIcon} />
					</div>
				</label>
			</div>

			<button className={styles.submitButton} onClick={uploadImage} >
				<p>{t('upload_image')}</p>
				{isLoading === true
					? <ReactLoading type='spin' className='p-3' />
					: <BsPlayFill className={`text-[40px]`} />
				}
			</button>
		</CardThemeBackground>
	</>)
}

export default UploadImage

