import { ADD_USER, FETCH_QA } from '../types';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const questionsAndAnswers = (data) => ({
  type: FETCH_QA,
  payload: data,
});

export const fetchEndpointQA = (token) => async (dispatch) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    dispatch(questionsAndAnswers(data));
  } catch (error) {
    return error;
  }
};
