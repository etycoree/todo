import fs from 'fs';
import util from 'util';
import uniqId from 'uniqid';

import {checkWithError} from "../helpers/errors";

const
  readFile = util.promisify(fs.readFile),
  writeFile = util.promisify(fs.writeFile),
  readDir = util.promisify(fs.readdir),
  unlinkFile = util.promisify(fs.unlink);

const isFileEmpty = (path) => fs.existsSync(path) ? fs.statSync(path).size === 0 : true;

export const getUsers = async () => {
  const usersPathName = `${__dirname}/users/users.json`;

  checkWithError(
    isFileEmpty(usersPathName),
    500,
    `Can't find users file\npathname: ${usersPathName}`
  );

  const usersBuffer = await readFile(usersPathName);
  return JSON.parse(usersBuffer).users;
};

export const getTasks = async () => {
  const tasksDirName = `${__dirname}/tasks/`;

  checkWithError(
    isFileEmpty(tasksDirName),
    500,
    `Can't find tasks dir\npathname: ${tasksDirName}`
  );

  const
    tasks = [],
    tasksFileNames = await readDir(tasksDirName);

  for (const t of tasksFileNames) {
    const taskPathName = `${__dirname}/tasks/${t}`;
    const taskBuffer = await readFile(taskPathName);
    tasks.push(JSON.parse(taskBuffer));
  }

  return tasks;
};

export const addTask = async (task) => {
  const
    _id = uniqId(),
    taskFileName = `${__dirname}/../data/tasks/${_id}.json`;

  checkWithError(
    !task.description || !task.executor || task.priority === undefined,
    400,
    'All fields are required'
  );

  if (task.priority < 1)
    task.priority = 1;

  if (task.priority > 10)
    task.priority = 10;

  const taskWithId = { ...task, _id };
  await writeFile(taskFileName, JSON.stringify(taskWithId));
  return taskWithId;
};

export const deleteTask = async (id) => {
  const taskFileName = `${__dirname}/tasks/${id}.json`;

  checkWithError(
    isFileEmpty(taskFileName),
    400,
    'Bad id'
  );

  await unlinkFile(taskFileName);
  return { success: true };
};

export const updatePriority = async (id, type) => {
  const taskFileName = `${__dirname}/tasks/${id}.json`;

  checkWithError(
    isFileEmpty(taskFileName),
    400,
    'Bad id'
  );

  const
    taskBuffer = await readFile(taskFileName),
    task = JSON.parse(taskBuffer);

  if (type === 'increase')
    task.priority = task.priority === 10 ? task.priority : task.priority + 1;
  if (type === 'decrease')
    task.priority = task.priority === 1 ? task.priority : task.priority - 1;

  await writeFile(taskFileName, JSON.stringify(task));
  return task;
};