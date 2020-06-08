import axios from 'axios';

const baseURL = "https://us-central1-todoappbunny.cloudfunctions.net/api/";

const getUsers = async () => {
  const url = baseURL + "users";
  const users = await axios.get(url, {
    headers: {'Content-Type': 'application/json'}
  });

  return users.data
};

const UsersAPI = {
  getUsers
};

export default UsersAPI;
