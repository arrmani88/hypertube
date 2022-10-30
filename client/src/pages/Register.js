import React, { useState } from 'react'
import { NavbarUserUnlogged } from '../components/Navbar'
import styles from './styles/Register.module.css'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import regex from '../constants/regex'
import { BsPlayFill } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'

const passwordLengthMessage = 'Password should be between 6 and 20 characters'
const userSchema = yup.object({
	firstName: 		yup.string().required('Required field').matches(regex.kFirstName, 'Invalid first name'),
	lastName: 		yup.string().required('Required field').matches(regex.kFirstName, 'Invalid last name'),
	birthday: 		yup.string().required('Required field'),
	email: 			yup.string().required('Required field').email('Invalid email address'),
	gender:			yup.string().required('Required field'),
	password: 		yup.string().required('Required field').min(6, passwordLengthMessage).max(20, passwordLengthMessage),
	confirmPassword: yup.string().required('Required field').oneOf([yup.ref('password')], "Passwords should match")
}).required()

const Register = () => {
	const [gender, setGender] = useState('')
	const { t } = useTranslation()
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(userSchema)
	})
	const submitForm = (registrationData) => {
		console.log(registrationData)
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
							<input {...register('firstName')} placeholder='Your first name' />
							<h1>{errors.firstName?.message || ' '} </h1>
						</label>
						<label>
							<p className={styles.label}>{t('last_name')}</p>
							<input {...register('lastName')} placeholder='Your last name' />
							<h1>{errors.lastName?.message ? errors.lastName?.message : ' '} </h1>
						</label>
						<label>
							<p className={styles.label}>{t('e_mail')}</p>
							<input {...register('email')} placeholder='Your E-mail' />
							<h1>{errors.email?.message || ' '}</h1>
						</label>
						<label>
							<p className={styles.label}>{t('birthday')}</p>
							<input {...register('birthday')} type='date' />
							<h1>{errors.birthday?.message || ' '}</h1>
						</label>
						<label>
							<div className={styles.avatarsContainer} >
								<p className={styles.label}>{t('gender')}</p>
								<input {...register('gender')} type='hidden' />
								<img onClick={() => {setGender('female'); setValue('gender', gender)}} className={styles.avatar + ' ' + (gender === 'female' && styles.selectedAvatar)} src='images/woman-avatar.svg' alt='man-avatar' />
								<img onClick={() => {setGender('male'); setValue('gender', gender)}} className={styles.avatar + ' ' + (gender === 'male' && styles.selectedAvatar)} src='images/man-avatar.svg' alt='man-avatar' />
							</div>
							<h1>{errors.gender?.message || ' '}</h1>
						</label>
						<label>
							<p className={styles.label}>{t('new_password')}</p>
							<input {...register('password')} placeholder='Your New password' />
							<h1>{errors.password?.message || ' '}</h1>
						</label>
						<label>
							<p className={styles.label}>{t('confirm_password')}</p>
							<input {...register('confirmPassword')} placeholder='Re-type your password' />
							<h1>{errors.confirmPassword?.message || ' '}</h1>
						</label>
						<button type='submit' className={styles.submitButton} onClick={console.log('gender=' + gender)}>
							<p>{t('register')}</p>
							<BsPlayFill className={`text-[40px]`} />
						</button>
					</form>
				</div>
			</div>
		</div>
	</>)
}

export default Register
