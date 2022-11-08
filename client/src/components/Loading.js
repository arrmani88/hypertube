import React from 'react'
import styles from './styles/Loading.module.scss'
import hypertubeLogo from '../images/hypertube_logo.png'

const Loading = () => {
	return (<>
		<div className={styles.loading} >
			<div className={styles.content}>
				<img className={styles.logo} src={hypertubeLogo} alt='logo' />
				<div className={styles.wrapper} >
					<div className={styles.blurLayer} />
				</div>
			</div>
		</div>
	</>)
}

export default Loading
