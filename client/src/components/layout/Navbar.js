import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import QuestionContext from '../../context/question/queContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const questionContext = useContext(QuestionContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearQuestions } = questionContext;

  const onLogout = () => {
    logout();
    clearQuestions();
  }

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li><a onClick={onLogout} href='#!'>Logout</a></li>
    </Fragment>
  )
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>LogIn</Link>
      </li>
    </Fragment>
  )
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} />{title}
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}

      </ul>
    </div>
  )
}


Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'
}
export default Navbar;
