import { ADD_PLAYER_SCORE } from '../types';

const INITIAL_STATE = {
  playersList: [],
  orderedRanking: [],
};

const ranking = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER_SCORE:
    return {
      ...state,
      playersList: [...state.playersList, action.payload],
    };

  default:
    return state;
  }
};

export default ranking;
