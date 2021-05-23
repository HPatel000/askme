import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'

const Register = props => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { register, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
    if (error === 'User already exists') {
      setAlert(error, 'danger')
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fileds', 'danger')
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger')
    } else {
      register({
        name,
        email,
        password,
      })
    }
  }

  return (
    <div className='userForm'>
      <h1>
        <QuestionAnswerIcon className='mainIcon' /> Ask ME !{' '}
        <span>Register</span>
      </h1>
      <br />
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>User Name </label>
        <br />
        <input
          type='text'
          name='name'
          value={name}
          onChange={onChange}
          required
          placeholder='ABC'
          autoComplete='off'
        />
        <br />
        <label htmlFor='email'>Email Address</label>
        <br />
        <input
          type='email'
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
        <input
          type='password'
          name='password'
          value={password}
          onChange={onChange}
          required
          minLength='6'
          placeholder='********'
        />
        <br />
        <label htmlFor='password2'>Confirm Password</label>
        <br />
        <input
          type='password'
          name='password2'
          value={password2}
          onChange={onChange}
          required
          minLength='6'
          placeholder='********'
        />
        <br />
        <button type='submit'>Register</button>
      </form>
      <h3>Already have an account ? </h3>
      <Link className='redirectLink' to='/login'>
        Log In
      </Link>
    </div>
  )
}

export default Register
