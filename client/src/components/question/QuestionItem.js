import React, { useContext, useState, Fragment } from 'react'
import Answers from '../answer/Answers'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import PropTypes from 'prop-types'
import QuestionContext from '../../context/question/queContext'
import AuthContext from '../../context/auth/authContext'

const QuestionItem = ({ question }) => {
  const questionContext = useContext(QuestionContext)
  const { deleteQuestion, setCurrent, clearCurrent } = questionContext

  const authContext = useContext(AuthContext)
  const { user } = authContext

  const [toggleAns, settoggleAns] = useState('displayNone')

  function ToggleAns() {
    toggleAns === 'displayNone'
      ? settoggleAns('displayBlock')
      : settoggleAns('displayNone')
  }

  const { que, _id } = question

  const onDelete = () => {
    deleteQuestion(_id)
    clearCurrent()
  }

  return (
    <div className='question'>
      <p>{que}</p>
      {toggleAns === 'displayBlock' && (
        <div className={toggleAns}>
          <Answers queId={question._id} />
        </div>
      )}
      {user && user._id === question.user ? (
        <Fragment>
          <button className='floatRight' onClick={onDelete}>
            <DeleteIcon />
          </button>
          <button className='floatRight' onClick={() => setCurrent(question)}>
            <EditIcon />
          </button>
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
      <button className='floatLeft' onClick={ToggleAns}>
        Answer
      </button>
    </div>
  )
}

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
}

export default QuestionItem
