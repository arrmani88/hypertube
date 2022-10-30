import React from 'react'
import { NavbarUserUnlogged } from '../components/Navbar'
import styles from './styles/Login.module.css'

const Login = () => {
  return (
    <>
        <NavbarUserUnlogged />
        <div className={styles.login}>
            <img className={styles.background_img} src='images/national-treasure.jpg' alt='background_img'/>
            <div className={styles.gradient} />
            <div className={styles.card} >

            </div>

        </div>
    </>
  )
}

export default Login