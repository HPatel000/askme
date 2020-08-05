import React from 'react';
import { Link } from 'react-router-dom';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

function Home() {

  return (
    <div className='homePage'>
      <h1><QuestionAnswerIcon className='mainIcon' /> Ask ME !</h1>
      <p>Ask Your Programming Questions to Our large community and get solution ASAP!</p>
      <hr className='hrLine' />
      <Link className='register redirectLink' to='/register'>Register</Link>
      <Link className='logIn redirectLink' to='/login'>Log In</Link>

    </div>
  );
}

export default Home;