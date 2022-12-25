import React from 'react'
import styles from './styles/RedButton.module.css'

const RedButton = ({onClick, icon, text}) => {
	return (
		<button onClick={onClick} className={styles.button} >
			<h1>{text}</h1>
			{icon}
		</button>
	)
}

export default RedButton
