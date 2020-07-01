import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import './Logout.css';
const cookies = new Cookies();

class Logout extends Component {
  render() {
    cookies.remove("jwt");
    return (
      <div id="quizme-logout-container">
        <h3 style={{textAlign: "center"}}>You Are Now Logged Out</h3>
        <Link to="/" className="nes-btn is-primary">
          Home
        </Link>
      </div>
    );
  }
}

export default Logout