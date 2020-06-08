import React, {Component} from 'react';
import Icon from '@mdi/react'
import { mdiPlusCircleOutline } from '@mdi/js'

import './Users.scss';
import User from "../user/User";
import UsersAPI from "../../API/UsersAPI";

export default class Users extends Component {

  state = {
    users: []
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const users = await UsersAPI.getUsers();
    console.log('users: ', users);
    this.setState({users});
  };

  render() {
    return (
      <div className="users">
        <div className="title-container">
          <h2 className="title-container__title">Team</h2>
          <Icon
            className="title-container__icon"
            path={mdiPlusCircleOutline}
            title="Task Profile"
            size={1.2}
          />
        </div>
        <div className="users-container">
          <User/>
          <User/>
        </div>
      </div>
    );
  }
}
