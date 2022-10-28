import React from 'react'
import { NavbarUserUnlogged } from '../components/Navbar'
import styles from './styles/Register.module.css'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const userSchema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	birthday: yup.string().required(),
	email: yup.string().email('invalid email').required('invalid email'),
	password: yup.string().min(6).max(20).required(),
	confirmPassword: yup.string().oneOf([yup.ref('password'), null])
})

const Register = () => {
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(userSchema)
	})
	const submitForm = (registrationData) => {
		console.log('------------------------------')
		// sefat data hna
		console.log(registrationData)
	}

	return (<>
		<NavbarUserUnlogged />
		<div className={styles.register}>
			<img className={styles.background_img} src='images/dark.jpeg' alt='bgr_img' />
			<div className={styles.gradient} />
			<div className={styles.card}>
				<div className={styles.cardChildren}>
					<form onSubmit={(e, errors) => {
						e.preventDefault()
						console.log('>>>>>>>>>>>>>>>>')
						handleSubmit(submitForm)
						console.log(errors)
					}} className={styles.register_form} >
						{/* <label> */}
							<p>First name</p>
							<input {...register('firstName')} placeholder='Your first name' />
							<h1>{errors?.firstName?.message || 'valid'}</h1>
						{/* </label> */}
						{/* <label> */}
							<p>Last name</p>
							<input {...register('lastName')} placeholder='Your first name' />
							<h1>{errors?.lastName?.message || 'valid'}</h1>
						{/* </label> */}
						{/* <label> */}
							<p>E-mail</p>
							<input {...register('email')} placeholder='Your E-mail' />
							<h1>{errors?.email?.message || 'valid'}</h1>
						{/* </label> */}
						{/* <label> */}
							<p>Birthday</p>
							<input {...register('birthday')} placeholder='Your birthday' />
							<h1>{errors?.birthday?.message || 'valid'}</h1>
						{/* </label> */}
						{/* <label> */}
							{/* <p>Gender</p>
							<input {...register('gender')} placeholder='Your gender' />
							<h1>{errors?.gender?.message || 'valid'}</h1> */}
						{/* </label> */}
						{/* <label> */}
							<p>New password</p>
							<input {...register('password')} placeholder='Your New password' />
							<h1>{errors?.password?.message || 'valid'}</h1>
						{/* </label> */}
						{/* <label> */}
							<p>Confirm password</p>
							<input {...register('confirmPassword')} placeholder='Re-type your password' />
							<h1>{errors?.confirmPassword?.message || 'valid'}</h1>
						{/* </label> */}
						<input type='submit' value='done' className={styles.submitButton}/>
					</form>
				</div>
			</div>
		</div>
	</>)
}

export default Register
