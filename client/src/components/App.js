import React from 'react'
import TodoList from './todoList'
import TodoForm from './todoForm'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  todoList: {
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    height: '100%',
    gridGap: '3vw'
  }
});

const App = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.todoList}>
        <h1>TODO APP</h1>
        <TodoForm />
        <TodoList />
      </div>
    </>
  );
};

export default App;
