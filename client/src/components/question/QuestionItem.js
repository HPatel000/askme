import React, { useContext, useState } from 'react';
import Answers from '../answer/Answers';
import { Link, Route, Redirect } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import QuestionContext from '../../context/question/queContext';

const QuestionItem = ({ question }) => {

  const questionContext = useContext(QuestionContext);
  const { deleteQuestion, setCurrent, clearCurrent } = questionContext;

  const [toggleAns, settoggleAns] = useState('displayNone');

  function ToggleAns() {
    toggleAns === 'displayNone' ? settoggleAns('displayBlock') : settoggleAns('displayNone');
  }

  const { que, date, _id } = question;

  const onDelete = () => {
    deleteQuestion(_id);
    clearCurrent();
  }

  return (
    <div className='question'>
      <p>{que}</p>
      {toggleAns === 'displayBlock' &&
        <div className={toggleAns}>
          <Answers queId={question._id} />
        </div>
      }

      <button className='floatRight' onClick={onDelete}>
        <DeleteIcon />
      </button>
      <button className='floatRight' onClick={() => setCurrent(question)}>
        <EditIcon />
      </button>
      <button className='floatLeft' onClick={ToggleAns}>Answer</button>
      {/* <Link className='floatLeft answerLink' to={{ pathname: '/answersofquestion', data: question }} >Answer</Link> */}
    </div>
  )
}

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
}


export default QuestionItem;