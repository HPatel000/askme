import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill int fields', 'danger')
    } else {
      login({
        email,
        password
      });
    }
  }

  return (
    <div className='userForm'>
      <h1><QuestionAnswerIcon className='mainIcon' /> Ask ME ! <span>Log In</span></h1>
      <form onSubmit={onSubmit}>
        <br />
        <label htmlFor='email'>Email </label>
        <br />
        <input type='email'
          name='email'
          value={email}
          onChange={onChange}
          required
          placeholder='abc@email.com'
          autoComplete='off'
        />
        <br />
        <label htmlFor='password'>Password</label>
        <br />
        <input type='password'
          name='password'
          value={password}
          onChange={onChange}
          required
          placeholder='********'
        />
        <br />
        <button type='submit'>Log In</button>
      </form>
      <h3>Don't have an account ? </h3>
      <Link className='redirectLink' to='/register'>Register</Link>
    </div>
  )
}

export default Login;