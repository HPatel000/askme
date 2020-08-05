import React, { useContext, useRef, useEffect } from 'react';
import QuestionContext from '../../context/question/queContext';

const QuestionFilter = () => {
  const questionContext = useContext(QuestionContext);
  const text = useRef('');

  const { filteredQuestions, clearFilter, filtered } = questionContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filteredQuestions(e.target.value);
    } else {
      clearFilter();
    }
  }
  return (
    <form className='filterForm'>
      <input ref={text} type='text' placeholder='Filter Questions...' onChange={onChange} />
    </form>
  )
}

export default QuestionFilter;