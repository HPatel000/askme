import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import QuestionItem from './QuestionItem';
import QuestionContext from '../../context/question/queContext';
import Spinner from '../layout/Spinner';

const Questions = () => {
  const queContext = useContext(QuestionContext);

  const { questions, filtered, getQuestion, loading } = queContext;

  useEffect(() => {
    getQuestion();
    // eslint-disable-next-line
  }, []);

  if (questions !== null && questions.length === 0 && !loading) {
    return <h4> please ask your Question</h4>
  }

  return (
    <Fragment>
      {(questions !== null && !loading)
        ? (
          <TransitionGroup>
            {filtered !== null
              ? filtered.map(question =>
                <CSSTransition key={question._id} timeout={500} classNames='item'>
                  <QuestionItem question={question} />
                </CSSTransition>)
              : questions.map(question =>
                <CSSTransition key={question._id} timeout={500} classNames='item'>
                  <QuestionItem question={question} />
                </CSSTransition>
              )}
          </TransitionGroup>)
        : <Spinner />}
    </Fragment>
  )
}

export default Questions;
