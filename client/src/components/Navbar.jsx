import React from 'react'

const Navbar = () => {
  return (
    <div className="flex items-start justify-between p-4 z-10 w-full absolute">
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>HYPERTUBE</h1>
        <div>
            <button className='text-white pr-4'>Sign in</button>
            <button className="bg-red-600 py-2 px-6 rounded cursor-pointer text-white">Sign up</button>
        </div>
    </div>
  )
}

export default Navbar
