import React, { Component } from 'react';

import UsersAPI from './API/UsersAPI';
import TasksAPI from './API/TasksAPI';
import { requestStatus } from './AppConstants';
import Users from './components/users/Users';
import Tasks from './components/tasks/Tasks';
import { taskStates } from './components/task/TaskConstants';
import { IUser } from './entities/IUser';
import { ITask } from './entities/ITask';

import './App.scss';

interface State {
  tasks: ITask[];
  users: IUser[];
  selectedUserId: number | undefined;
}

export default class App extends Component<{}, State> {

  state: State = {
    tasks: [],
    users: [],
    selectedUserId: undefined
  };

  componentDidMount() {
    this.loadUsers();
    this.loadTasks();
  }

  loadUsers = async () => {
    if (!this.state.users.some(user => user.isEditing)) {
      const users = await UsersAPI.loadUsers();

      this.setState({ users });
    }
  };

  loadTasks = async () => {
    if (!this.state.tasks.some(task => task.isEditing)) {
      const tasks = await TasksAPI.loadTasks();

      this.setState({ tasks });
    }
  };

  toggleSelectedUser = (userId: number | undefined) => {
    this.setState({ selectedUserId: this.state.selectedUserId === userId ? undefined : userId })
  };

  updateTaskInFront = (task: ITask) => {
    const taskIndex = this.state.tasks.findIndex(t => t.id === task.id);
    const tasksCopy = [...this.state.tasks];
    tasksCopy[taskIndex] = task;

    this.setState({ tasks: tasksCopy });
  };

  updateTasksInFront = (tasks: ITask[]) => {
    this.setState({ tasks });
  };

  addNewTaskTemplate = (event: any) => {
    event.stopPropagation();

    const taskTemplate: ITask = {
      id: undefined,
      userId: this.state.selectedUserId!,
      description: '',
      state: taskStates.toDo,
      isEditing: true,
      created: new Date()
    };

    this.setState({ tasks: [taskTemplate, ...this.state.tasks] })
  };

  addNewTask = async (task: ITask) => {
    this.updateTaskInFront(task);

    const status = await TasksAPI.addTask(task);

    if (status === requestStatus.created) {
      this.loadTasks();
    }
  };

  addNewUser = async (user: IUser) => {
    this.updateUserInFront(user);

    const status = await UsersAPI.addUser(user);

    if (status === requestStatus.created) {
      this.loadUsers();
    }
  };

  updateUserInFront = (user: IUser) => {
    const userIndex = this.state.users.findIndex(u => u.id === user.id);
    const usersCopy = [...this.state.users];
    usersCopy[userIndex] = user;

    this.setState({ users: usersCopy });
  };

  updateUsersInFront = (users: IUser[], userIdDelete: number | undefined) => {
    const tasksUpdated = this.state.tasks.filter(task => task.userId !== userIdDelete);
    this.setState({ users, tasks: tasksUpdated });
  };

  addNewUserTemplate = () => {
    const userTemplate: IUser = {
      id: undefined,
      name: '',
      picture: 'https://rawcdn.githack.com/ljpinzon12/busy-bunny-front/fdfcd7df1dfe6dc82756d6921e3049b0f42318e7/public/images/user0'+ (Math.floor(Math.random() * 7) + 1)  +'.png',
      isEditing: true,
      created: new Date()
    };

    this.setState({ users: [userTemplate, ...this.state.users] })
  };

  get sortedTasks(): ITask[] {
    return this.state.tasks.sort((taskA, taskB) => taskB.created.getTime() - taskA.created.getTime());
  };

  get sortedUsers(): IUser[] {
    return this.state.users.sort((userA, userB) => userB.created.getTime() - userA.created.getTime());
  };

  get isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  render() {
    const tasksComponent =
      <Tasks
        users={this.sortedUsers}
        tasks={this.sortedTasks}
        refreshTasks={this.loadTasks}
        selectedUserId={this.state.selectedUserId}
        addNewTaskTemplate={(event: any) => this.addNewTaskTemplate(event)}
        addNewTask={(task: ITask) => this.addNewTask(task)}
        updateTaskInFront={(task: ITask) => this.updateTaskInFront(task)}
        updateTasksInFront={(tasks: ITask[]) => this.updateTasksInFront(tasks)}
      />;

    return (
      <div className="App">
        <header className="header">
          <h1 className="header__title">Busy Bunny</h1>
          <h4 className="header__subtitle">To do app</h4>
        </header>
        <div className="content">
          <Users
            users={this.sortedUsers}
            tasks={this.sortedTasks}
            selectedUserId={this.state.selectedUserId}
            refreshUsers={this.loadUsers}
            refreshTasks={this.loadTasks}
            addNewUser={(user: IUser) => this.addNewUser(user)}
            addNewUserTemplate={this.addNewUserTemplate}
            updateUserInFront={(user: IUser) => this.updateUserInFront(user)}
            toggleSelectedUser={(userId: number | undefined) => this.toggleSelectedUser(userId)}
            updateUsersInFront={(users: IUser[], userIdDeleted: number | undefined) => this.updateUsersInFront(users, userIdDeleted)}
          >
            {this.isMobile && tasksComponent}
          </Users>
          {!this.isMobile && tasksComponent}
        </div>
        <footer className="footer">
          Made with <span>❤</span>️ by Lady Pinzon for
          <img src="./images/bunny.svg" alt="bunny"/>
        </footer>
        <img src='/images/bunny-background.svg' className="bunny-background" alt="bunny"/>
      </div>
    );
  }
}
