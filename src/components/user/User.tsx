import React from 'react';
import Icon from '@mdi/react'
import { mdiPencilOutline } from '@mdi/js'
import { mdiClose } from '@mdi/js'

import './User.scss';

function User() {
  return (
    <div className="user">
      <img src="./images/user01.png" alt="user"/>
      <div className="user-info-container">
        <div className="name-container">
          <h4 className="name-container__name">Betrix Kiddo</h4>
          <Icon
            className="name-container__edit-icon"
            path={mdiPencilOutline}
            title="Task Profile"
            size={0.7}
          />
        </div>
        <p className="user-info-container__pending-tasks">4 pending tasks</p>
        <Icon
          className="user-info-container__delete-icon"
          path={mdiClose}
          title="Task Profile"
          size={0.9}
        />
      </div>
    </div>
  );
}

export default User;
