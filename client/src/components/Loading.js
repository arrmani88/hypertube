import React from 'react'
import styles from './styles/Loading.module.scss'
import blackHypertubeLogo from '../images/black_hypertube_logo.png'
import { useSelector } from 'react-redux'

const Loading = (props) => {
	const isLoading = useSelector((state) => state.loading.value)
	console.log('props.isLoading', isLoading)
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
			{props.children}
		</div>
	)

}

export default Loading


	// return (
	// 	<>
	// 		{isLoading === true
	// 			? <div className='flex' >
	// 				{props.children}
	// 				<div className={styles.loading} >
	// 					<div className={styles.content}>
	// 						<img className={styles.logo} src={blackHypertubeLogo} alt='logo' />
	// 						<div className={styles.blurLayer1} />
	// 					</div>
	// 				</div>

	// 			</div>
	// 			: props.children
	// 		}
	// 	</>
	// )