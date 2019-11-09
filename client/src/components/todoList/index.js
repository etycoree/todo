import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUseStyles } from 'react-jss'

import TodoItem from './todoItem'
import { todoRequest } from '../../actions/todo'

const useStyles = createUseStyles({
  'todo-list-container': {
    display: 'grid',
    gridGap: '1vw',
    width: '600px',
  }
});

export default () => {
  const
    dispatch = useDispatch(),
    classes = useStyles(),
    todoList = useSelector(state => state.todo.list),
    sortedTodoList = todoList ? [...todoList].sort((a, b) => b.priority - a.priority) : [];

  useEffect(() => {
    dispatch(todoRequest());
  }, []);

  return (
    <div className={classes['todo-list-container']}>
      {
         sortedTodoList.map(todo =>
          <TodoItem key={todo._id} todo={todo} />
        )
      }
    </div>
  )
}