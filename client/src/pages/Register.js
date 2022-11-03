import React, { useState } from 'react'
import { NavbarUserUnlogged } from '../components/Navbar'
import styles from './styles/Register.module.css'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { kFirstNameRegex, kUsernameRegex } from '../constants/regex'
import { BsPlayFill } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import ReactLoading from 'react-loading'

const usernameMessageLength = 'Username should be 3 to 20 characters'
const usernameContentMessage = "Username can only contain letters, numbers, '.' and '_'"
const passwordLengthMessage = 'Password should be between 6 and 20 characters'

const Register = () => {
	const navigate = useNavigate()
	const [gender, setGender] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [searchParams] = useSearchParams()
	const { t } = useTranslation()
	const userSchema = yup.object({
		firstName: 		yup.string().required(t('required_field')).matches(kFirstNameRegex, 'Invalid first name'),
		lastName: 		yup.string().required(t('required_field')).matches(kFirstNameRegex, 'Invalid last name'),
		email: 			yup.string().required(t('required_field')).email('Invalid email address'),
		username: 		yup.string().required(t('required_field')).min(3, usernameMessageLength).max(20, usernameMessageLength).matches(kUsernameRegex, usernameContentMessage),
		birthday: 		yup.string().required(t('required_field')),
		gender:			yup.string().required(t('required_field')),
		password: 		yup.string().required(t('required_field')).min(6, passwordLengthMessage).max(20, passwordLengthMessage),
		confirmPassword: yup.string().required(t('required_field')).oneOf([yup.ref('password')], "Passwords should match")
	}).required()
	const { register, handleSubmit, formState: { errors }, setValue } = useForm({
		resolver: yupResolver(userSchema)
	})
	const chooseGender = (userGender) => {
		setGender(userGender)
		setValue('gender', userGender)
	}
	const submitForm = async (registrationData) => {
		console.log(registrationData)
		try {
			setIsLoading(true)
			const rsp = await axios.post(
				process.env.REACT_APP_SERVERHOSTNAME + '/register',
				registrationData,
			)
			navigate({ pathname: '/verify_your_account' })
		} catch (err) {
			console.log(err)
		}
		setIsLoading(false)
	}
	
	return (<>
		<NavbarUserUnlogged />
		<div className={styles.register}>
			<img className={styles.background_img} src='images/dark.jpeg' alt='bgr_img' />
			<div className={styles.gradient} />
			<div className={styles.card}>
				<div className={styles.cardChildren}>
					<form onSubmit={handleSubmit(submitForm)} className={styles.register_form} >
						<label>
							<p className={styles.label}>{t('first_name')}</p>
							<input {...register('firstName')} placeholder={t('your') + t('first_name')} />
							<h1>{errors.firstName?.message || ' '} </h1>
						</label>
						<label>
							<p className={styles.label}>{t('last_name')}</p>
							<input {...register('lastName')} placeholder={t('your') + t('last_name')} />
							<h1>{errors.lastName?.message ? errors.lastName?.message : ' '} </h1>
						</label>
						<label>
							<p className={styles.label}>{t('username')}</p>
							<input {...register('username')} placeholder={t('your') + t('username')} />
							<h1>{errors.username?.message ? errors.username?.message : ' '} </h1>
						</label>
						<label>
							<p className={styles.label}>{t('e_mail')}</p>
							<input {...register('email')} defaultValue={searchParams.get('email') || ''}  placeholder={t('your') + t('e_mail')} />
							<h1>{errors.email?.message || ' '}</h1>
						</label>
						<label>
							<p className={styles.label}>{t('birthday')}</p>
							<input {...register('birthday')} type='date' />
							<h1>{errors.birthday?.message || ' '}</h1>
						</label>
						<label>
							<div className={styles.gender}>
								<p className={styles.label}>{t('gender')}</p>
								<div className={styles.avatarsContainer} >
									<input {...register('gender')} type='hidden' />
									<img onClick={() => chooseGender('female')} className={styles.avatar + ' ' + (gender === 'female' && styles.selectedAvatar)} src='images/woman-avatar.svg' alt='man-avatar' />
									<img onClick={() => chooseGender('male')} className={styles.avatar + ' ' + (gender === 'male' && styles.selectedAvatar)} src='images/man-avatar.svg' alt='man-avatar' />
								</div>
							</div>
							<h1>{(gender === '' && errors.gender?.message) || ' '}</h1>
						</label>
						<label>
							<p className={styles.label}>{t('new_password')}</p>
							<input {...register('password')} placeholder={t('your') + t('new_password')} />
							<h1>{errors.password?.message || ' '}</h1>
						</label>
						<label>
							<p className={styles.label}>{t('confirm_password')}</p>
							<input {...register('confirmPassword')} placeholder={t('retype_password')} />
							<h1>{errors.confirmPassword?.message || ' '}</h1>
						</label>
						<button type='submit' className={styles.submitButton}>
							<p>{t('register')}</p>
							{isLoading === true
								? <ReactLoading type='spin' className='p-3' />
								: <BsPlayFill className={`text-[40px]`} />
							}
						</button>
					</form>
				</div>
			</div>
		</div>
	</>)
}

export default Register
