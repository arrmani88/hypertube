import React, { useState, useRef, useEffect } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import Drawer from '@mui/material/Drawer';
import './styles/Drawer.css'


const Sections = [
	{ icon: <MdChevronLeft />, title: "About" },
	{ icon: <MdChevronLeft />, title: 'Trailer' },
	{ icon: <MdChevronLeft />, title: 'Actors' },
	{ icon: <MdChevronLeft />, title: 'Settings' }
]

const Drawer = () => {
	const DrawerRef = useRef(null)
	const [drawerState, setDrawerState] = useState(false)
	const changeDrawerState = () => setDrawerState(!drawerState)

	useEffect(() => {
		const SideBarClick = (e) => {
			if (DrawerRef.current && !DrawerRef.current.contains(e.target))
				setDrawerState(false)
		}
		document.addEventListener('click', SideBarClick, true)
		return () => document.removeEventListener('click', SideBarClick, true)
	}, [drawerState])

	return (
		<Drawer
			anchor='right'
			open={drawerState}
			variant='temporary'
		>
			<div ref={SideBarRef} style={{ height: '100%' }}>
				<div>
					<div className='drawerHeader'>
						<div className='drawerHeaderGradient' />
						<img className='avatarUserDrawer' src='images/arrmani88.jpeg' alt='userImg' />
						<h1 className='userFullName'>Anas EL BOUDALI</h1>
						<MdChevronRight onClick={changeDrawerState} className='mdChevronRight' />
					</div>
				</div>
				<div>
					{Sections.map((item, idx) => (
						<div className='sectionDrawer' key={idx} >
							{item.icon}
							<h1>{item.title}</h1>
							<div className='sectionIcon' />
						</div>
					))}
				</div>
			</div>
		</Drawer>
	)
}

export default Drawer