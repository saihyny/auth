import React from 'react'
import './Expense.css'
import { Link } from 'react-router-dom'
function Expense() {
    const id = localStorage.getItem('login')
  return (
    <div className='nav'>
        welcome to Expense Tracker
      <div className='profile'>
        your profile is incomplere<Link to='/user'>Complete Now</Link>
       
      </div>
    </div>
  )
}

export default Expense