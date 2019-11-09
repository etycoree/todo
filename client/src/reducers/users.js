import { GET_USERS } from '../constants/ActionTypes';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, list: action.payload };

    default:
      return state;
  }
}