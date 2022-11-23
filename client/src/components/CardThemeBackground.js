import React from 'react'
import { NavbarUserUnlogged } from './Navbar'
import styles from './styles/CardThemeBackground.module.css'

const CardThemeBackground = ({children, imgLink, loginButtonShown, registerButtonShown, logOutButtonShown}) => {
	return (<>
		<NavbarUserUnlogged loginButtonShown={loginButtonShown} registerButtonShown={registerButtonShown} logOutButtonShown={logOutButtonShown} />
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