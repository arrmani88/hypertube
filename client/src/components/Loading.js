import React from 'react'
import styles from './styles/Loading.module.scss'
import blackHypertubeLogo from '../images/black_hypertube_logo.png'

const Loading = (props) => {

	return (
		<>
			{props.isLoading === true
				? <div className='flex' >
					{props.children}
					<div className={styles.loading} >
						<div className={styles.content}>
							<img className={styles.logo} src={blackHypertubeLogo} alt='logo' />
							<div className={styles.blurLayer1} />
						</div>
					</div>

				</div>
				: props.children
			}
		</>
	)
}

export default Loading
