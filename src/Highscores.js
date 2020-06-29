
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './Highscores.css';

class Highscores extends Component {
    constructor() {
        super();
        this.state = {
            scoreData: null,
            posted: false
        };
        this.fetchScoreData = this.fetchScoreData.bind(this);
        this.postScore = this.postScore.bind(this);

    }

    postScore (url = "https://api.quizme.dev/highscores/") {
        var data = {
            category: this.props.category,
            playername: document.getElementById("nameInput").value,
            highscore: this.props.correctAnswers * 100
        };
        this.setState({posted: true});
        fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'origin-when-cross-origin',
            body: JSON.stringify(data)
        }).then(() => this.fetchScoreData(this.props.category || ""))
        .catch(() => this.setState({posted: false}));
    };
    
    fetchScoreData = (category) => {
        return fetch(`https://api.quizme.dev/highscores/${category}`).then(data => data.json()).then(response => {
            this.setState(
                {
                    scoreData: response
                }
            );
        })
    };

    render() {
        if (!this.state.scoreData) this.fetchScoreData(this.props.category || "");
        return ([
            this.state.scoreData ? 
                (<div id="quizme-highscores-container" className="nes-container is-dark">
                    <h1 style={{textAlign: "center"}}>High Scores</h1>
                        {
                            this.props.category === undefined || this.state.posted? 
                            <div className="nes-select">
                                <select id="category" onChange={e => this.fetchScoreData(e.target.options[e.target.selectedIndex].value)}>
                                    <option value="">All Categories</option>
                                    <option value="0">Any Category</option>
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
                            :
                            <></>
                        }
                    <table >
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
                            {
                                (this.state.posted || this.props.category === undefined) ? 
                                    <></> : 
                                    <tr id="quizme-highscores-input">
                                        <td><input id="nameInput" placeholder="Player Name" className="nes-input is-dark"/></td>
                                        <td style={{textAlign: "right"}}><button className="nes-btn is-primary" onClick={() => this.postScore()} >Confirm</button></td>
                                    </tr>
                            }
                            
                            
                        </tbody>
                    </table>
                    
                </div>) 
                :
                <div>Fetching score data...</div>,
                <footer id="quizme-highscores-footer">
                    <Link to="/" className="nes-btn is-primary">Home</Link>
                    <Link to="/SelectCategory" className="nes-btn is-secondary">Play Again!</Link>
                </footer>
            ]
        )
    }
}

export default Highscores;