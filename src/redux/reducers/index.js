import { combineReducers } from 'redux';

const INITIAL_STATE = {
  chave: '',
};

const exampleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ACTION_STRING':
    return {
      ...state,
      chave: '',
    };
  default:
    return state;
  }
};
const rootReducer = combineReducers({
  exampleReducer,
});
export default rootReducer;
