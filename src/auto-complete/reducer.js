import { combineReducers } from 'redux';
import { FETCH_CHARACTERS, FETCH_CHARACTERS_FULFILLED } from './actions';

const charactersReducer = (characters = [], action) => {
  console.log(action);
  if (action.type === FETCH_CHARACTERS_FULFILLED) {
    console.log(action);
    return action.payload;
  }

   return characters;
};

export default combineReducers({
  characters: charactersReducer,
});