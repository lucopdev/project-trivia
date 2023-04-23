import { combineReducers } from 'redux';
import player from './player';
import game from './game';
import ranking from './ranking';
import config from './config';

const rootReducer = combineReducers({
  player,
  game,
  ranking,
  config,
});

export default rootReducer;
