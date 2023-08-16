import './Navigation.css'
import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <div className='nav-bar'>
        <Link to='/'><h3>Scanner</h3></Link>
        <Link to='/carga'><h3>Stock</h3></Link>
    </div>
  )
}

export default Navigation
