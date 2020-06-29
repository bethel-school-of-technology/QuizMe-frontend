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
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <span style={{fontSize: "10vw"}}>
                <span style={{color: this.state.colors[5]}}>Q</span>
                <span style={{color: this.state.colors[4]}}>u</span>
                <span style={{color: this.state.colors[3]}}>i</span>
                <span style={{color: this.state.colors[2]}}>z</span>
                <span style={{color: this.state.colors[1]}}>M</span>
                <span style={{color: this.state.colors[0]}}>e</span>!
              </span>
              <Link to="/SelectCategory" className="nes-btn is-primary" style={{ fontSize: "5vw", width: "40vw", marginTop: "2vw"}}>Play</Link>
              <Link to="/Highscores" className="nes-btn is-primary" style={{ fontSize: "5vw", width: "40vw", marginTop: "2vw"}}>Scores</Link>
      </div>)
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
