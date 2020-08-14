import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import AuthContext from '../../context/auth/authContext';
import QuestionContext from '../../context/question/queContext';
import PersonIcon from '@material-ui/icons/Person';

function Header() {
  const authContext = useContext(AuthContext);
  const questionContext = useContext(QuestionContext);

  const { logout, user, isAuthenticated } = authContext;

  const { clearQuestions } = questionContext;

  const onLogout = () => {
    logout();
    clearQuestions();
  }

  const authLinks = (
    <Fragment>
      <h1 className='floatRight userName'>
        Hello, {user && user.name} 😄
    </h1>
      <Link className='headerLink' to='/profile'>
        <PersonIcon />
      </Link>
      <Link className='headerLink' to='/contibuters'>
        Top Contibuters
    </Link>
      <a className='headerLink' onClick={onLogout} href='#!'>Logout</a>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link className='headerLink' to='/register'>
        Register
    </Link>
      <Link className='headerLink' to='/login'>
        Log In
    </Link>
    </Fragment>
  );


  return <header>
    <h1> <QuestionAnswerIcon className='headerIcon' /> Ask Me !</h1>
    <p>
      Code & Crack
    </p>
    {isAuthenticated ? authLinks : guestLinks}
  </header>
}

export default Header;