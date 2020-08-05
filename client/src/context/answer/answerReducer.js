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
  ANSWER_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ANSWERS:
      if (state.answers === null) state.answers = {};
      state.answers[`${action.payload.id}`] = action.payload.data;
      return {
        ...state,
        answers: state.answers,
        loading: false
      }
    case ADD_ANSWER:
      state.answers[`${action.payload.question}`] = [action.payload, ...state.answers[`${action.payload.question}`]];
      return {
        ...state,
        answers: state.answers,
        loading: false
      }
    case UPDATE_ANSWER:
      state.answers[`${action.payload.question}`] = state.answers[`${action.payload.question}`].map(answer => answer._id === action.payload._id ? action.payload : answer);
      return {
        ...state,
        answers: state.answers,
        loading: false
      }
    case DELETE_ANSWER:
      state.answers[`${action.payload.queId}`] = state.answers[`${action.payload.queId}`].filter(answer => answer._id !== action.payload.id);
      return {
        ...state,
        answers: state.answers,
        loading: false
      }
    case CLEAR_ANSWERS:
      return {
        ...state,
        answers: null,
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
    case FILTER_ANSWERS:
      return {
        ...state,
        filtered: state.answers[`${action.payload.queId}`].filter(answer => {
          const regex = new RegExp(`${action.payload.text}`, 'gi');
          return answer.ans.match(regex);
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case ANSWER_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}