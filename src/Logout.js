import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import './Logout.css';
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

  cycling = false;

  render() {
    if(!this.cycling) {this.cycleColors(); this.cycling = true}
    cookies.remove("jwt");
    return (
      <div id="quizme-login-container">
        <span id="quizme-home-quizme">
          <span style={{color: this.state.colors[5], paddingLeft: '.5em'}}>Q</span>
          <span style={{color: this.state.colors[4]}}>u</span>
          <span style={{color: this.state.colors[3]}}>i</span>
          <span style={{color: this.state.colors[2]}}>z</span>
          <span style={{color: this.state.colors[1]}}>M</span>
          <span style={{color: this.state.colors[0]}}>e</span>!
        </span>
        <h3 style={{textAlign: "center"}}>You Are Now Logged Out</h3>
        <Link to="/" className="nes-btn is-primary">
          Home
        </Link>
      </div>
    );
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


export default Logout