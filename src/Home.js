import React, { Component } from "react";
import {Link} from 'react-router-dom';
 
class Home extends Component {
  render() {
      return ( 
      <div>
              <h1 style={{textAlign: "center"}}>QuizMe</h1>
              <h2 style={{textAlign: "center"}} id="funnyPhrase">Funny Phrase</h2>
              <Link to="/SelectCategory" className="nes-btn is-primary" style={{ width: "100%", height: "50px"}}>Play</Link>
              <Link to="/Scores" className="nes-btn is-primary" style={{ width: "100%", height: "50px"}}>Scores</Link>
              <Link to="/Login" className="nes-btn is-primary" style={{ width: "100%", height: "50px"}}>Login</Link>
      </div>)
  }
}
 
export default Home;
