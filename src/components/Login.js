import React, {useState} from 'react';
import '../App.css';

const Login = () => {

    const [loggedOn, setLoggedOn] = useState(false);
    const [userName, setUserName] = useState('');

    const handleUserNameChange = (event) => {
        console.log("Username", event.target.value);
        setUserName(event.target.value);
    }

    const fadeLogin = (event) => {
        var loginFadeTarget = document.getElementsByClassName("login")[0];
        //loginFadeTarget[0].style.opacity = 0;
        var fadeEffect = setInterval(() => {
            if (!loginFadeTarget.style.opacity) {
                loginFadeTarget.style.opacity = 1;
            }
            if (loginFadeTarget.style.opacity > 0) {
                loginFadeTarget.style.opacity -= 0.04;
            } else {
                clearInterval(fadeEffect);
                setLoggedOn(true);
            }
        }, 50);
    }

        return ( loggedOn ? <h3>{userName} Vineyard Management</h3> :
            <div className="login">
                <form>
                    <div className="login-container">
                        <label htmlFor="uname"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="uname" required onChange={handleUserNameChange}/>
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required/>
                        <button type="submit" onClick={fadeLogin}>Login</button>
                        <label>
                            <input type="checkbox" name="remember"/>Remember me
                        </label>
                    </div>
                    <div className="login-sub-container">
                        <form action="https://google.com">
                            <button type="submit">Forgot password?</button>
                        </form>
                    </div>
                </form>
            </div>
        );
}

export default Login;