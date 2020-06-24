// import ReactDOM from 'react-dom';
import React, { Component } from "react";
import { Link } from 'react-router-dom';
// import axios from 'axios';
var $ = require('jquery');

class Highscores extends Component {
    
    constructor() {
        super();
        this.state = {
            scoreData: {}
            
        };
        this.fetchScoreData = this.fetchScoreData.bind(this);
    }

    fetchScoreData = () => {
        return $.get("http://localhost:2020/highscores", response => {
            this.setState(
                {
                    scoreData: JSON.parse(response.data)
                }
            )
        })
    };

    componentDidMount() {
        this.fetchScoreData();
    };

    render() {
        console.log(this.state.scoreData);
        if (this.state.scoreData.length === 0) {
            return <div>Failed to fetch data from server</div>;
        }

        const scoreBoardView = this.state.scoreData.map(highscores => (
            <div>
                <div style={{
                    width: "100%", height: "100%",
                    margin: "0 auto", display: "flex",
                    alignItems: "center", justifyContent: "center"
                }}>
                    <h1>High Scores</h1>
                </div>
                <div>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                        <tr key={highscores.id}> 
                            <td>{highscores.playername}</td>
                            <td>{highscores.highscore}</td>
                        </tr>
                    </table>
                </div>
                <footer>
                    <Link to="/Home" className="nes-btn is-primary" style={{ width: "75%", height: "50px", margin: "10px", textAlign: "center" }}>Home</Link>
                </footer>

            </div>

            
        ));
        return <div>{scoreBoardView}</div>





            
            
        

    }
}

export default Highscores;