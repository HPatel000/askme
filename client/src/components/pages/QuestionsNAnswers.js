import React, { useContext, useEffect, Fragment } from 'react';
import Header from '../layout/Header';
import Questions from '../question/Questions';
import QuestionForm from '../question/QuestionForm';
import QuestionFilter from '../question/QuestionFilter';
import AuthContext from '../../context/auth/authContext';

const QuestionsNAnswers = () => {

  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <Header />
      {isAuthenticated ? <QuestionForm /> : <Fragment></Fragment>}
      <QuestionFilter />
      <Questions />
    </Fragment>
  )
}


export default QuestionsNAnswers;