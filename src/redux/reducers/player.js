import { ADD_USER, SCORE_CHANGE } from '../types';

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
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default player;
