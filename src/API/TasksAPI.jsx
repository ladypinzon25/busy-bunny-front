import axios from 'axios';

const baseURL = "https://us-central1-todoappbunny.cloudfunctions.net/api/";

const getTasks = async () => {
  const url = baseURL + "tasks";
  const users = await axios.get(url, {
    headers: {'Content-Type': 'application/json'}
  });
  return users.data.results
};

const TasksAPI = {
  getTasks
};

export default TasksAPI;
