import React, { Component } from "react";
import {Link} from 'react-router-dom';
 
class Home extends Component {
  render() {
      return (
          <div style={{
              width: "50%", height: "100%",
              margin: "0 auto", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center"
          }}>
              <h1>QuizMe</h1>
              <h2>Funny Phrase</h2>
              <Link to="/SelectCategory" className="nes-btn is-primary" style={{ width: "75%", height: "50px", margin: "10px", textAlign: "center" }}>Play</Link>
              <Link to="/Scores" className="nes-btn is-primary" style={{ width: "75%", height: "50px", margin: "10px", textAlign: "center" }}>Scores</Link>
              <Link to="/Login" className="nes-btn is-primary" style={{ width: "75%", height: "50px", margin: "10px", textAlign: "center" }}>Login</Link>

          </div>
      );
  }
}
 
export default Home;
