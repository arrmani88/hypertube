import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardThemeBackground from '../components/CardThemeBackground'
import IMGvikings2 from '../images/vikings2.jpg'
import { hideLoading } from '../redux/loadingSlice'
import { selectUser, updateUserData } from '../redux/userSlice'
import styles from './styles/User.module.css'
import { FaBirthdayCake, FaGenderless } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { BiEditAlt } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { AiOutlineFileImage } from 'react-icons/ai'
import avatarStyles from './styles/UploadImage.module.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { kFirstNameRegex } from '../constants/regex'
import * as yup from 'yup'
import { GoCheck } from 'react-icons/go'
import { IoClose } from 'react-icons/io5'

const User = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	const { t } = useTranslation()
	const [userInfo, setUserInfo] = useState({})
	const [editingMode, setEditingMode] = useState(false)
	const [isAvatarButtonLoading, setIsAvatarButtonLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState(' ')
	const { parameterUsername } = useParams()
	const formData = new FormData()
	const schema = yup.object({
		firstName: yup.string().matches((/^$|^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-]+$/), 'Invalid first name'),
		lastName: yup.string().matches((/^$|^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-]+$/), 'Invalid last name'),
	})
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

	useEffect(() => {
		const getPageData = async () => {
			try {
				const result = await axios.get(
					process.env.REACT_APP_SERVER_HOSTNAME + '/get_user/' + parameterUsername,
					{ headers: { Authorization: `${user.accessToken}` } },
				)
				console.log(result)
				setUserInfo({
					fullName: result.data.firstName + ' ' + result.data.lastName,
					username: result.data.username,
					birthday: result.data.birthday,
					gender: (result.data.gender === 'M' ? 'male' : 'female'),
					image: process.env.REACT_APP_SERVER_HOSTNAME + '/images/' + (
						result.data.profileImage
							? result.data.profileImage
							: 'blank-profile-image.png'
					),
					isEditable: user.userData.username === result.data.username ? true : false
				})
			} catch (error) {
				if (error.response.status == 404) navigate('/404')
				console.log(error)
			} finally {
				dispatch(hideLoading())
			}
		}
		getPageData()
	}, [])

	const updateImage = async e => {
		if (e.target.files[0]) {
			try {
				setErrorMessage(' ')
				setIsAvatarButtonLoading(true)
				const file = e.target.files[0]
				formData.delete('image') // case if the user uploaded a picture, then uploaded a second one: delete the first one from formData
				formData.append('image', file)
				const rsp = await axios.post(
					process.env.REACT_APP_SERVER_HOSTNAME + '/upload_profile_image',
					formData,
					{ headers: { 'Content-Type': file.type, Authorization: `${user.accessToken}` } }
				)
				var images = [...user.userData.images] // we need to change the old image with a new one, so ew create a new `images` array to edit it
				images[0] = { ...images[0], image: rsp.data.newImageName } // we add the new image to the the `images` array
				const updatedUserData = { ...user.userData, images } // we initialize an new object to set it as user Data
				setUserInfo({
					...userInfo,
					image: process.env.REACT_APP_SERVER_HOSTNAME + '/images/' + (
						updatedUserData.images?.length > 0 && updatedUserData.images[0]?.image
							? updatedUserData.images[0]?.image
							: 'blank-profile-image.png'
					)
				})
				dispatch(updateUserData(updatedUserData))
			} catch (error) {
				if (error.response?.data?.error === "Invalid file type, try uploading a '.jpg', '.jpeg' or a '.png' file")
					console.log(setErrorMessage(error.response?.data?.error))
				console.log(error)
			} finally {
				setIsAvatarButtonLoading(false)
			}
		}
	}

	const updateProfile = async (data) => {
		console.log(data)
		// await axios.post(
		// 	process.enc.REACT_APP_SERVER_HOSTNAME + '/update_profile',
		// )
	}

	return (
		useSelector(state => state.loading.value) === false
			? <CardThemeBackground imgLink={IMGvikings2} >
				<div className={avatarStyles.changeImageContainer}>
					{editingMode === true &&
						<div className={avatarStyles.uploadIconContainer} >
							<label className={avatarStyles.uploadIconBackground} onChange={updateImage} htmlFor='imgUpload' >
								{isAvatarButtonLoading === true
									? <ReactLoading className={avatarStyles.uploadIcon} type='spin' />
									: <AiOutlineFileImage className={avatarStyles.uploadIcon} />
								}
								<input hidden id='imgUpload' type='file' />
							</label>
						</div>
					}
					<img className={avatarStyles.userAvatarImg} src={userInfo.image} alt='userImg' onError={() => { console.log('errrrrrrr') }} />
				</div>
{/****************************************************************************---------------------------------------------------------------*/}
				{editingMode === false
					? <>
						<h1 className={styles.firstLastName}>{userInfo.fullName}</h1>
						<div>
							<div className={styles.row} >
								<h1 className={styles.icon}>@</h1>
								<h1 className={styles.userData} >{userInfo.username}</h1>
							</div>
							<div className='mt-[15px]' />
							<div className={styles.row} >
								<FaBirthdayCake className={styles.icon} />
								<h1 className={styles.userData} >{userInfo.birthday}</h1>
							</div>
							<div className='mt-[20px]' />
							<div className={styles.row} >
								<FaGenderless className={styles.icon} />
								<h1 className={styles.userData}>{t(userInfo.gender)}</h1>
							</div>
						</div>
						{userInfo.isEditable === true
							&& <>
								<div className='mt-[20px]' />
								<button className={styles.editButton} onClick={() => { setEditingMode(true) }} >
									<p>{t('edit')}</p>
									<BiEditAlt className={`text-[40px]`} />
								</button>
							</>}
					</>
					: <form onSubmit={handleSubmit(updateProfile)} className={styles.updateForm} >
						<label>
							<p>{t('first_name')}</p>
							<input {...register('firstName')} placeholder={t('your') + t('first_name')} />
							<h1>{errors.firstName?.message || ' '} </h1>
						</label>
						<label>
							<p>{t('last_name')}</p>
							<input {...register('lastName')} placeholder={t('your') + t('last_name')} />
							<h1>{errors.lastName?.message ? errors.lastName?.message : ' '} </h1>
						</label>
						<label>
							<p>{t('birthday')}</p>
							<input {...register('birthday')} type='date' />
						</label>
						<div className='mt-[20px]' />
						<div className='flex w-full' >
							<button className={styles.cancelButton} onClick={() => { setEditingMode(true) }} >
								<p>{t('cancel')}</p>
								<IoClose className={`text-[40px]`} />
							</button>
							<button className={styles.editButton} onClick={() => { setEditingMode(true) }} >
								<p>{t('save')}</p>
								<GoCheck className={`text-[40px]`} />
							</button>
						</div>
					</form>

				}
			</CardThemeBackground>
			: <div />
	)
}

export default User


/*
	let avatarImage = process.env.REACT_APP_SERVER_HOSTNAME + '/images/'
		+ ((user.userData.images[0]?.image) || 'blank-profile-image.png')

*/