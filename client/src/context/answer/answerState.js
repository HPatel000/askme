import React, { useReducer } from 'react'
import AnswerContext from './answerContext'
import answerReducer from './answerReducer'
import axios from 'axios'
import {
  ADD_ANSWER,
  DELETE_ANSWER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ANSWER,
  FILTER_ANSWERS,
  CLEAR_FILTER,
  GET_ANSWERS,
  CLEAR_ANSWERS,
  ANSWER_ERROR,
} from '../types'

const AnswerState = props => {
  const initalState = {
    currQuestion: null,
    current: null,
    filtered: null,
    answers: null,
    error: null,
  }

  const [state, dispatch] = useReducer(answerReducer, initalState)

  // get answers
  const getAnswers = async id => {
    try {
      const res = await axios.get(`./api/answers/${id}`)
      dispatch({ type: GET_ANSWERS, payload: { data: res.data, id: id } })
    } catch (error) {
      dispatch({
        type: ANSWER_ERROR,
        payload: error,
      })
    }
  }

  // Add answer
  const addAnswer = async (answer, id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await axios.post(`./api/answers/${id}`, answer, config)
      dispatch({ type: ADD_ANSWER, payload: res.data })
    } catch (error) {
      dispatch({
        type: ANSWER_ERROR,
        payload: error,
      })
    }
  }

  // Delete answer
  const deleteAnswer = async (id, queId) => {
    try {
      await axios.delete(`./api/answers/${id}`)
      dispatch({
        type: DELETE_ANSWER,
        payload: { id: id, queId: queId },
      })
    } catch (error) {
      dispatch({
        type: ANSWER_ERROR,
        payload: error,
      })
    }
  }

  // Update answer
  const updateAnswer = async answer => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await axios.put(`./api/answers/${answer._id}`, answer, config)
      dispatch({ type: UPDATE_ANSWER, payload: res.data })
    } catch (error) {
      dispatch({
        type: ANSWER_ERROR,
        payload: error,
      })
    }
  }

  // clear answers
  const clearAnswers = () => {
    dispatch({ type: CLEAR_ANSWERS })
  }

  // Set current answer
  const setCurrent = answer => {
    dispatch({ type: SET_CURRENT, payload: answer })
  }
  // clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Filter answers
  const filteredAnswers = (text, queId) => {
    dispatch({ type: FILTER_ANSWERS, payload: { text: text, queId: queId } })
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <AnswerContext.Provider
      value={{
        currQuestion: state.currQuestion,
        answers: state.answers,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addAnswer,
        deleteAnswer,
        setCurrent,
        clearCurrent,
        updateAnswer,
        filteredAnswers,
        clearFilter,
        clearAnswers,
        getAnswers,
      }}
    >
      {props.children}
    </AnswerContext.Provider>
  )
}

export default AnswerState
