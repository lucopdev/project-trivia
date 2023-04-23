import {
  ADD_PLAYER_SCORE,
  ADD_USER,
  CHANGE_CONFIG,
  FETCH_QA,
  MAKE_ASSERTION,
  RESET_GAME,
  SCORE_CHANGE,
} from '../types';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const questionsAndAnswers = (data) => ({
  type: FETCH_QA,
  payload: data,
});

export const changeScore = (score) => ({
  type: SCORE_CHANGE,
  payload: score,
});

export const makeAssertion = () => ({
  type: MAKE_ASSERTION,
});

export const resetGame = () => ({
  type: RESET_GAME,
});

export const addPlayerScore = (player) => ({
  type: ADD_PLAYER_SCORE,
  payload: player,
});

export const changeConfig = ({ category, type, difficulty }) => ({
  type: CHANGE_CONFIG,
  payload: { category, type, difficulty },
});
