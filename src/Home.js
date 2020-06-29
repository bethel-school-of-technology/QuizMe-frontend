import React, { Component } from "react";
import {Link} from 'react-router-dom';
import './Home.css';
 
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
  }

  cycling = false;

  render() {
      if(!this.cycling) {this.cycleColors(); this.cycling = true}
      return ( 
      <div id="container">
              <span id="QuizMe">
                <span style={{color: this.state.colors[5]}}>Q</span>
                <span style={{color: this.state.colors[4]}}>u</span>
                <span style={{color: this.state.colors[3]}}>i</span>
                <span style={{color: this.state.colors[2]}}>z</span>
                <span style={{color: this.state.colors[1]}}>M</span>
                <span style={{color: this.state.colors[0]}}>e</span>!
              </span>
              <Link to="/SelectCategory" className="nes-btn is-primary">Play</Link>
              <Link to="/Highscores" className="nes-btn is-primary">Scores</Link>
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
