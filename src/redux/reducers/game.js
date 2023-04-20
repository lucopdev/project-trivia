import { FETCH_QA } from '../types';

const INITIAL_STATE = {
  questions: {},
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_QA:
    return {
      ...state,
      questions: { ...action.payload },
    };
  default:
    return state;
  }
};

export default game;
