import React from 'react'
import './styles/Navbar.css'
import { BiMenuAltRight } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { openSidebar } from '../redux/sidebar'
import LanguagesDropdown from './LanguagesDropdown.js'
import { useTranslation } from 'react-i18next'
import hypertubeLogo from '../images/hypertube_logo.png'
import IMGarrmani88 from '../images/arrmani88.jpeg'

const NavbarUserLoggedIn = () => {
	const dispatch = useDispatch()

	return (
		<div className='navbarContainer'>
			<div className='balanceEmptyDivAvatar' />
			<div className='navbarSections'>
				<h1 className='sectionNavbar'>About</h1>
				<div className='sectionSpaceEmptyDiv' />
				<h1 className='sectionNavbar'>Trailer</h1>
				<img onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='logo' src={hypertubeLogo} alt={'logo'} />
				<h1 className='sectionNavbar'>Actors</h1>
				<h1 className='sectionNavbar'>Settings</h1>
			</div>
			<img className='avatarUserNavbar' src={IMGarrmani88} alt='userImg' />
			<BiMenuAltRight onClick={() => dispatch(openSidebar())} className='menuIcon'></BiMenuAltRight>
		</div>
	)
}

const NavbarUserUnlogged = (props) => {
	const { t } = useTranslation()

	return (
		<div className='navbarUserUnlogged'>
			<div className='navbarContainer'>
				<img className='logo' src={hypertubeLogo} alt={'logo'} />
				<div className='languagesAndLogin'>
					<LanguagesDropdown />
					{props.loginButtonHidden === true
						? <div />
						: <button className='loginButton'>
						<h1 className='loginText'>{t('login')}</h1>
					</button>}
				</div>
			</div>
		</div>
	)
}

export { NavbarUserLoggedIn, NavbarUserUnlogged }
