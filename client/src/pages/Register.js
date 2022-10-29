import React from 'react'
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
	password: 		yup.string().required('Required field').min(6, passwordLengthMessage).max(20, passwordLengthMessage),
	confirmPassword: yup.string().required('Required field').oneOf([yup.ref('password')], "Passwords should match")
}).required()

const Register = () => {
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
							<p className={styles.label}>{t('e_mail')}-mail</p>
							<input {...register('email')} placeholder='Your E-mail' />
							<h1>{errors.email?.message || ' '}</h1>
						</label>
						<label>
							<p className={styles.label}>{t('birthday')}</p>
							<input {...register('birthday')} placeholder='Your birthday' />
							<h1>{errors.birthday?.message || ' '}</h1>
						</label>
						<label>
							<p className={styles.label}>{t('gender')}</p>
							<input {...register('gender')} placeholder='Your gender' />
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
						<button type='submit' className={styles.submitButton}>
							<p>Register</p>
							<BsPlayFill className={`text-[40px]`} />
						</button>
					</form>
				</div>
			</div>
		</div>
	</>)
}

export default Register
