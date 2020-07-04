import React, { Component } from "react";
import {Link} from 'react-router-dom';
import './Home.css';
import Quip from "./Quip" ;

class Home extends Component {
  state = {
    colors: [
      "#FFF",
      "#0F0",
      "#F0F",
      "#FFF",
      "#0F0",
      "#F0F"
    ]
  };

  cycling = false;

  render() {
      if(!this.cycling) {this.cycleColors(); this.cycling = true}
      return ( 
      <div id="quizme-home-container">
              <span id="quizme-home-quizme">
                <span style={{color: this.state.colors[5], paddingLeft: '.5em'}}>Q</span>
                <span style={{color: this.state.colors[4]}}>u</span>
                <span style={{color: this.state.colors[3]}}>i</span>
                <span style={{color: this.state.colors[2]}}>z</span>
                <span style={{color: this.state.colors[1]}}>M</span>
                <span style={{color: this.state.colors[0]}}>e</span>
                <span style={{color: this.state.colors[5]}}>!</span>
              </span>
              <Quip id="quip"/>
              <Link to="/SelectCategory" className="nes-btn is-primary quizme-home-button" style={{marginTop: "8vh"}}>Play</Link>
              <Link to="/Highscores" className="nes-btn is-primary quizme-home-button">Scores</Link>
      </div>)
  }

  cycleColors() {
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
 
export default Home;
