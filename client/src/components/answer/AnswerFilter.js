import React, { useContext, useRef, useEffect } from 'react'
import AnswerContext from '../../context/answer/answerContext'

const AnswerFilter = ({ queId }) => {
  const answerContext = useContext(AnswerContext)
  const text = useRef('')

  const { filteredAnswers, clearFilter, filtered } = answerContext

  useEffect(() => {
    if (filtered === null) {
      text.current.value = ''
    }
  })

  const onChange = e => {
    if (text.current.value !== '') {
      filteredAnswers(e.target.value, queId)
    } else {
      clearFilter()
    }
  }
  return (
    <form className='filterForm'>
      <input
        ref={text}
        type='text'
        placeholder='Filter Answers...'
        onChange={onChange}
      />
    </form>
  )
}

export default AnswerFilter
