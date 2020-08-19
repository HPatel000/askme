import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import AuthContext from '../../context/auth/authContext';
import QuestionContext from '../../context/question/queContext';
// import PersonIcon from '@material-ui/icons/Person';

function Header() {
  const authContext = useContext(AuthContext);
  const { logout, user, isAuthenticated } = authContext;

  const questionContext = useContext(QuestionContext);
  const { clearQuestions } = questionContext;

  const onLogout = () => {
    logout();
    clearQuestions();
  }

  const authLinks = (
    <Fragment>
      <h2 className='floatRight userName'>
        Hello, {user && user.name} <span role='img' aria-label='happy'>😄</span>
      </h2>
      {/* <Link className='headerLink' to='/profile'>
        <PersonIcon />
      </Link> */}
      {/* <Link className='headerLink' to='/contibuters'>
        Top Contibuters
    </Link> */}
      <a className='headerLink' onClick={onLogout} href='#!'>Logout</a>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <h2 className='floatRight userName'>
        Hello, there ! <span role='img' aria-label='happy'>😄</span>
      </h2>
      <Link className='headerLink' to='/register'>
        Register
    </Link>
      <Link className='headerLink' to='/login'>
        Log In
    </Link>
    </Fragment>
  );


  return <header>
    <svg viewBox='0 0 500 200' className='wavyBG'>
      <path d='M0, 70 C150, -40 500, 120 500, 10 L500, 00 L0, 0 Z' fill='#1b1b2f'></path>
    </svg>
    <h1> <QuestionAnswerIcon className='headerIcon' /> Ask Me !</h1>
    <p>
      Code & Crack
    </p>
    {isAuthenticated ? authLinks : guestLinks}
  </header>
}

export default Header;