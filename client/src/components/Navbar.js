import React, { useState } from 'react'
import './styles/Navbar.css'
import Drawer from '@mui/material/Drawer';
import { BiMenuAltRight } from 'react-icons/bi'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'


const SectionDrawer = (props) => {
  return (
	<div className='sectionDrawer'>					
		<MdChevronLeft className='sectionIcon'/>
		<h1>{props.title}</h1>
		<div className='sectionIcon'/>
	</div>
  )
}


const Navbar = () => {

	const [drawerState, setDrawerState] = useState(true)

	const changeDrawerState = () => setDrawerState(!drawerState)

	return (
		<div className='navbarContainer'>

			<div className='balanceEmptyDivAvatar' />
			<div className='navbarSections'>
				<h1 className='sectionNavbar'>About</h1>
				<div className='sectionSpaceEmptyDiv' />
				<h1 className='sectionNavbar'>Trailer</h1>
				<img onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='logo' src='images/hypertube_logo.png' alt={'logo'} />
				<h1 className='sectionNavbar'>Actors</h1>
				<h1 className='sectionNavbar'>Settings</h1>
			</div>

			<img className='avatarUserNavbar' src='images/arrmani88.jpeg' alt='userImg' />
			<BiMenuAltRight onClick={changeDrawerState} className='menuIcon'></BiMenuAltRight>
			<Drawer
				anchor='right'
				open={drawerState}
				variant='temporary'
				sx={{
					width: 250,
					flexShrink: 0,
          			'& .MuiDrawer-paper': {
            			width: 250,
					}
				}}
			>
				<div>
					<div className='drawerHeader'>
						<div className='drawerHeaderGradient' />
						<img className='avatarUserDrawer' src='images/arrmani88.jpeg' alt='userImg' />
						<h1 className='userFullName'>Anas EL BOUDALI</h1>
						<MdChevronRight onClick={changeDrawerState} className='mdChevronRight'/>
					</div>
				</div>
				<div>
					<SectionDrawer title='About' />
					<SectionDrawer title='Trailer' />
					<SectionDrawer title='About' />
					<SectionDrawer title='Settings' />
				</div>

			</Drawer>
		</div>
	)
}

// const Navbar = () => {
//   return (
//     <div className="flex items-start justify-between p-4 z-10 w-full absolute">
//         <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>HYPERTUBE</h1>
//         <div>
//             <button className='text-white pr-4'>Sign in</button>
//             <button className="bg-red-600 py-2 px-6 rounded cursor-pointer text-white">Sign up</button>
//         </div>
//     </div>
//   )
// }

export default Navbar


