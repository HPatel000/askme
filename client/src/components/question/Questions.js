import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import QuestionItem from './QuestionItem'
import QuestionContext from '../../context/question/queContext'
import Spinner from '../layout/Spinner'
import QuestionFilter from './QuestionFilter'

const Questions = () => {
  const queContext = useContext(QuestionContext)
  const { allQuestions, filtered, getAllQuestion, loading } = queContext

  useEffect(() => {
    getAllQuestion()
    // eslint-disable-next-line
  }, [])

  if (allQuestions !== null && allQuestions.length === 0 && !loading) {
    return <h3 className='noQue'> There is no Question !</h3>
  }

  return (
    <Fragment>
      <QuestionFilter />
      {allQuestions !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(question => (
                <CSSTransition
                  key={question._id}
                  timeout={500}
                  classNames='item'
                >
                  <QuestionItem question={question} />
                </CSSTransition>
              ))
            : allQuestions.map(question => (
                <CSSTransition
                  key={question._id}
                  timeout={500}
                  classNames='item'
                >
                  <QuestionItem question={question} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  )
}

export default Questions
