import { US, DE } from 'country-flag-icons/react/3x2'
import React from 'react'
import './styles/LanguagesDropdown.css'
import { useState, useRef, useEffect } from 'react'
import i18n from "i18next";

const languages = [
	{ code: 'en', component: <US className='dropdownFlag' /> },
	{ code: 'de', component: <DE className='dropdownFlag' /> },
]

const LanguagesDropdown = () => {
	const [menuState, setMenuState] = useState(false)
	const dropdownRef = useRef(null)

	useEffect(() => {
		let handleClick = (e) => {
			if (dropdownRef.current && !(dropdownRef.current.contains(e.target)))
				setMenuState(false)
		}
		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	})

	return (
		<div className='languagesDropdown' onClick={() => setMenuState(!menuState)} ref={dropdownRef} >
			{(i18n.language === 'en' && <US className='flag' />) || <DE className='flag' />}
			<div className={`dropdownMenu ${menuState ? 'shown' : 'hidden'}`} >
				{languages.map((item, idx) => (
					i18n.language !== item.code &&
						<div onClick={() => i18n.changeLanguage(item.code)} key={idx}>
							{item.component}
						</div>
				))}
			</div>
		</div>
	)
}

export default LanguagesDropdown
