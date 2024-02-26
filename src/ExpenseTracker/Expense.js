import React from 'react'
import './Expense.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Expense() {
    const id = localStorage.getItem('login')
    const Navigate = useNavigate()
  return (
    <div className='nav'>
        welcome to Expense Tracker
      <div className='profile'>
        your profile is incomplere<Link to='/user'>Complete Now</Link>
  
      </div>
      <button onClick={()=>{
        localStorage.clear('login')
        Navigate('/')}}>Loggout</button>
    </div>
  )
}

export default Expense