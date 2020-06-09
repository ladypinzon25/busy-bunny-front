import Icon from '@mdi/react'
import { mdiPlusCircleOutline } from '@mdi/js'
import React, { Component } from 'react';

import Task from "../task/Task";
import { ITask } from "../../entities/ITask";
import { IUser } from "../../entities/IUser";
import TasksAPI from "../../API/TasksAPI";
import { requestStatus } from "../../AppConstants";

import './Tasks.scss';

interface Props {
  users: IUser[];
  tasks: ITask[];
  refreshTasks: () => void;
  selectedUserId: number | undefined;
  addNewTask: (task: ITask) => void;
  updateTaskInFront: (task: ITask) => void;
  updateTasksInFront: (task: ITask[]) => void;
  addNewTaskTemplate: (event: any) => void;
}

export default class Tasks extends Component<Props> {

  deleteTask = async (taskId: number) => {
    const updatedTasks = this.props.tasks.filter(task => task.id !== taskId);
    this.props.updateTasksInFront(updatedTasks);

    const status = await TasksAPI.deleteTask(taskId);

    if (status === requestStatus.success) {
      this.props.refreshTasks();
    }
  };

  get tasksToShow(): ITask[] {
    return this.props.selectedUserId
      ? this.props.tasks.filter(task => task.userId === this.props.selectedUserId)
      : this.props.tasks;
  };

  render() {
    const { users, selectedUserId, addNewTaskTemplate, addNewTask, updateTaskInFront, refreshTasks } = this.props;
    const tasks = this.tasksToShow;

    return (
      <div className="tasks">
        <div className="title-container">
          <h2 className="title-container__title">Tasks</h2>
          {selectedUserId &&
            <div onClick={addNewTaskTemplate}>
                <Icon
                  className="title-container__icon"
                  path={mdiPlusCircleOutline}
                  title="Task Profile"
                  size={1.2}
                />
            </div>
          }
        </div>
        <div className={tasks.length ? "tasks-container" : "tasks-container tasks-container--empty"}>
          {!tasks.length
            ? <p>No tasks yet</p>
            : tasks.map((task, i) =>
              <Task
                key={task.description + i}
                task={task}
                owner={users.find(user => user.id === task.userId)!}
                refreshTasks={refreshTasks}
                addNewTask={addNewTask}
                deleteTask={this.deleteTask}
                updateTaskInFront={updateTaskInFront}
              />
            )}
        </div>
      </div>
    );
  }
}
