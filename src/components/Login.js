import React, {useState} from 'react';
import '../App.css';

const Login = ({logOn, setLogOn, uName}) => {

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
                setLogOn(true);
            }
        }, 50);
        setUserName(uName);
    }

        return ( logOn ? <h3 id="CompanyName">{userName}</h3> :
            <div className="login">
                <form>
                    <div className="login-container">
                        <label htmlFor="uname"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="uname" required onChange={handleUserNameChange}/>
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required/>
                        <button type="submit" onClick={fadeLogin}>Login</button>
                        <label id="remember">
                            <input type="checkbox" name="remember"/>Remember me
                        </label>
                    </div>
                </form>
                    <div className="login-sub-container">
                        <form action="https://google.com">
                            <button type="submit">Forgot password?</button>
                        </form>
                    </div>
            </div>
        );
}

export default Login;