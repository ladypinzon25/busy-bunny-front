import Icon from '@mdi/react'
import { mdiClose, mdiPencilOutline } from '@mdi/js'
import React, { Component } from 'react';

import TasksAPI from "../../API/TasksAPI";
import { ITask } from "../../entities/ITask";
import { IUser } from "../../entities/IUser";
import { taskStates } from "./TaskConstants";
import { requestStatus } from "../../AppConstants";

import './Task.scss';

interface Props {
  task: ITask;
  owner: IUser;
  refreshTasks: () => void;
  deleteTask: (taskId: number) => void;
  addNewTask: (task: ITask) => void;
  updateTaskInFront: (task: ITask) => void;
}

interface State {
  isEditing: boolean,
  description: string
}

export default class Task extends Component<Props, State> {

  state: State = {
    isEditing: false,
    description: this.props.task.description
  };

  componentDidMount() {
    if (this.props.task.isEditing) {
      this.enableEdition();
    }
  }

  isTaskCompleted = () => {
    return this.props.task.state === taskStates.done;
  };

  updateTaskState = async () => {
    const oldTask = this.props.task;
    const updatedTask = { ...oldTask, state: oldTask.state === taskStates.toDo ? taskStates.done : taskStates.toDo };

    this.props.updateTaskInFront(updatedTask);

    const status = await TasksAPI.updateTask(updatedTask);

    if (status === requestStatus.success) {
      this.props.refreshTasks();
    } else {
      this.props.updateTaskInFront(oldTask);
    }
  };

  enableEdition = (event?: any) => {
    if (event) {
      event.stopPropagation();
    }

    this.setState({ isEditing: true })
  };

  handleDescriptionChange = (event: any) => {
    this.setState({ description: event.target.value });
  };

  saveTask = async () => {
    const oldTask = this.props.task;

    if (this.props.task.isEditing) {
      if (this.state.description.trim() !== '') {
        this.setState({ isEditing: false });
        const updatedTask = { ...oldTask, description: this.state.description, isEditing: false };

        this.props.addNewTask(updatedTask);
      }
    } else {
      this.setState({ isEditing: false });
      const updatedTask = { ...oldTask, description: this.state.description };

      this.props.updateTaskInFront(updatedTask);

      const status = await TasksAPI.updateTask(updatedTask);

      if (status === requestStatus.success) {
        this.props.refreshTasks();
      } else {
        this.props.updateTaskInFront(oldTask);
      }
    }
  };

  get isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  render() {
    const { deleteTask, task, owner } = this.props;

    return (
      <div className="task">
        <label
          onClick={event => {
            event.stopPropagation();
          }}
        >
          <input
            type='checkbox'
            checked={this.isTaskCompleted()}
            onChange={this.updateTaskState}
          />
          <span/>
        </label>
        {this.state.isEditing
          ? <textarea
              cols={this.isMobile ? 12 : undefined}
              value={this.state.description}
              autoFocus={true}
              onChange={this.handleDescriptionChange}
              onBlur={this.saveTask}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  this.saveTask();
                }
              }}
            />
          : <div className="task__description" onClick={this.enableEdition}>
              {task.description}
              <span onClick={this.enableEdition}>
                <Icon
                  className="task__edit-icon icon"
                  path={mdiPencilOutline}
                  title="Task Profile"
                  size={0.7}
                />
              </span>
            </div>
        }
        <img src={owner && owner.picture} alt="user"/>
        <div className="task__delete-icon-container icon" onClick={() => deleteTask(task.id!)}>
          <Icon
            className="task__delete-icon icon"
            path={mdiClose}
            title="Task Profile"
            size={0.9}
          />
        </div>
      </div>
    );
  }
}
