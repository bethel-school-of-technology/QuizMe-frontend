import React, { Component } from "react";
import { Link } from "react-router-dom";


class Logout extends Component {
    componentDidMount() {
      document.cookie = "auth=";
      fetch.get("/users/logout").then(res => console.log(res));
  }
  render() {
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