import { combineReducers } from 'redux';
import lists from './list-reducer';
import cards from './card-reducer';
import users from './user-reducer';


export default combineReducers({
  lists,
  cards,
  users,
})