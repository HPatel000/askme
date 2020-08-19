import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import AnswerItem from './AnswerItem';
import AnswerContext from '../../context/answer/answerContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';
import AnswerForm from './AnswerForm';
import AnswerFilter from './AnswerFilter';

const Answers = ({ queId }) => {
  let QueAnswers = null;

  const answerContext = useContext(AnswerContext);
  const { answers, filtered, getAnswers, loading } = answerContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;


  useEffect(() => {
    getAnswers(queId);
    // eslint-disable-next-line
  }, []);

  if (answers !== null && !loading && answers[`${queId}`] !== undefined) {
    if (answers[`${queId}`].length !== 0) {
      QueAnswers = answers[`${queId}`];
    } else {
      if (isAuthenticated)
        return <AnswerForm questionId={queId} />
      else
        return <Fragment><i>  No Answers Login to answer</i></Fragment>
    }
  }

  return (
    <Fragment>
      {(QueAnswers !== null && !loading)
        ? (<Fragment>
          {isAuthenticated ? <AnswerForm questionId={queId} /> : <Fragment></Fragment>}
          <AnswerFilter queId={queId} />
          <TransitionGroup>
            {filtered !== null
              ? filtered.map(answer =>
                <CSSTransition key={answer._id} timeout={500} classNames='item'>
                  <AnswerItem answer={answer} />
                </CSSTransition>)
              : QueAnswers.map(answer =>
                <CSSTransition key={answer._id} timeout={500} classNames='item'>
                  <AnswerItem answer={answer} />
                </CSSTransition>
              )}
          </TransitionGroup>
        </Fragment>)
        : <Spinner />}
    </Fragment>
  )
}

Answers.propTypes = {
  queId: PropTypes.string.isRequired,
}

export default Answers;