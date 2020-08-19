import React, { useReducer } from 'react';
import QuestionContext from './queContext';
import questionReducer from './queReducer';
import axios from 'axios';
import {
  ADD_QUESTION,
  DELETE_QUESTION,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_QUESTION,
  FILTER_QUESTIONS,
  CLEAR_FILTER,
  GET_QUESTIONS,
  GET_ALL_QUESTIONS,
  CLEAR_QUESTIONS,
  QUESTION_ERROR
} from '../types';

const QuestionState = props => {
  const initalState = {
    current: null,
    filtered: null,
    questions: null,
    allQuestions: null,
    error: null
  }

  const [state, dispatch] = useReducer(questionReducer, initalState);

  // get all questions
  const getAllQuestion = async () => {
    try {
      const res = await axios.get('./api/questions/all');
      dispatch({ type: GET_ALL_QUESTIONS, payload: res.data });
    } catch (error) {
      dispatch({
        type: QUESTION_ERROR,
        payload: error
      })
    }
  }

  // get user's questions
  const getQuestion = async () => {
    try {
      const res = await axios.get('./api/questions');
      dispatch({ type: GET_QUESTIONS, payload: res.data });
    } catch (error) {
      dispatch({
        type: QUESTION_ERROR,
        payload: error
      })
    }
  }


  // Add question
  const addQuestion = async question => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('./api/questions', question, config);
      dispatch({ type: ADD_QUESTION, payload: res.data });
    } catch (error) {
      dispatch({
        type: QUESTION_ERROR,
        payload: error
      })
    }
  }

  // Delete question
  const deleteQuestion = async id => {
    try {
      await axios.delete(`./api/questions/${id}`);
      dispatch({
        type: DELETE_QUESTION, payload: id
      });
    } catch (error) {
      dispatch({
        type: QUESTION_ERROR,
        payload: error
      })
    }
  }
  // Update question
  const updateQuestion = async question => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`./api/questions/${question._id}`, question, config);
      dispatch({ type: UPDATE_QUESTION, payload: res.data });
    } catch (error) {
      dispatch({
        type: QUESTION_ERROR,
        payload: error.response.msg
      })
    }
  }

  // clear questions
  const clearQuestions = () => {
    dispatch({ type: CLEAR_QUESTIONS });
  }

  // Set current question
  const setCurrent = question => {
    dispatch({ type: SET_CURRENT, payload: question });
  }
  // clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  }

  // Filter questions
  const filteredQuestions = text => {
    dispatch({ type: FILTER_QUESTIONS, payload: text });
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  }

  return (
    <QuestionContext.Provider
      value={{
        questions: state.questions,
        allQuestions: state.allQuestions,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addQuestion,
        deleteQuestion,
        setCurrent,
        clearCurrent,
        updateQuestion,
        filteredQuestions,
        clearFilter,
        clearQuestions,
        getQuestion,
        getAllQuestion
      }}>
      {props.children}
    </QuestionContext.Provider>
  )
}

export default QuestionState;