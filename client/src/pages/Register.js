import React, { useState } from 'react'
import { NavbarUserUnlogged } from '../components/Navbar'
import styles from './styles/Register.module.css'
import * as yup from 'yup'

const userSchema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().min(6).max(20).required(),
})

const Register = () => {

	const handleSubmit = (e) => {
		e.preventDefault()
		let registrationInput = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		}
	}

	return (
		<>
			<NavbarUserUnlogged />
			<div className={styles.register}>
				<img className={styles.background_img} src='images/dark.jpeg' alt='bgr_img' />
				<div className={styles.gradient} />
				<div className={styles.card}>
					<div className={styles.cardChildren}>
						<form onSubmit={handleSubmit} className={styles.register_form} >
						<label>
								<p>First name</p>
								<input name='firstName' placeholder='Your first name' />
								<div />
							</label>
							<label>
								<p>Last name</p>
								<input name='lastName' placeholder='Your first name' />
								<div />
							</label>
							<label>
								<p>E-mail</p>
								<input name='email' placeholder='Your E-mail' />
								<div />
							</label>
							<label>
								<p>Birthday</p>
								<input name='birthday' placeholder='Your birthday' />
								<div />
							</label>
							<label>
								<p>Gender</p>
								<input name='gender' placeholder='Your gender' />
								<div />
							</label>
							<label>
								<p>New password</p>
								<input placeholder='Your New password' />
								<div />
							</label>
							<label>
								<p>Confirm password</p>
								<input name='password' placeholder='Re-type your password' />
								<div />
							</label>
							<input type='submit' />
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default Register
