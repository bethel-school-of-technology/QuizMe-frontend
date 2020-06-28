import React, { Component } from "react";
import {Link} from 'react-router-dom';
 
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
      [
              <h1 key={0} id="quizme" style={{textAlign: "center", fontSize: "8em", maxWidth: "75vw"}}>
                <span style={{color: this.state.colors[5]}}>Q</span>
                <span style={{color: this.state.colors[4]}}>u</span>
                <span style={{color: this.state.colors[3]}}>i</span>
                <span style={{color: this.state.colors[2]}}>z</span>
                <span style={{color: this.state.colors[1]}}>M</span>
                <span style={{color: this.state.colors[0]}}>e</span>!
              </h1>,
              <Link key={1} to="/SelectCategory" className="nes-btn is-primary" style={{ width: "100%", height: "50px"}}>Play</Link>,
              <Link key={2} to="/Highscores" className="nes-btn is-primary" style={{ width: "100%", height: "50px"}}>Scores</Link>
      ])
  }

  async cycleColors() {
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
