import React from 'react'
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';
import {deleteTodo, updatePriority} from '../../actions/todo';

const useStyles = createUseStyles({
  'todo-item': {
    display: 'grid',
    boxShadow: '0px 2px 3px 1px #e0e0e0',
    padding: '1rem',
    gridColumnGap : '5px',
    gridRowGap: '10px',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr'
  },

  'todo-item__description': {
    gridColumn: '1 / -1'
  },

  'todo-item__executor': {
    display: 'grid',
    gridColumn: '1 / -1',
    alignItems: 'center'
  },

  'todo-item__priority': {
    display: 'grid',
    gridColumn: '1 / 2',
    alignItems: 'center',
  },

  'todo-item__button': {
    display: 'grid',
    height: '35px',
    backgroundColor: '#ededed',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#dbdbdb',
    }
  },

  'todo-item__delete-btn': todo => {
    let gridColumn;
    if (todo.priority === 10 || todo.priority === 1) {
      gridColumn = '4 / 5';
    } else {
      gridColumn= '2 / 3';
    }

    return {composes: '$todo-item__button', gridColumn};
  },

  'todo-item__decrease-btn': {
    composes: '$todo-item__button',
    gridColumn: '5 / -1'
  },

  'todo-item__increase-btn': todo => {
    let gridColumn;
    if (todo.priority === 1) {
      gridColumn = '5 / -1';
    } else {
      gridColumn = '3 / 5';
    }

    return {composes: '$todo-item__button', gridColumn};
  },
});

export default ({ todo }) => {
  const
    classes = useStyles(todo),
    dispatch = useDispatch();

  const onIncreaseBtnClick = () => {
    dispatch(updatePriority({ id: todo._id, type: 'increase' }));
  };

  const onDecreaseBtnClick = () => {
    dispatch(updatePriority({ id: todo._id, type: 'decrease' }));
  };

  const onDeleteBtnClick = () => {
    dispatch(deleteTodo(todo._id));
  };

  return (
    <div className={classes['todo-item']}>
      <div className={classes['todo-item__description']}>{todo.description}</div>
      <div className={classes['todo-item__executor']}>{todo.executor}</div>
      <div className={classes['todo-item__priority']}>{todo.priority}</div>
      <div
        className={classes['todo-item__delete-btn']}
        onClick={onDeleteBtnClick}
      >
        Удалить
      </div>

      {todo.priority < 10 && <div
        className={classes['todo-item__increase-btn']}
        onClick={onIncreaseBtnClick}
      >
        Повысить приоритет
      </div>}

      {todo.priority > 1 && <div
        className={classes['todo-item__decrease-btn']}
        onClick={onDecreaseBtnClick}
      >
        Понизить приоритет
      </div>}
    </div>
  );
};