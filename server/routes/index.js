import fs from 'fs'
import util from 'util'
import * as db from '../data/db'
import {handleRoutesError} from "../helpers/errors";

const
  readFile = util.promisify(fs.readFile),
  writeFile = util.promisify(fs.writeFile);

export default app => {
  app.get('/api/users', async (req, res) => {
    try {
      const users = await db.getUsers();
      return res.send(users);
    } catch (err) {
      handleRoutesError(err, res);
    }
  });

  app.get('/api/tasks', async (req, res) => {
    try {
      const tasks = await db.getTasks();
      return res.send(tasks);
    } catch (err) {
      handleRoutesError(err, res);
    }
  });

  app.post('/api/newTask', async (req, res) => {
    try {
      const task = await db.addTask(req.body);
      return res.send(task);
    } catch(err) {
      handleRoutesError(err, res);
    }
  });

  app.delete('/api/deleteTask/:id', async (req, res) => {
    try {
      const { success } = await db.deleteTask(req.params.id);
      return res.send({success});
    } catch (err) {
      handleRoutesError(err, res);
    }
  });

  app.patch('/api/updatePriority', async (req, res) => {
    const { id, type } = req.body;
    try {
      const updatedTask = await db.updatePriority(id, type);
      res.send(updatedTask);
    } catch(err) {
      handleRoutesError(err, res);
    }
  });
}
