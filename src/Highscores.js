import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

class Scores extends Component {
    constructor(props) {
        super(props)
               this.state = {
                highscores: []
              }
        componentDidMount() {
          axios.get(`http://localhost:3000`)
            .then(res => {
              const highscores = res.data;
              this.setState({ highscores });
            })
        } 
    
    render() {
        return (
            <div style={{
                width: "50%", height: "100%",
                margin: "0 auto", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center"
            }}>
                <h1>QuizMe Leader Board</h1>
                <Link to="/Home" className="nes-btn is-primary" style={{ width: "75%", height: "50px", margin: "10px", textAlign: "center" }}>Home</Link>
            </div>
            <div>
            <table>
            <tr>
            <th>Name</th>
            <th>Score</th>
            </tr>
            { this.state.highscores.map(highscores => 
            <tr>
                <td>{highscores.playername}</td>
                <td>{highscores.score}</td>
                </tr>
            )}
            </table>
            </div> 
        );
    }
}


export default Scores;