import React, { Component } from "react";
import './Quiz.css';

class Quiz extends Component {
    timerMax = 5;
    state = {questionText: "Loading screens are fun!", answers: [], correctAnswer: 0, timerValue: this.timerMax, gameOver: false};
    question = 1;
    correctAnswers = 0;
    sessionToken;
    timeBonus = 5;
    timePenalty = 3;
    constructor() {
        super();
        this.getQuestion = this.getQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }
    render() {
        var answers = [];
        this.state.answers.forEach((answer, index) => 
            answers.push(<div key={index} className="nes-btn is-primary answer"
                            onClick={() => this.nextQuestion(index)}>{answer}</div>))
        if(this.state.gameOver) {
            return(
                <div style={{textAlign: "center"}}>
                    <div style={{color: "red"}}>Game Over!</div>
                    <br/>
                    Your score: { this.correctAnswers * 100 }
                    <br/>
                    <input placeholder= "Name"/> <button onClick="postScore">Confirm</button>
                </div>
            )
        }

        //need the onclick event to be referenced differently from this function, can't put a function within a function
        function postScore (url = "", data = {}) {
            const response = await fetch (url, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                  },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            });
            return response.json();
        }

        postScore('http://localhost:2020/highscores/${category}', { score })  //Where/how are we able to define this variable to be the user name/score???
            .then(data => {
            console.log(data);
        }).then(window.location.replace('http://localhost:2020/highscores/${category}'));  //no idea if this will work
        
        

        return (
            <div id='Quiz' className="nes-container is-dark">
                <div id="question" className="nes-container is-dark with-title">
                    <p className="title">Question {this.question}</p>
                    <p>{this.state.questionText}</p>
                </div>
                <div id="answers">
                    {answers}
                </div>
                <progress id="timer" className="nes-progress is-primary" value={this.state.timerValue} max={this.timerMax}></progress>
            </div>
        )
    }
    componentDidMount() {
        fetch("https://opentdb.com/api_token.php?command=request").then(data => data.json()).then(data => {this.sessionToken = data.token})
        .then(() => {this.getQuestion().then(() => this.startTimer())});
    }    
    getQuestion() {
        let category = this.props.match.params.category ? `&category=${this.props.match.params.category}` : ''
        return fetch(`https://opentdb.com/api.php?token=${this.sessionToken}&amount=1${category}`).then(data => data.json()).then(data => {
            if(data.response_code !== 0) {this.setState({gameOver: true}); return} 
            var correctAnswer = data.results[0].correct_answer;
            var incorrectAnswers = data.results[0].incorrect_answers;
            var answers = [...incorrectAnswers, correctAnswer].sort(() => {return 0.5 - Math.random()});
            answers.forEach((element, index) => {
                answers[index] = this.htmlDecode(answers[index]);
                correctAnswer = (correctAnswer === element) ? index : correctAnswer;
            });
            this.setState({questionText: this.htmlDecode(data.results[0].question), answers: answers, correctAnswer: correctAnswer})
        })
    }
    nextQuestion(index) {
        if(this.state.gameOver) return;
        var correct = index===this.state.correctAnswer;
        if(correct) {
            this.setState({timerValue: this.state.timerValue > this.timerMax-5 ? this.timerMax : this.state.timerValue + this.timeBonus})
            this.correctAnswers++;
        } else this.setState({timerValue: this.state.timerValue > this.timePenalty ? this.state.timerValue - this.timePenalty : 0})
        this.getQuestion().then(this.question++);
        var timer = document.getElementById('timer');
        timer.classList.replace('is-primary', correct ? 'is-success' : 'is-error');
        setTimeout(() => {
            timer.classList.replace(correct ? 'is-success' : 'is-error', 'is-primary');
        }, 200)
        setTimeout(() => {
            timer.classList.replace('is-primary', correct ? 'is-success' : 'is-error');
        }, 400)
        setTimeout(() => {
            timer.classList.replace(correct ? 'is-success' : 'is-error', 'is-primary');
        }, 600)
    }
    htmlDecode(input){
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }
    async startTimer() {
        var countdown = setInterval(() => {this.setState({timerValue: this.state.timerValue-1})}, 1000)
        setInterval(() => {if(this.state.timerValue === 0 || this.state.gameOver) {
            this.setState({gameOver: true});
            clearInterval(countdown);
        }})
    }
}

export default Quiz;