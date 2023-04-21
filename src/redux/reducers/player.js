import { ADD_USER, MAKE_ASSERTION, RESET_GAME, SCORE_CHANGE } from '../types';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      name: action.payload.inputName,
      gravatarEmail: action.payload.inputEmail,
    };
  case SCORE_CHANGE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case MAKE_ASSERTION:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case RESET_GAME:
    return {
      ...state,
      assertions: 0,
      score: 0,
    };
  default:
    return state;
  }
};

export default player;
