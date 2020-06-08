import React from 'react';
import Icon from '@mdi/react'
import { mdiPlusCircleOutline } from '@mdi/js'

import './Tasks.scss';
import Task from "../task/Task";

function Tasks() {
  return (
    <div className="tasks">
      <div className="title-container">
        <h2 className="title-container__title">Tasks</h2>
        <Icon
          className="title-container__icon"
          path={mdiPlusCircleOutline}
          title="Task Profile"
          size={1.2}
        />
      </div>
      <div className="tasks-container">
        <Task/>
        <Task/>
        <Task/>
        <Task/>
        <Task/>
        <Task/>
      </div>
    </div>
  );
}

export default Tasks;
