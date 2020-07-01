import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Logout extends Component {
  render() {
    cookies.remove("jwt");
    return (
      <div style={{ fontFamily: "optima" }} className="m-4">
        <h3>You Are Now Logged Out</h3>
        <Link to="/Login" className="nes-btn is-primary quizme-logout-button ">
          Log Back In!
        </Link>
      </div>
    );
  }
}

export default Logout