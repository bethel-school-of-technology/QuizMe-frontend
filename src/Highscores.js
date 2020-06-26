// import ReactDOM from 'react-dom';
import React, { Component } from "react";
import { Link } from 'react-router-dom';
// import axios from 'axios';
var $ = require('jquery');

class Highscores extends Component {

    constructor() {
        super();
        this.state = {
            scoreData: []
        };
        this.fetchScoreData = this.fetchScoreData.bind(this);
    }

    fetchScoreData = () => {
        return $.get("http://localhost:2020/highscores", response => {
            console.log(response);
            this.setState(
                {
                    scoreData: response
                }
            )
        })
    };

    componentDidMount() {
        this.fetchScoreData();
        console.log(this.fetchScoreData());
    };

    render() {

        console.log(this.state.scoreData);
        if (this.state.scoreData === null) {
            return <div>Failed to fetch data from server</div>;
        }

        const scoreBoardView = this.state.scoreData.map((highscores, index) => (
            <tr key={index}>
                <td style={{ paddingRight: '4em', textAlign: 'left' }}>{highscores.playername}</td>
                <td style={{ textAlign: "right" }}>{highscores.highscore}</td>
            </tr>
        ));

        return <div style={{
            width: "100%", height: "100%",
            margin: "0 auto", display: "flex",
            alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "left"
        }}>
            <div>
                <h1>High Scores</h1>
            </div>
            <br/>
            <div>
                <table>
                    <tr>
                        <th style={{ color: "red", textAlign: "left" }}>Name</th>
                        <th style={{ color: "red" }}>Score</th>
                    </tr>
                    {scoreBoardView}
                </table>
            </div>
            <br />
            <br />
            <footer style={{ position: "fixed", bottom: "20px"}}>                
                    <Link to="/" className="nes-btn is-primary" style={{ height: "50px", margin: "10px, auto", textAlign: "center", marginRight: '3em'}}>Home</Link>
                    <Link to="/SelectCategory" className="nes-btn is-secondary" style={{ height: "50px", margin: "10px, auto", textAlign: "center" }}>Play Again!</Link> 
            </footer>
        </div>
    }
}

export default Highscores;