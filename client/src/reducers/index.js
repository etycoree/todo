import { combineReducers } from 'redux';

import todo from './todo';
import users from './users';

export default combineReducers({
  todo,
  users
});
