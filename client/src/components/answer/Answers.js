import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import AnswerItem from './AnswerItem';
import AnswerContext from '../../context/answer/answerContext';
import Spinner from '../layout/Spinner';
import AnswerForm from './AnswerForm';
import AnswerFilter from './AnswerFilter';

const Answers = ({ queId }) => {
  const answerContext = useContext(AnswerContext);

  const { answers, filtered, getAnswers, loading } = answerContext;
  let QueAnswers = null;


  useEffect(() => {
    getAnswers(queId);
    // eslint-disable-next-line
  }, []);

  if (answers !== null && !loading && answers[`${queId}`] !== undefined) {
    if (answers[`${queId}`].length !== 0) {
      QueAnswers = answers[`${queId}`];
    } else {
      return <AnswerForm questionId={queId} />
    }
  }

  return (
    <Fragment>
      {(QueAnswers !== null && !loading)
        ? (<Fragment>
          <AnswerForm questionId={queId} />
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
