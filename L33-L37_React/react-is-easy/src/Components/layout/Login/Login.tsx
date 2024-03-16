import { SyntheticEvent, useEffect, useState } from "react";
import "./Login.css";

function Login(): JSX.Element {
    //let ourTime=new Date().toLocaleTimeString();
    const [ourTime, setTime] = useState(new Date().toLocaleTimeString());
    const [userName, setUserName] = useState("");
    const [userPass, setUserPass] = useState("");

    const updateUserName = (e: SyntheticEvent) => {
        setUserName((e.target as HTMLInputElement).value);
        //console.log((e.target as HTMLInputElement).value);
        //console.log("user name: ",userName)
    }
    const updateUserPass = (e: SyntheticEvent) => {
        setUserPass((e.target as HTMLInputElement).value);
        // console.log("user pass: ", userPass);
    }

    useEffect(() => {
        setInterval(() => {
            // console.log("time was changed")
            //ourTime=new Date().toLocaleTimeString(); will not work in react , we are using Virtual DOM
            setTime(new Date().toLocaleTimeString());
        }, 800);
    }, []);

    return (
        <div className="login Box">
            <h2>Login form</h2><hr />
            <input type="text" placeholder="User name..." onKeyUp={updateUserName} /><br />
            <input type="password" placeholder="User password..." onChange={updateUserPass} /><br /><br />
            <input type="button" value="Login" />
            <hr />
            <hr />
            {ourTime}
        </div>
    );
}

export default Login;