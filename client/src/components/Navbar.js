import React from 'react'
import './styles/Navbar.css'
import { BiMenuAltRight } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { openSidebar } from '../redux/sidebarSlice'
import LanguagesDropdown from './LanguagesDropdown.js'
import { useTranslation } from 'react-i18next'
import hypertubeLogo from '../images/hypertube_logo.png'
import { Navigate, useNavigate } from 'react-router-dom'
import { selectUser, setUserLoggedOut } from '../redux/userSlice'

const NavbarUserLoggedIn = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	let avatarImg = process.env.REACT_APP_SERVER_HOSTNAME + '/images/' + (
		user.userData.images?.length > 0  && user.userData.images[0]?.image
			? user.userData.images[0]?.image 
			: 'blank-profile-image.png'
	)
	
	return (
		<div className='navbarContainer'>
			{/* <div className='balanceEmptyDivAvatar' /> */}
			<div className='leftLanguagesDropdown' ><LanguagesDropdown /></div>
			<div className='navbarSections'>
				<h1 onClick={() => {navigate('/search-movies')}} className='sectionNavbar'>{t('search')}</h1>
				<h1 onClick={() => {navigate('/search-users')}} className='sectionNavbar'>{t('users')}</h1>
				<img onClick={() => {navigate('/')}} className='logo' src={hypertubeLogo} alt={'logo'} />
				<h1 className='sectionNavbar'>Actors</h1>
				<h1 className='sectionNavbar'>{t('log_out')}</h1>
			</div>
			<img className='avatarUserNavbar' src={avatarImg} alt='userImg' />
			<div className='rightButtonsContainer' >
				<div className='rightLanguagesDropdown' ><LanguagesDropdown /></div>
				<BiMenuAltRight onClick={() => dispatch(openSidebar())} className='menuIcon'></BiMenuAltRight>
			</div>
		</div>
	)
}

const NavbarUserUnlogged = (props) => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const logOut = () => {
		dispatch(setUserLoggedOut())
		localStorage.removeItem('accessToken')
	}

	return (
		<div className='navbarUserUnlogged'>
			<div className='navbarContainer'>
				<img className='logo' src={hypertubeLogo} alt={'logo'} />
				<div className='languagesAndLogin'>
					<LanguagesDropdown />
					{props.loginButtonShown === true
						&& <button onClick={() => { navigate('/login') }} className='loginButton'>
							<h1 className='loginText'>{t('login')}</h1>
						</button>
					}
					{props.registerButtonShown === true
						&& <button onClick={() => { navigate('/register') }} className='loginButton'>
							<h1 className='loginText'>{t('register')}</h1>
						</button>
					}
				</div>
			</div>
		</div>
	)
}

export { NavbarUserLoggedIn, NavbarUserUnlogged }

// () => window.scrollTo({ top: 0, behavior: 'smooth' })

	