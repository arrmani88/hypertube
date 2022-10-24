import { useSelect } from 'react-aria'
import { US, ES, DE } from 'country-flag-icons/react/3x2'
import React from 'react'
import './styles/LanguagesDropDown.css'
import { useState } from 'react'

const LanguagesDropDown = () => {
	const [menuState, setMenuState] = useState(false)

	return (
		<div className='languagesDropDown' onClick={ () => setMenuState(!menuState) }>
			<US className='flag' />
			{menuState === true
				? <div className='dropdownMenu' >
				</div>
				: <div/>
			}

		</div>
	)
}

export default LanguagesDropDown
