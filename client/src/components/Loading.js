import React from 'react'
import styles from './styles/Loading.module.scss'
import blackHypertubeLogo from '../images/black_hypertube_logo.png'

const Loading = () => {
	return (<>
		<div className={styles.loading} >
			<div className={styles.content}>
				<img className={styles.logo} src={blackHypertubeLogo} alt='logo' />
				<div className={styles.blurLayer1} />
			</div>
		</div>
	</>)
}

export default Loading
