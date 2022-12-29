import React from 'react'
import { useTranslation } from 'react-i18next'
import './styles/RedButton.css'

const RedButton = ({onClick, icon, text, tailwind}) => {
	const { t } = useTranslation()

	return (
		<button onClick={onClick} className={'button ' + tailwind??''} >
			<h1>{t(text)}</h1>
			{icon}
		</button>
	)
}

export default RedButton
