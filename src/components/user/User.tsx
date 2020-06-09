import Icon from '@mdi/react'
import { mdiPencilOutline } from '@mdi/js'
import { mdiClose } from '@mdi/js'
import React, { Component } from 'react';

import { IUser } from "../../entities/IUser";
import { ITask } from "../../entities/ITask";
import { requestStatus } from "../../AppConstants";
import UsersAPI from "../../API/UsersAPI";

import './User.scss';

interface Props {
  user: IUser;
  tasks: ITask[];
  isSelected: boolean;
  toggleSelectedUser: (userId: number | undefined) => void;
  addNewUser: (user: IUser) => void;
  deleteUser: (userId: number) => void;
  updateUserInFront: (user: IUser) => void;
  refreshUsers: () => void;
}

interface State {
  editName: boolean,
  name: string
}

export default class User extends Component<Props, State> {

  state: State = {
    editName: false,
    name: this.props.user.name
  };

  componentDidMount() {
    if (this.props.user.isEditing) {
      this.editingName(undefined);
    }
  }

  get pendingTasks(): number {
    return this.props.tasks.filter(task => task.userId === this.props.user.id && task.state === 'to-do').length;
  }

  handleChangeName = (event: any) => {
    this.setState({ name: event.target.value });
  };

  saveUser = async () => {
    const oldUser = this.props.user;

    if (oldUser.isEditing) {
      if (this.state.name.trim() !== '') {
        this.setState({ editName: false });
        const updatedUser = { ...oldUser, name: this.state.name, isEditing: false };
        this.props.addNewUser(updatedUser);
      }
    } else {
      this.setState({ editName: false });
      const updatedUser = { ...oldUser, name: this.state.name };
      this.props.updateUserInFront(updatedUser);
      const status = await UsersAPI.updateUser(updatedUser);

      if (status === requestStatus.success) {
        this.props.refreshUsers();
      } else {
        this.props.updateUserInFront(oldUser);
      }
    }
  };

  editingName = (event: any) => {
    this.setState({ editName: true });
    if (event) {
      event.stopPropagation();
    }
  };

  get isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  render() {
    const { user, isSelected, toggleSelectedUser, deleteUser } = this.props;

    return (
      <div className={isSelected ? "user user--selected" : "user"} onClick={() => toggleSelectedUser(user.id)}>
        <div className="user-card">
          <img src={user.picture} alt="user"/>
          <div className="user-info-container">
            <div className="name-container">
              {this.state.editName
                ? <input
                    value={this.state.name}
                    autoFocus={true}
                    onChange={event => this.handleChangeName(event)}
                    onBlur={this.saveUser}
                    onKeyUp={(event) => {
                      if (event.key === 'Enter') {
                        this.saveUser();
                      }
                    }}
                  />
                : <h4 className="name-container__name" onClick={this.editingName}>{user.name}</h4>
              }
              <div onClick={this.editingName}>
                <Icon
                  className="name-container__edit-icon icon"
                  path={mdiPencilOutline}
                  title="Task Profile"
                  size={0.7}
                />
              </div>
            </div>
            <p className="user-info-container__pending-tasks">{this.pendingTasks} pending tasks</p>
            {(!this.isMobile || isSelected) &&
              <div
                className="user-info-container__delete"
                onClick={event => {
                  event.stopPropagation();
                  deleteUser(user.id!);
                }}
              >
                  <Icon
                    className="user-info-container__delete-icon"
                    path={mdiClose}
                    title="Task Profile"
                    size={0.9}
                  />
              </div>
            }

          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
