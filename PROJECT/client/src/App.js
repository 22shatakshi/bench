import React from "react";
import './App.css';
import Nav from './components/Nav';
import ManageProfile from './components/ManageProfile';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <p>Bench</p>
        </header>
        <div className="form">
          <ManageProfile />
        </div>
      </div>
    </Router>
  );
}

export default App;
