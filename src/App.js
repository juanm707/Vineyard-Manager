import React from 'react';
//import logo from './logo.svg';
import logo from './grape_purpback.svg'
import './App.css';
import Login from "./components/Login.js";

// Login Page - Vineyard Manager

function App() {
  return (
	<div className="App">
		<header className="App-header">
			<h1>Vineyard Manager</h1>
			<img src={logo} className="App-logo" alt="logo" />
			<Login />
		</header>
	</div>
  );
}

export default App;
