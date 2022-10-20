import React from 'react'
import './styles/Landing.css'
import { BsPlayFill } from 'react-icons/bs'
import { NavbarUserUnlogged } from '../components/Navbar'
import Divider from '../components/Divider'

const Landing = () => {
	return (
	<>
		<NavbarUserUnlogged />
		<div className='container'>
			<img className='backgroundImage' src='images/movies.jpeg' alt='bgr_img' />
			<div className='gradient' />
			<div className='card'>
				<h1 className='cardTitle'>See what's next!</h1>
				<h1 className='cardText1'>Watch limitless anytime, anywhere...</h1>
				<h1 className='cardText2'>Ready to watch? Enter your email to create or restart your membership.</h1>
				<div>
					<input className='emailField' type='text' />
					<button className='cardButton'>
						<h1 className='buttonText'>START WATCHING FOR FREE</h1>
						<BsPlayFill className='cardPlayIcon' />
					</button>
					<Divider>
						<h1>-----------------------------</h1>
					</Divider>
				</div>
			</div>
		</div>
	</>
	)
}

export default Landing
