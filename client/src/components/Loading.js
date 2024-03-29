import React from 'react'
import styles from './styles/Loading.module.scss'
import blackHypertubeLogo from '../images/black_hypertube_logo.png'
import { useSelector } from 'react-redux'

const Loading = (props) => {
	const isLoading = useSelector((state) => state.loading.value)

	return (
		<div>
			{isLoading === true &&
				<div className={styles.loading} >
					<div className={styles.content}>
						<img className={styles.logo} src={blackHypertubeLogo} alt='logo' />
						<div className={styles.blurLayer1} />
					</div>
				</div>
			}
			<div className={isLoading === true ? 'hidden': ''} >
				{props.children}
			</div>
		</div>
	)

}

export default Loading
