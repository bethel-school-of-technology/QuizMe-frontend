import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  render() {
    cookies.remove("jwt");
    return (
      <div id="quizme-login-container">
              <span id="quizme-home-quizme">
                <span style={{color: this.state.colors[5]}}>Q</span>
                <span style={{color: this.state.colors[4]}}>u</span>
                <span style={{color: this.state.colors[3]}}>i</span>
                <span style={{color: this.state.colors[2]}}>z</span>
                <span style={{color: this.state.colors[1]}}>M</span>
                <span style={{color: this.state.colors[0]}}>e</span>!
              </span>
        <h3>You Are Now Logged Out</h3>
        <Link to="/Login" className="nes-btn is-primary quizme-logout-button ">
          Log Back In!
        </Link>
      </div>
    );
  }
}

export default Logout