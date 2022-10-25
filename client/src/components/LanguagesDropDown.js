import { US, ES, DE } from 'country-flag-icons/react/3x2'
import React from 'react'
import './styles/LanguagesDropdown.css'
import { useState, useRef, useEffect } from 'react'

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
			<US className='flag' />
			<div className={`dropdownMenu ${menuState ? 'shown' : 'hidden'}`} >
				<US className='dropdownFlag' />
				<ES className='dropdownFlag' />
				<DE className='dropdownFlag' />
			</div>
		</div>
	)
}

export default LanguagesDropdown
