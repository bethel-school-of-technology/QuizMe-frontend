import React, { Component } from "react";
 
class Home extends Component {
  render() {
      return (
          <div style={{
              width: "50%", height: "100%", backgroundColor: "red",
              margin: "0 auto", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center"
          }}>
              <h1>QuizMe</h1>
              <h2>Funny Phrase</h2>
              <input type="button" value="Play" style={{ width: "75%", height: "50px", margin: "10px" }} />
              <input type="button" value="Scoreboard" style={{ width: "75%", height: "50px", margin: "10px" }} />
          </div>
      );
  }
}
 
export default Home;
