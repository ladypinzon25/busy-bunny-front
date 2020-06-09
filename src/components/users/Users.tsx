import Icon from '@mdi/react'
import { mdiPlusCircleOutline } from '@mdi/js'
import React, { Component } from 'react';

import User from "../user/User";
import { IUser } from "../../entities/IUser";
import { ITask } from "../../entities/ITask";
import { requestStatus } from "../../AppConstants";
import UsersAPI from "../../API/UsersAPI";

import './Users.scss';

interface Props {
  users: IUser[];
  tasks: ITask[];
  addNewUser: (user: IUser) => void;
  updateUserInFront: (user: IUser) => void;
  toggleSelectedUser: (userId: number | undefined) => void;
  selectedUserId: number | undefined;
  refreshTasks: () => void;
  updateUsersInFront: (users: IUser[], userIdDeleted: number | undefined) => void;
  addNewUserTemplate: () => void;
  refreshUsers: () => void;
}

export default class Users extends Component<Props> {

  deleteUser = async (userId: number) => {
    const updatedUsers = this.props.users.filter(task => task.id !== userId);

    this.props.updateUsersInFront(updatedUsers, userId);

    const status = await UsersAPI.deleteUser(userId);

    if (status === requestStatus.success) {
      this.props.refreshUsers();
      this.props.refreshTasks();
      this.props.toggleSelectedUser(undefined);
    }
  };

  render() {
    const { users, tasks, toggleSelectedUser, selectedUserId, updateUserInFront, addNewUser, refreshUsers, addNewUserTemplate } = this.props;

    return (
      <div className="users">
        <div className="title-container">
          <h2 className="title-container__title">Team</h2>
          <div onClick={addNewUserTemplate}>
            <Icon
              className="title-container__icon"
              path={mdiPlusCircleOutline}
              title="Task Profile"
              size={1.2}
            />
          </div>
        </div>
        <div className={users.length ? "users-container" : "users-container users-container--empty"}>
          {!users.length
            ? <p>No users yet</p>
            : users.map((user: IUser, i) =>
              <User
                key={user.name + i}
                user={user}
                tasks={tasks}
                isSelected={selectedUserId === user.id}
                updateUserInFront={updateUserInFront}
                addNewUser={addNewUser}
                refreshUsers={refreshUsers}
                deleteUser={this.deleteUser}
                toggleSelectedUser={toggleSelectedUser}
              >
                {selectedUserId && selectedUserId === user.id && this.props.children}
              </User>
            )}
        </div>
      </div>
    );
  }
}
