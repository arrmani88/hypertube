import React from 'react'
import { NavbarUserLoggedIn, NavbarUserUnlogged } from './Navbar'
import styles from './styles/CardThemeBackground.module.css'

const CardThemeBackground = ({
		children,
		imgLink,
		loginButtonShown,
		registerButtonShown
	}) => {

	return (<>
		{loginButtonShown === true || registerButtonShown === true // means the user isn't logged cuz he needs to 
			? <NavbarUserUnlogged loginButtonShown={loginButtonShown} registerButtonShown={registerButtonShown} />
			: <NavbarUserLoggedIn />
		}
		<div className={styles.page} >
			<img className={styles.backgroundImg} src={imgLink} alt='background_img' />
			<div className={styles.gradient} />
			<div className={styles.card} >
				<div className={styles.cardContent} >
					{children}
				</div>
			</div>
		</div>
	</>)
}

export default CardThemeBackground