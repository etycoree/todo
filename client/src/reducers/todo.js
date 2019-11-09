import _ from 'lodash'

import {ADD_TODO, UPDATE_PRIORITY, DELETE_TODO, TODO_REQUEST} from '../constants/ActionTypes'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case TODO_REQUEST:
      return {...state, list: action.payload };

    case ADD_TODO:
      return {...state, list: [...state.list, action.payload]};

    case UPDATE_PRIORITY: {
      const
        updatedTask = action.payload,
        filteredList = _.filter(state.list, t => t._id !== updatedTask._id);
      return {...state, list: [...filteredList, updatedTask]};
    }

    case DELETE_TODO: {
      const
        id = action.payload,
        filteredList = _.filter(state.list, t => t._id !== id);
      return {...state, list: [...filteredList]};
    }

    default:
      return state;
  }
}