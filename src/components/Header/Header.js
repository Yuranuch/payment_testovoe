import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
      <div className='header-inner'>
        <Link to='/'>
          Payment
          <br /> System
        </Link>

        <div className='support'>
          Support service<span>+(375) 29 88 22 88</span>
        </div>
      </div>
    </div>
  )
}

export default Header
