import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import AnswerContext from '../../context/answer/answerContext';

const AnswerForm = ({ questionId }) => {

  const answerContext = useContext(AnswerContext);

  const [isExpanded, setExpanded] = useState(false);

  const { addAnswer, current, clearCurrent, updateAnswer } = answerContext;

  useEffect(() => {
    if (current !== null) {
      setAnswer(current);
    } else {
      setAnswer({
        ans: ''
      });
    }
  }, [answerContext, current]);

  const [answer, setAnswer] = useState({
    ans: ''
  });

  const { ans } = answer;

  const onChange = e => setAnswer({ ...answer, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addAnswer(answer, questionId);
    } else {
      updateAnswer(answer);
    }
    clearAll();
    setAnswer({
      ans: ''
    });
  }

  const clearAll = () => {
    clearCurrent();
  }

  function expand() {
    setExpanded(true);
  }
  return (
    <form className='create-que' onSubmit={onSubmit}>
      <textarea name="ans"
        onFocus={expand}
        // onClick={expand}
        onChange={onChange}
        value={ans}
        placeholder={current ? 'Edit Answer...' : 'Add Answer...'} rows={isExpanded ? 3 : 1}
      />
      <Zoom in={isExpanded}>
        <Fab type='Submit' >
          {current ? <EditIcon /> : <AddIcon />}
        </Fab>
      </Zoom>
    </form>
  )
}

AnswerForm.propTypes = {
  questionId: PropTypes.string.isRequired,
}

export default AnswerForm;
