import React from 'react'
import './styles/Navbar.css'
import { BiMenuAltRight } from 'react-icons/bi'

const Navbar = () => {
  return (
    <div className='navbarContainer'>

      <div className='middleSections'>
        <div className='balanceDivAvatar' />
        <h1 className='section'>About</h1>
        <h1 className='section'>Trailer</h1>
        <img onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className='logo' src='images/hypertube_logo.png' alt={'logo'} />
        <h1 className='section'>Actors</h1>
        <h1 className='section'>Settings</h1>
        <div className='balanceDivAvatar' />
      </div>
      
      <img className='avatarUser' src='images/arrmani88.jpeg' />
      <BiMenuAltRight className='menuIcon'></BiMenuAltRight>
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
// /goinfre/anel-bou/projects/hypertube/client/public/images/arrmani88.jpeg