import React, { Component } from "react";
import {Link} from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div style={{
                width: "50%", height: "100%",
                margin: "0 auto", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center"
            }}>
                <input type="text" placeholder="Username" className="nes-input is-primary" style={{ width: "100%", height: "50px", margin: "10px", textAlign: "center" }}/>  
                <input type="password" placeholder="********" className="nes-input is-primary" style={{ width: "100%", height: "50px", margin: "10px", textAlign: "center" }}/>  
                <input type="button" value="Login" className="nes-btn is-primary" style={{ width: "100%", height: "50px", margin: "10px", textAlign: "center" }}/>  

            </div>
        )}}
export default Login;