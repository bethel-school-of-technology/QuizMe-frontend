import React, { Component } from "react";
import './Quiz.css';
import Highscores from "./Highscores";

class Quiz extends Component {
    timerMax = 60;
    state = { 
        questionText: "Loading screens are fun!", 
        answers: [], 
        correctAnswer: 0, 
        timerValue: this.timerMax, 
        gameOver: false 
    };
    question = 1;
    correctAnswers = 0;
    sessionToken;
    timeBonus = 5;
    timePenalty = 3;
    category = "";
    
    constructor() {
        super();
        this.getQuestion = this.getQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.getAllQuestions = this.getAllQuestions.bind(this);
        this.questionInfo = ({ 
            questionText: this.question, 
            answers: this.answers, 
            correctAnswer: this.correctAnswer 
        })
    }

    

    render() {
        
        if(!(this.category && this.props.match.params)) {this.category =  parseInt(this.props.match.params.category) || ""}
        var answers = [];
        this.state.answers.forEach((answer, index) =>
        answers.push(
            <div key={index} className="nes-btn is-primary answer" onClick={() => this.nextQuestion(index)}>{answer}</div>))
        if (this.state.gameOver) {
            
            return (
                <Highscores category={this.category} correctAnswers={this.correctAnswers}/>
            )

        }
       
        return (
            <div id='quizme-quiz-container' className="nes-container is-dark">
                <div id="quizme-quiz-question" className="nes-container is-dark with-title">
                    <p id="quizme-quiz-question-number" className="title">Question {this.question}</p>
                    <p>{this.state.questionText}</p>
                </div>
                <div id="quizme-quiz-answers">
                    {answers}
                </div>
                <progress id="timer" className="nes-progress is-primary" value={this.state.timerValue} max={this.timerMax}></progress>
            </div>
        )
    }

    componentDidMount() {
        fetch("https://opentdb.com/api_token.php?command=request").then(data => data.json()).then(data => { this.sessionToken = data.token })
            .then(this.getQuestion()).then(this.startTimer());
    }

    getAllQuestions() {
        let category = this.props.match.params.category ? `&category=${this.props.match.params.category}` : ''
        return fetch(`https://opentdb.com/api.php?token=${this.sessionToken}&amount=10${category}`)
        .then(data => data.json())
        .then(data => {

            let tempArray = []
            for (var i = 0; i < data.results.length; i++) {
                tempArray.push(data.results[i])  
            }

            if (data.response_code !== 0) { this.setState({ gameOver: true }); return }
            var correctAnswer = data.results[0].correct_answer;
            var incorrectAnswers = data.results[0].incorrect_answers;
            var answers = [...incorrectAnswers, correctAnswer].sort(() => { return 0.5 - Math.random() });
            answers.forEach((element, index) => {
                answers[index] = this.htmlDecode(answers[index]);
                correctAnswer = (correctAnswer === element) ? index : correctAnswer;
            });

            this.setState({ 
                questionText: this.htmlDecode(data.results[0].question), 
                answers: answers, 
                correctAnswer: correctAnswer 
            })


            console.log(this.state);
            console.log(this.questionInfo);
        });
    }

    getQuestion() {
        
        //somehow need to bring question array into this
        return  () => {
            if (this.questionInfo.response_code !== 0) { this.setState({ gameOver: true }); return }
            var correctAnswer = this.questionInfo.results[0].correct_answer;
            var incorrectAnswers = this.questionInfo.results[0].incorrect_answers;
            var answers = [...incorrectAnswers, correctAnswer].sort(() => { return 0.5 - Math.random() });
            answers.forEach((element, index) => {
                answers[index] = this.htmlDecode(answers[index]);
                correctAnswer = (correctAnswer === element) ? index : correctAnswer;
            });
            
        }
    }

    nextQuestion(index) {
        if (this.state.gameOver) return;
        var correct = index === this.state.correctAnswer;
        if (correct) {
            this.setState({ timerValue: this.state.timerValue > this.timerMax - 5 ? this.timerMax : this.state.timerValue + this.timeBonus })
            this.correctAnswers++;
        } else this.setState({ timerValue: this.state.timerValue > this.timePenalty ? this.state.timerValue - this.timePenalty : 0 })
        if(this.state.questionInfo == null) {
        this.getAllQuestions().then(this.state.getQuestion());
        } 
        else {
        this.getQuestion().then(this.question++);
        }
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

    htmlDecode(input) {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

    async startTimer() {
        var countdown = setInterval(() => { this.setState({ timerValue: this.state.timerValue - 1 }) }, 1000)
        setInterval(() => {
            if (this.state.timerValue === 0 || this.state.gameOver) {
                this.setState({ gameOver: true });
                clearInterval(countdown);
            }
        })
    }
}

export default Quiz;