import React from 'react';
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'

import './Task.scss';

function Task() {
  return (
    <div className="task">
      <label>
        <input type='checkbox'/>
          <span/>
      </label>
      <div className="task__description">
        Avenge her missing daughter by fighting against Bill
      </div>
      <img src="./images/user01.png" alt="user"/>
      <Icon
        className="task__delete-icon icon"
        path={mdiClose}
        title="Task Profile"
        size={0.9}
      />
    </div>
  );
}

export default Task;
