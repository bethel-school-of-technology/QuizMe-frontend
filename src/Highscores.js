// import ReactDOM from 'react-dom';
import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Highscores extends Component {
    constructor() {
        super();
        this.state = {
            scoreData: null,
            category: ""
        };
        this.fetchScoreData = this.fetchScoreData.bind(this);
    }
    
    fetchScoreData = (category) => {
        return fetch(`http://localhost:2020/highscores/${category}`).then(data => data.json()).then(response => {
            this.setState(
                {
                    scoreData: response
                }
            );
        })
    };

    render() {
        if (!this.state.scoreData) this.fetchScoreData("");

        return (
        <div style={{
            width: "100%", height: "100%",
            margin: "0 auto", display: "flex",
            alignItems: "center", justifyContent: "center", flexDirection: "column"
        }}>
            {this.state.scoreData ? 
                (<div className="nes-container is-dark">
                    <h1 style={{textAlign: "center"}}>High Scores</h1>
                    <div className="nes-select" style={{marginTop: "10px"}}>
                        <select id="category" onChange={e => this.fetchScoreData(e.target.options[e.target.selectedIndex].value)}>
                            <option value="">Any Category</option>
                            <option value="9">General Knowledge</option>
                            <option value="10">Entertainment: Books</option>
                            <option value="11">Entertainment: Film</option>
                            <option value="12">Entertainment: Music</option>
                            <option value="13">Entertainment: Musicals &amp; Theatres</option>
                            <option value="14">Entertainment: Television</option>
                            <option value="15">Entertainment: Video Games</option>
                            <option value="16">Entertainment: Board Games</option>
                            <option value="17">Science &amp; Nature</option>
                            <option value="18">Science: Computers</option>
                            <option value="19">Science: Mathematics</option>
                            <option value="20">Mythology</option>
                            <option value="21">Sports</option>
                            <option value="22">Geography</option>
                            <option value="23">History</option>
                            <option value="24">Politics</option>
                            <option value="25">Art</option>
                            <option value="26">Celebrities</option>
                            <option value="27">Animals</option>
                            <option value="28">Vehicles</option>
                            <option value="29">Entertainment: Comics</option>
                            <option value="30">Science: Gadgets</option>
                            <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                            <option value="32">Entertainment: Cartoon &amp; Animations</option>
                        </select>
                    </div>
                    <table style={{width: "100%", marginTop: "10px"}}>
                        <tbody>
                            <tr style={{color: "red"}}>
                                <th>Name</th>
                                <th style={{textAlign: "right"}}>Score</th>
                            </tr>
                            {
                                this.state.scoreData.map((highscores, index) => (
                                    <tr key={index}> 
                                        <td>{highscores.playername}</td>
                                        <td style={{textAlign: "right"}}>{highscores.highscore}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>) : <div>Fetching score data...</div>}
            <footer style={{position: "fixed", bottom: "20px"}}>
                <Link to="/" className="nes-btn is-primary" style={{ height: "50px", margin: "10px, auto", textAlign: "center" }}>Home</Link>
                <Link to="/SelectCategory" className="nes-btn is-secondary" style={{ height: "50px", margin: "10px, auto", textAlign: "center" }}>Play Again!</Link>
            </footer>
        </div>
        )
    }
}

export default Highscores;