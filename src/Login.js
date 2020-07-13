import React, { Component } from "react";
import './Login.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Login extends Component {
        constructor(props) {
          super(props);
          this.state = {
            username: "",
            password: "",
            colors: [
              "#FFF",
              "#0F0",
              "#F0F",
              "#FFF",
              "#0F0",
              "#F0F"
            ]
          };
        }

        cycling = false;

        handleInputChange = event => {
          const { value, name } = event.target;
          this.setState({
            [name]: value
          });
        };
      
      
        onSubmit = event => {
          console.log("FETCH")
          var username = document.getElementById("quizme-login-username").value;
          var password = document.getElementById("quizme-login-password").value;
          fetch("http://localhost:2020/users/login", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userName: username,
              password: password
            })
          }).then(response => response.text().then(text => {
            if(text !== 'null') {
              cookies.set("jwt", text);
              window.location.pathname = "/highscores";
            }
          }))
        };

        render() {
          if(!this.cycling) {this.cycleColors(); this.cycling = true}
          return (
            <div id="quizme-login-container">
              <span id="quizme-home-quizme">
                <span style={{color: this.state.colors[5], paddingLeft: '.5em'}}>Q</span>
                <span style={{color: this.state.colors[4]}}>u</span>
                <span style={{color: this.state.colors[3]}}>i</span>
                <span style={{color: this.state.colors[2]}}>z</span>
                <span style={{color: this.state.colors[1]}}>M</span>
                <span style={{color: this.state.colors[0]}}>e</span>!
              </span>
              <input
                id="quizme-login-username"
                type="text"
                name="username"
                required
                className="nes-input"
                onChange={this.handleInputChange}
              />
              <input
                id="quizme-login-password"
                type="password"
                name="password"
                required
                className="nes-input"
                onChange={this.handleInputChange}
              />
              <input type="button" id="quizme-login-button" value="Login" className="nes-btn is-primary quizme-login-button" onClick={this.onSubmit}/>
            </div>
          );
        }cycleColors() {
          setInterval(() => {
            var newColors = ["","","","","",""];
            this.state.colors.forEach((color, index) => {
              var x = index === 5 ? 0 : index+1;
              newColors[index] = this.state.colors[x];
            });
            this.setState({colors: newColors})
          }, 1000)
        }
      }
      
      
export default Login;