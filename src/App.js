import React, {useEffect, useState} from 'react';
import logo from './grape_purpback.svg'
import './App.css';
import Login from "./components/Login.js";
import Vineyards from "./components/Vineyards";

// Login Page - Vineyard Manager
function App() {

	const [isLoggedOn, setLoggedOn] = useState(false);
	const [data, setData] = useState(null);

	// Data
	// add date field to sensor from vineyard object
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
				<Login logOn={isLoggedOn} setLogOn={setLoggedOn} uName={data ? data.companyName : null} />
				{isLoggedOn ? <Vineyards vineyardData={data} /> : null}
			</header>
		</div>
	);
}

export default App;
