import React, { useState, useContext, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import QuestionContext from '../../context/question/queContext';

const QuestionForm = () => {

  const questionContext = useContext(QuestionContext);
  const { addQuestion, current, clearCurrent, updateQuestion } = questionContext;

  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    if (current !== null) {
      setQuestion(current);
    } else {
      setQuestion({
        que: ''
      });
    }
  }, [questionContext, current]);

  const [question, setQuestion] = useState({
    que: ''
  });
  const { que } = question;

  const onChange = e => setQuestion({ ...question, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addQuestion(question);
    } else {
      updateQuestion(question);
    }
    clearCurrent();
    setQuestion({
      que: ''
    });
  }

  return (
    <form className='create-que' onSubmit={onSubmit}>
      <textarea name="que"
        onFocus={() => setExpanded(true)}
        onChange={onChange}
        value={que}
        placeholder={current ? 'Edit Question...' : 'Add Question...'} rows={isExpanded ? 3 : 1}
      />
      <Zoom in={isExpanded}>
        <Fab type='Submit' >
          {current ? <EditIcon /> : <AddIcon />}
        </Fab>
      </Zoom>
    </form>
  )
}

export default QuestionForm;
