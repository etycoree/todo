import axios from 'axios'

import { GET_USERS } from '../constants/ActionTypes';

export const usersRequest = () => async dispatch => {
  try {
    const res = await axios.get('/api/users');
    dispatch({ type: GET_USERS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_USERS, payload: [] });
  }
};
