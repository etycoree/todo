import axios from 'axios'

import { TODO_REQUEST, ADD_TODO, DELETE_TODO, UPDATE_PRIORITY } from '../constants/ActionTypes';

export const todoRequest = () => async dispatch => {
  try {
    const res = await axios.get('/api/tasks');
    dispatch({ type: TODO_REQUEST, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch({ type: TODO_REQUEST, payload: [] });
  }
};

export const addTodo = (todo) => async dispatch => {
  try {
    const res = await axios.post('/api/newTask', todo);
    dispatch({ type: ADD_TODO, payload: res.data });
  } catch (err) {
    console.error(err)
  }
};

export const updatePriority = ({ id, type }) => async dispatch => {
  try {
    const res = await axios.patch('/api/updatePriority', { id, type });
    dispatch({ type: UPDATE_PRIORITY, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const deleteTodo = (id) => async dispatch => {
  try {
    await axios.delete(`/api/deleteTask/${id}`);
    dispatch({ type: DELETE_TODO, payload: id });
  } catch (err) {
    console.error(err);
  }
};
