import React, { useEffect, useState } from 'react'
import CardThemeBackground from '../components/CardThemeBackground'
import styles from './styles/UploadImage.module.css'
import { AiOutlineFileImage } from 'react-icons/ai'
import { BsPlayFill } from 'react-icons/bs'
import ReactLoading from 'react-loading'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import IMGvikings from '../images/vikings.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading } from '../redux/loadingSlice'
import { selectUser, updateUserData } from '../redux/userSlice'

const UploadImage = () => {
	const { t } = useTranslation()
	const [isLoading, setIsLoading] = useState(false)
	const formData = new FormData()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	// const image = user.userData.image
	// const avatarImage = process.env.REACT_APP_SERVER_HOSTNAME + '/images/'
	// 	+ ((user.userData.images[0]?.image) || 'blank-profile-image.png')
	const [avatarImage, setAvatarImage] = useState(
		process.env.REACT_APP_SERVER_HOSTNAME + '/images/'
		+ ((user.userData.images[0]?.image) || 'blank-profile-image.png')
	)

	const chooseImage = async e => {
		if (e.target.files[0]) {
			try {
				setIsLoading(true)
				const file = e.target.files[0]
				formData.delete('image') // case if the user uploaded a picture, then uploaded a second one: delete the first one from formData
				formData.append('image', file)
				const rsp = await axios.post(
					process.env.REACT_APP_SERVER_HOSTNAME + '/upload_profile_image',
					formData,
					{ headers: { 'Content-Type': file.type, Authorization: `${process.env.REACT_APP_MANUALTOKEN}` } }
				)
				var images = [ ...user.userData.images ] // we need to change the old image with a new one, so ew create a new `images` array to edit it
				images[0] = {...images[0], image: rsp.data.newImageName} // we add the new image to the the `images` array
				const updatedUserData = { ...user.userData, images } // we initialize an new object to set it as user Data
				setAvatarImage(process.env.REACT_APP_SERVER_HOSTNAME + '/images/'
					+ ((updatedUserData.images[0]?.image) || 'blank-profile-image.png'))
				dispatch(updateUserData(updatedUserData))
			} catch (err) {
				console.log(err)
			} finally {
				setIsLoading(false)
			}
		}
	}
	const navigateToHome = e => {
		navigate({ pathname: '/home' })
	}

	useEffect(() => {
		dispatch(hideLoading())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<CardThemeBackground imgLink={IMGvikings} >
			<h1 className={styles.title}>{t('one_last_step')}</h1>
			<h1 className={styles.label} >{t('add_profile_image')}</h1>
			<div className={styles.changeImageContainer}>
				<div className={styles.uploadIconContainer} >
					<label className={styles.uploadIconBackground} onChange={chooseImage} htmlFor='imgUpload' >
						{isLoading === true
							? <ReactLoading className={styles.uploadIcon} type='spin' />
							: <AiOutlineFileImage className={styles.uploadIcon} />
						}
						<input hidden id='imgUpload' type='file' />
					</label>
				</div>
				<img className={styles.userAvatarImg} src={avatarImage} alt='userImg' onClick={() => { }} />
			</div>

			<button className={styles.submitButton} onClick={navigateToHome} >
				<p>{t('start_watching')}</p>
				<BsPlayFill className={`text-[40px]`} />
			</button>
		</CardThemeBackground>
	)
}

export default UploadImage

