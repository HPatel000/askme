import React, { useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import AuthContext from '../../context/auth/authContext'
import QuestionContext from '../../context/question/queContext'

function Header() {
  const authContext = useContext(AuthContext)
  const { logout, user, isAuthenticated } = authContext

  const questionContext = useContext(QuestionContext)
  const { clearQuestions } = questionContext

  const onLogout = () => {
    logout()
    clearQuestions()
  }

  const authLinks = (
    <Fragment>
      <h2 className='floatRight userName'>
        Hello, {user && user.name}{' '}
        <span role='img' aria-label='happy'>
          😄
        </span>
      </h2>
      <a className='headerLink' onClick={onLogout} href='#!'>
        Logout
      </a>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <h2 className='floatRight userName'>
        Hello, there !{' '}
        <span role='img' aria-label='happy'>
          😄
        </span>
      </h2>
      <Link className='headerLink' to='/register'>
        Register
      </Link>
      <Link className='headerLink' to='/login'>
        Log In
      </Link>
    </Fragment>
  )

  return (
    <header>
      <svg viewBox='0 0 500 200' className='wavyBG'>
        <path
          d='M0, 150 C150, -30 500, 200 500, 10 L500, 00 L0, 0 Z'
          fill='#80bfff'
        ></path>
      </svg>
      <svg viewBox='0 0 600 200' className='wavyBG'>
        <path
          d='M0, 140 C150, -30 500, 190 500, 10 L500, 00 L0, 0 Z'
          fill='#66b3ff'
        ></path>
      </svg>
      <svg viewBox='0 0 700 200' className='wavyBG'>
        <path
          d='M0, 130 C150, -30 500, 180 500, 10 L500, 00 L0, 0 Z'
          fill='#3399ff'
        ></path>
      </svg>
      <svg viewBox='0 0 800 200' className='wavyBG'>
        <path
          d='M0, 120 C150, -30 500, 170 500, 10 L500, 00 L0, 0 Z'
          fill='#0080ff'
        ></path>
      </svg>
      <svg viewBox='0 0 900 200' className='wavyBG'>
        <path
          d='M0, 110 C150, -30 500, 160 500, 10 L500, 00 L0, 0 Z'
          fill='#0073e6'
        ></path>
      </svg>
      <svg viewBox='0 0 1000 200' className='wavyBG'>
        <path
          d='M0, 100 C150, -30 500, 150 500, 10 L500, 00 L0, 0 Z'
          fill='#0066cc'
        ></path>
      </svg>
      <svg viewBox='0 0 1100 200' className='wavyBG'>
        <path
          d='M0, 90 C150, -30 500, 140 500, 10 L500, 00 L0, 0 Z'
          fill='#0059b3'
        ></path>
      </svg>
      <svg viewBox='0 0 1200 200' className='wavyBG'>
        <path
          d='M0, 80 C150, -30 500, 130 500, 10 L500, 00 L0, 0 Z'
          fill='#004d99'
        ></path>
      </svg>
      <svg viewBox='0 0 1300 200' className='wavyBG'>
        <path
          d='M0, 70 C150, -30 500, 120 500, 10 L500, 00 L0, 0 Z'
          fill='#004080'
        ></path>
      </svg>
      <svg viewBox='0 0 1400 200' className='wavyBG'>
        <path
          d='M0, 60 C150, -30 500, 110 500, 10 L500, 00 L0, 0 Z'
          fill='#003366'
        ></path>
      </svg>
      <h1>
        {' '}
        <QuestionAnswerIcon className='headerIcon' /> Ask Me !
      </h1>
      <p>Code & Crack</p>
      {isAuthenticated ? authLinks : guestLinks}
    </header>
  )
}

export default Header
