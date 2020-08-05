import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import AnswerContext from '../../context/answer/answerContext';

const AnswerItem = ({ answer }) => {

  const answerContext = useContext(AnswerContext);
  const { deleteAnswer, setCurrent, clearCurrent } = answerContext;

  const { ans, date, _id } = answer;

  const onDelete = () => {
    deleteAnswer(_id, answer.question);
    clearCurrent();
  }
  return (
    <div className='question'>
      <p>{ans}</p>
      <button className='floatRight' onClick={onDelete}>
        <DeleteIcon />
      </button>
      <button className='floatRight' onClick={() => setCurrent(answer)}>
        <EditIcon />
      </button>
    </div>
  )
}

AnswerItem.propTypes = {
  answer: PropTypes.object.isRequired,
}


export default AnswerItem;