import React from 'react'
import './styles/Landing.css'
import { BsFacebook, BsPlayFill } from 'react-icons/bs'
import { NavbarUserUnlogged } from '../components/Navbar'
import Divider from '../components/Divider'
import { ImGoogle3 } from 'react-icons/im'
import { useRef, useState } from 'react'

const Landing = () => {
	const emailRef = useRef(null)
	const [isEmailValid, setIsEmailValid] = useState(true)

	const click = () => {
		setIsEmailValid(Boolean(String(emailRef.current.value).toLowerCase()
			.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
		))
	}
	return (
	<>
		<NavbarUserUnlogged />
		<div className='container'>
			<img className='backgroundImage' src='images/movies.jpeg' alt='bgr_img' />
			<div className='gradient' />
			<div className='emptyBox'/>
			<div className='card'>
				<h1 className='cardTitle'>See what's next!</h1>
				<h1 className='cardText1'>Watch limitless anytime, anywhere...</h1>
				<h1 className='cardText2 hideOnMobileVersion'>Ready to watch? Enter your email to create or restart your membership.</h1>
				<div>
				{/* `emailField (${isEmailValid === false && 'emailFielError'})` */}
					<input className={`emailField ${isEmailValid === false && 'emailFieldError'}`} ref={emailRef} onChange={() => setIsEmailValid(true)} placeholder='Enter your Email' type='text' />
					<div className='containerInvalidEmail'>
						{isEmailValid === false
							? <h1 className='invalidEmail'>Invalid email address</h1>
							: <h1 className='invalidEmail'> </h1>
						}
					</div>
					<button className='cardButton' onClick={ click }>
						<h1 className='buttonText'>START WATCHING FOR FREE</h1>
						<BsPlayFill className='cardPlayIcon' />
					</button>
					<Divider><h1>Or</h1></Divider>
					<h1 className='cardText2'>Continue with:</h1>
					<div className='socialsContainer'>
						<BsFacebook className='socialMediaIcon' />
						<ImGoogle3 className='socialMediaIcon' />
						<img src='images/42_icon.png' className='icon42' alt='42_icon' />
					</div>
				</div>
			</div>
		</div>
	</>
	)
}

export default Landing
