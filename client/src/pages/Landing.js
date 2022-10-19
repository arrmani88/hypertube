import React from 'react'
import './styles/Landing.css'
import { BsPlayFill } from 'react-icons/bs'
import { NavbarUserUnlogged } from '../components/Navbar'

const Landing = () => {
  return (
	<>
		<NavbarUserUnlogged />
		<div className='container'>
			<img className='backgroundImage' src='images/movies.jpeg' alt='bgr_img'/>
			<div className='gradient'/>
			<div className='card'>
				<h1 className='cardTitle'>See what's next</h1>
				<h1 className='cardDescription'>Watch limitless anytime, anywhere</h1>
				<button className='cardButton'>
					<h1 className='buttonText'>START WATCHING FOR FREE</h1>
					<BsPlayFill className='cardPlayIcon'/>
				</button>
			</div>
		</div>
	</>
  )
}

export default Landing
