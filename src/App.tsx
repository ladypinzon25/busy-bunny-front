import React from 'react';

import './App.scss';
import Users from "./components/users/Users";
import Tasks from "./components/tasks/Tasks";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">Busy Bunny</h1>
        <h4 className="header__subtitle">To do app</h4>
      </header>
      <div className="content">
        <Users/>
        <Tasks/>
      </div>
      <footer className="footer">
        Made with <span>❤</span>️ by Lady Pinzon for
        <img src="./images/bunny.svg" alt="bunny"/>
      </footer>
    </div>
  );
}

export default App;
