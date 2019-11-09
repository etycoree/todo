import React, { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { usersRequest } from '../../actions/users';
import { addTodo } from '../../actions/todo';

const useStyles = createUseStyles({
  'todoForm': {
    display: 'grid',
    gridTemplateRows: '4fr 1fr 1fr 1fr',
    width: '600px',
    boxShadow: '0px 2px 3px 1px #e0e0e0',
    gridGap: '10px',
    padding: '2em',
  },

  'todoForm__description-label': {
    color: '#717373'
  },

  'todoForm__description': {
    width: '100%',
    height: '75%',
    resize: 'none',
    border: 'none',
    marginTop: '1rem',
    gridRow: '1 / 2'
  },

  'todoForm__user-selector': {
    width: '100%',
    padding: '.4em .1em',
    border: '1px solid #bbb',
    backgroundColor: '#fff',
    outline: 'none',
    gridRow: '2 / 3'
  },

  'todoForm__priority-input': {
    width: '100%',
    border: '1px solid #bbb',
    padding: '.4em .3em',
    gridRow: '3 / 4'
  },

  'todoForm__submit-button': {
    border: 'none',
    backgroundColor: '#ededed',
    width: '100%',
    outline: 'none',
    cursor: 'pointer',
    gridRow: '4 / -1',
    '&:hover': {
      backgroundColor: '#dbdbdb',
    }
  },

  'todoForm__support-text': {
    display: 'inline-block',
    fontSize: '.8rem',
    height: '1em',
    width: '100%'
  },

  'todoForm__description_error':  error => ({
    composes: '$todoForm__support-text',
    color: error.description ? '#ED001A' : 'none',
    visibility: error.description ? 'visible' : 'hidden'
  }),

  'todoForm__priority_error':  error => ({
    composes: '$todoForm__support-text',
    color: error.priority ? '#ED001A' : 'none',
    visibility: error.priority ? 'visible' : 'hidden'
  }),

  'todoForm__executor_error':  error => ({
    composes: '$todoForm__support-text',
    color: error.executor ? '#ED001A' : 'none',
    visibility: error.executor ? 'visible' : 'hidden'
  })
});

export default () => {
  const
    emptyTodo = {
      description: '',
      executor: 'не выбрано',
      priority: '',
    },
    dispatch = useDispatch(),
    users = useSelector(state => state.users.list),
    [error, setError] = useState({...emptyTodo, executor: ''}),
    [todo, setTodo] = useState(emptyTodo),
    classes = useStyles(error);

  const onChange = (e) => {
    setTodo({...todo, [e.target.name]: e.target.value})
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const error = {};
    if (!todo.description) {
      error.description = 'Введите описание задачи';
    }

    if (!todo.executor || todo.executor === 'не выбрано')
      error.executor = 'Укажите исполнителя задачи';

    const priority = parseInt(todo.priority, 10);
    if(isNaN(priority))
      error.priority = 'Укажите число в поле приоритет';

    if(Object.keys(error).length !== 0)
      return setError({...error});

    dispatch(addTodo({...todo, priority}));
    setTodo(emptyTodo);
    setError({});
  };

  useEffect(() => {
    dispatch(usersRequest());
  }, []);

  return (
    <form className={classes['todoForm']} onSubmit={onSubmit}>
      <div>
        <label className={classes['todoForm__description-label']}>Описание</label>
        <textarea
          name='description'
          value={todo.description}
          className={classes['todoForm__description']}
          onChange={onChange}
        />
        <span className={classes['todoForm__description_error']}>{error.description}</span>
      </div>

      <div className={classes['todoForm_executor-container']}>
        <select
          onChange={onChange}
          name='executor'
          value={todo.executor}
          className={classes['todoForm__user-selector']}
        >
          <option disabled>не выбрано</option>
          {users && users.map((user, index) => (
            <option key={index}>{user}</option>
          ))}
        </select>
        <span className={classes['todoForm__executor_error']}>{error.executor}</span>
      </div>

      <div>
        <input
          onChange={onChange}
          name={'priority'}
          value={todo.priority}
          className={classes['todoForm__priority-input']}
          placeholder={"Приоритет"}
        />
        <span className={classes['todoForm__priority_error']}>{error.priority}</span>
      </div>

      <button
        type='submit'
        className={classes['todoForm__submit-button']}
      >
        Добавить задачу
      </button>
    </form>
  )
}