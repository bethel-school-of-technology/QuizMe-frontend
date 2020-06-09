import React from 'react';
import './Quiz.css';
var $ = require('jquery');

class Quiz extends React.Component {
    state = {questionText: "Loading screens are fun!", answers: [], correctAnswer: 0, timerValue: 60};
    question = 1;
    sessionToken;
    timeBonus = 5;
    constructor() {
        super();
        this.getQuestion = this.getQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }
    render() {
        var answers = [];
        this.state.answers.forEach((answer, index) => answers.push(<div key={index} className="nes-btn is-primary answer" onClick={() => this.nextQuestion(index)}>{answer}</div>))
        return (
            <div id='Quiz' className="nes-container is-dark">
                <div id="question" className="nes-container is-dark with-title">
                    <p className="title">Question {this.question}</p>
                    <p>{this.state.questionText}</p>
                </div>
                <div id="answers">
                    {answers}
                </div>
                <progress className="nes-progress is-primary" value={this.state.timerValue} max="60"></progress>
            </div>
        )
    }
    componentDidMount() {
        $.get("https://opentdb.com/api_token.php?command=request", data => this.sessionToken = data.token)
        .then(() => {this.getQuestion().then(() => this.startTimer())});
    }    
    getQuestion(exec) {
        return $.get(`https://opentdb.com/api.php?token=${this.sessionToken}&amount=1&category=${this.props.category}&type=multiple`, data => {
            var correctAnswer = data.results[0].correct_answer;
            var incorrectAnswers = data.results[0].incorrect_answers;
            var answers = [...incorrectAnswers, correctAnswer].sort(() => {return 0.5 - Math.random()});
            answers.forEach((element, index) => {
                answers[index] = this.htmlDecode(answers[index]);
                correctAnswer = (correctAnswer === element) ? index : correctAnswer;
            });
            if(typeof(exec) === "function") {exec()}
            this.setState({questionText: this.htmlDecode(data.results[0].question), answers: answers, correctAnswer: correctAnswer})
        })
    }
    nextQuestion(index) {
        if(index===this.state.correctAnswer) this.setState({timerValue: this.state.timerValue > 55 ? 60 : this.state.timerValue + this.timeBonus})
        this.getQuestion(() => this.question++);
        
    }
    htmlDecode(input){
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }
    async startTimer() {
        setInterval(() => {this.setState({timerValue: this.state.timerValue-1})}, 1000)
    }
}

export default Quiz;