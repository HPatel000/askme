import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import AuthContext from '../../context/auth/authContext';
import QuestionContext from '../../context/question/queContext';
import PersonIcon from '@material-ui/icons/Person';

function Header() {
  const authContext = useContext(AuthContext);
  const questionContext = useContext(QuestionContext);

  const { logout, user } = authContext;

  const { clearQuestions } = questionContext;

  const onLogout = () => {
    logout();
    clearQuestions();
  }
  return <header>
    <h1> <QuestionAnswerIcon className='headerIcon' /> Ask Me !</h1>
    <p>
      Code & Crack
    </p>
    <h1 className='floatRight userName'>
      Hello, {user && user.name} !
    </h1>
    <Link className='headerLink' to='/profile'>
      <PersonIcon />
    </Link>
    <Link className='headerLink' to='/contibuters'>
      Top Contibuters
    </Link>
    <a className='headerLink' onClick={onLogout} href='#!'>Logout</a>
  </header>
}

export default Header;