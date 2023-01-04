import { US, DE, DK, ES, IT, NO, SE } from 'country-flag-icons/react/3x2'
import React from 'react'
import './styles/LanguagesDropdown.css'
import { useState, useRef, useEffect } from 'react'
import i18n from "i18next";

const languages = [
	{ code: 'en', component: <US className='dropdownFlag' /> },
	{ code: 'de', component: <DE className='dropdownFlag' /> },
	{ code: 'dk', component: <DK className='dropdownFlag' /> },
	{ code: 'es', component: <ES className='dropdownFlag' /> },
	{ code: 'it', component: <IT className='dropdownFlag' /> },
	{ code: 'no', component: <NO className='dropdownFlag' /> },
	{ code: 'se', component: <SE className='dropdownFlag' /> },
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

	const renderSwitch = (param) => {
		switch (param) {
			case 'en':
				return <US className='flag' />
			case 'de':
				return <DE className='flag' />
			case 'dk':
				return <DK className='flag' />
			case 'es':
				return <ES className='flag' />
			case 'it':
				return <IT className='flag' />
			case 'no':
				return <NO className='flag' />
			case 'se':
				return <SE className='flag' />
		}
	}

	return (
		<div className='languagesDropdown' onClick={() => setMenuState(!menuState)} ref={dropdownRef} >
			{renderSwitch(i18n.language)}
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

