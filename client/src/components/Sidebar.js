import React, { useRef, useEffect } from 'react'
import { MdChevronRight } from 'react-icons/md'
import { HiOutlinePlay } from 'react-icons/hi'
import { RiClapperboardLine } from 'react-icons/ri'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { RiSettingsLine } from 'react-icons/ri'
import Drawer from '@mui/material/Drawer';
import './styles/SideBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar } from '../redux/sidebarSlice';
import { selectUser } from '../redux/userSlice'

const Sections = [
	{ icon: <AiOutlineInfoCircle className='sidebarIcon' />, title: "About" },
	{ icon: <HiOutlinePlay className='sidebarIcon' />, title: 'Trailer' },
	{ icon: <RiClapperboardLine className='sidebarIcon' />, title: 'Actors' },
	{ icon: <RiSettingsLine className='sidebarIcon' />, title: 'Settings' }
]

const SideBar = () => {
	const dispatch = useDispatch()
	const sidebarState = useSelector((state) => state.sidebar.value)
	const SidebarRef = useRef(null)
	const user = useSelector(selectUser)
	let userImage = process.env.REACT_APP_SERVER_HOSTNAME + '/images/'
		+ ((user.userData.images[0]?.image) || 'blank-profile-image.png')

	useEffect(() => { // added
		const SideBarClick = (e) => {
			if (SidebarRef.current && !SidebarRef.current.contains(e.target))
				dispatch(closeSidebar())
		}
		document.addEventListener('click', SideBarClick, true)
		return () => document.removeEventListener('click', SideBarClick, true)
	}, [sidebarState])

	return (
		<Drawer anchor='right' open={sidebarState} variant='temporary' >
			<div ref={SidebarRef} style={{ height: '100%' }}>
				<div>
					<div className='sidebarHeader'>
						<div className='sidebarHeaderGradient' />
						<img className='avatarUserSidebar' src={userImage} alt='userImg' />
						<h1 className='userFullName'>{user.userData.firstName + ' ' + user.userData.lastName}</h1>
						<MdChevronRight onClick={() => dispatch(closeSidebar())} className='mdChevronRight' />
					</div>
				</div>	
				<div>
					{Sections.map((item, idx) => (
						<div className='sectionSidebar' key={idx} >
							{item.icon}
							<h1 className='px-2'>{item.title}</h1>
							<div className='w-[25px]' />
						</div>
					))}
				</div>
			</div>
		</Drawer>
	)
}

export default SideBar