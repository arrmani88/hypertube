import React, { useState } from 'react'
import { NavbarUserUnlogged } from '../components/Navbar'
import styles from './styles/Register.module.css'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import regex from '../constants/regex'
import { BsPlayFill } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'

const Register = () => {
	const [gender, setGender] = useState('')
	const { t } = useTranslation()
	const passwordLengthMessage = 'Password should be between 6 and 20 characters'
	const userSchema = yup.object({
		firstName: 		yup.string().required(t('required_field')).matches(regex.kFirstName, 'Invalid first name'),
		lastName: 		yup.string().required(t('required_field')).matches(regex.kFirstName, 'Invalid last name'),
		birthday: 		yup.string().required(t('required_field')),
		email: 			yup.string().required(t('required_field')).email('Invalid email address'),
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
							<input {...register('firstName')} placeholder={t('your') + t('first_name')} />
							<h1>{errors.firstName?.message || ' '} </h1>
						</label>
						<label>
							<p className={styles.label}>{t('last_name')}</p>
							<input {...register('lastName')} placeholder={t('your') + t('last_name')} />
							<h1>{errors.lastName?.message ? errors.lastName?.message : ' '} </h1>
						</label>
						<label>
							<p className={styles.label}>{t('e_mail')}</p>
							<input {...register('email')} placeholder={t('your') + t('e_mail')} />
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
							<BsPlayFill className={`text-[40px]`} />
						</button>
					</form>
				</div>
			</div>
		</div>
	</>)
}

export default Register
