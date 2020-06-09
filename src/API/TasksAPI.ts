import axios from 'axios';

import { ITask } from "../entities/ITask";

const baseURL = "https://us-central1-todoappbunny.cloudfunctions.net/api/";

const loadTasks = async () => {
  const url = baseURL + "tasks";
  const tasks = await axios.get(url);

  return tasks.data.map((t: ITask) => ({ ...t, created: new Date(t.created) }));
};

const updateTask = async (task: ITask) => {
  const url = baseURL + "tasks/" + task.id;
  const request = await axios.put(url, task);

  return request.status
};

const deleteTask = async (taskId: number) => {
  const url = baseURL + "tasks/" + taskId;
  const request = await axios.delete(url);

  return request.status
};

const addTask = async (task: ITask) => {
  const url = baseURL + "users/" + task.userId + "/tasks";
  const request = await axios.post(url, task);

  return request.status
};

const TasksAPI = {
  loadTasks,
  updateTask,
  deleteTask,
  addTask
};

export default TasksAPI;
