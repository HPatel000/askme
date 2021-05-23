import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import Fab from '@material-ui/core/Fab'
import AnswerContext from '../../context/answer/answerContext'

const AnswerForm = ({ questionId }) => {
  const answerContext = useContext(AnswerContext)
  const { addAnswer, current, clearCurrent, updateAnswer } = answerContext

  const [isExpanded, setExpanded] = useState(false)

  useEffect(() => {
    if (current !== null) {
      setAnswer(current)
    } else {
      setAnswer({
        ans: '',
      })
    }
  }, [answerContext, current])

  const [answer, setAnswer] = useState({
    ans: '',
  })

  const { ans } = answer

  const onChange = e =>
    setAnswer({ ...answer, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if (current === null) {
      addAnswer(answer, questionId)
    } else {
      updateAnswer(answer)
    }
    clearCurrent()
    setAnswer({
      ans: '',
    })
  }

  return (
    <form className='create-que' onSubmit={onSubmit}>
      <textarea
        name='ans'
        onFocus={() => setExpanded(true)}
        onChange={onChange}
        value={ans}
        placeholder={current ? 'Edit Answer...' : 'Add Answer...'}
        rows={isExpanded ? 5 : 1}
      />
      <Fab type='Submit' onClick={onSubmit}>
        {current ? <EditIcon /> : <AddIcon />}
      </Fab>
    </form>
  )
}

AnswerForm.propTypes = {
  questionId: PropTypes.string.isRequired,
}

export default AnswerForm
