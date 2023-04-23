import { CHANGE_CONFIG } from '../types';

const INITIAL_STATE = {
  category: '',
  type: '',
  difficulty: '',
};

const config = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_CONFIG:
    return {
      category: action.payload.category,
      type: action.payload.type,
      difficulty: action.payload.difficulty,
    };
  default:
    return state;
  }
};

export default config;
