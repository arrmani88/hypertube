import React from 'react'
import { useState, useRef, useEffect } from 'react'
import styles from './styles/DropDownMenu.module.css'
import { IoCloseCircle } from 'react-icons/io5'

const DropDownMenu = ({ childs, controller, keyName, className }) => {
	const [menuState, setMenuState] = useState(false)
	const dropdownRef = useRef(null)

	const changeGenre = (selectedItem) => {
		controller.setQueryParams({
			...controller.queryParams,
			 [keyName]: selectedItem
		})
	}
// console.log(controller.queryParams)

	useEffect(() => {
		let handleClick = (e) => {
			if (dropdownRef.current && !(dropdownRef.current.contains(e.target)))
				setMenuState(false)
		}
		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	})

	return (
		<div className={styles.container +' '+ className} onClick={() => setMenuState(!menuState)} ref={dropdownRef} >
			<div className={styles.dropdownButton} >
				<h1 className={controller.queryParams[keyName] ? '' : 'font-bold'}>
					{controller.queryParams[keyName] ?? keyName }
				</h1>
			</div>

			<div className={styles.dropdownMenu +' '+ (menuState ? styles.shown : styles.hidden)} >

				<div className='flex row items-center font-bold mb-[8px] cursor-pointer' >
					<div className={styles.item} onClick={() => { changeGenre(null) }} >
						Deselect
					</div>
					<IoCloseCircle className='pb-[2px]' />
				</div>

				{childs.map((item) => (
					<div className='w-full mt-[3px]' key={item}>
						<div className={styles.item} onClick={() => { changeGenre(item) }} >
							{item}
						</div>
						{childs[childs.length - 1] !== item && <div className={styles.divider} />}
					</div>
				))}

			</div>
		</div>
	)
}

export default DropDownMenu

