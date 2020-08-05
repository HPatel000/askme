import {
  ADD_QUESTION,
  DELETE_QUESTION,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_QUESTION,
  FILTER_QUESTIONS,
  CLEAR_FILTER,
  GET_QUESTIONS,
  CLEAR_QUESTIONS,
  QUESTION_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false
      }
    case ADD_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions],
        loading: false
      }
    case UPDATE_QUESTION:
      return {
        ...state,
        questions: state.questions.map(question => question._id === action.payload._id ? action.payload : question),
        loading: false
      }
    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(question => question._id !== action.payload),
        loading: false
      }
    case CLEAR_QUESTIONS:
      return {
        ...state,
        questions: null,
        filtered: null,
        error: null,
        current: null
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case FILTER_QUESTIONS:
      return {
        ...state,
        filtered: state.questions.filter(question => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return question.que.match(regex);
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case QUESTION_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}