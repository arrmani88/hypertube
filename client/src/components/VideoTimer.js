import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import GlitchText from 'react-glitch-effect/core/GlitchText';
import styles from '../pages/styles/Home.module.scss'

const VideoTimer = ({movies}) => {
	const [timeCounter, setTimeCounter] = useState()
	const isLoading = useSelector(state => state.loading.value)

	useEffect(() => {
		if (!isLoading) {
			const startDate = Date.now()
			const interval = setInterval(() => {
				setTimeCounter(Date.now() - startDate)
			}, 120)
			return () => clearInterval(interval)
		}
	}, [isLoading])

	return (
		<GlitchText component='h1' className={styles.vhsFont}>
			{(Math.floor(timeCounter / 1000 / 60 / 60 % 24)).toString().padStart(2, '0')}
			:{(Math.floor(timeCounter / 1000 / 60 % 60)).toString().padStart(2, '0')}
			:{(Math.floor(timeCounter / 1000 % 60)).toString().padStart(2, '0')}
			:{(timeCounter % 600).toString().padStart(3, '0')}
		</GlitchText>
	)
}

export default VideoTimer