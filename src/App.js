import React, {useEffect, useState} from 'react';
//import logo from './logo.svg';
import logo from './grape_purpback.svg'
import './App.css';
import Login from "./components/Login.js";

// Login Page - Vineyard Manager
function App() {

	const [loggedOn, setLoggedOn] = useState(false);
	const [data, setData] = useState(null);

	// Data
	const hook = () => {
		console.log("Hook");
		fetch("data.json")
			.then(response => response.json())
			.then(json => {
				console.log(json);
				setData(json);
			});
	};

	useEffect(hook, []);

	return (
		<div className="App">
			<header className="App-header">
				<h1>Vineyard Manager</h1>
				<img src={logo} className="App-logo" alt="logo" />
				<Login logOn={loggedOn} setLogOn={setLoggedOn} uName={data ? data.companyName : null}/>

			</header>
		</div>
	);
}

export default App;
