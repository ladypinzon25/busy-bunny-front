import axios from 'axios';

import { IUser } from "../entities/IUser";

const baseURL = "https://us-central1-todoappbunny.cloudfunctions.net/api/";

const loadUsers = async () => {
  const url = baseURL + "users";
  const users = await axios.get(url);

  return users.data.map((u: IUser) => ({ ...u, created: new Date(u.created) }));
};

const updateUser = async (user: IUser) => {
  const url = baseURL + "users/" + user.id;
  const request = await axios.put(url, user);

  return request.status
};

const deleteUser = async (userId: number) => {
  const url = baseURL + "users/" + userId;
  const request = await axios.delete(url);

  return request.status
};

const addUser = async (user: IUser) => {
  const url = baseURL + "users/";
  const request = await axios.post(url, user);

  return request.status
};

const UsersAPI = {
  loadUsers,
  updateUser,
  deleteUser,
  addUser
};

export default UsersAPI;
