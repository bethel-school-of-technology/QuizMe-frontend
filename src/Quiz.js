import React, { Component } from "react";
import './Quiz.css';
import Highscores from "./Highscores";
import questions from './questions.json';
class Quiz extends Component {
    timerMax = 60;
    state = { questionText: "Loading screens are fun!", answers: [], correctAnswer: 0, timerValue: this.timerMax, gameOver: false };
    question = 0;
    correctAnswers = 0;
    sessionToken;
    timeBonus = 5;
    timePenalty = 3;
    category = "";
    allQuestions = [];

    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    constructor() {
        super();
        this.getQuestion = this.getQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }



    render() {

        if (!(this.category && this.props.match.params)) { this.category = parseInt(this.props.match.params.category) || "" }
        var answers = [];
        this.state.answers.forEach((answer, index) =>
            answers.push(<div key={index} className="nes-btn is-primary answer"
                onClick={() => this.nextQuestion(index)}>{answer}</div>))
        if (this.state.gameOver) {

            return (
                <Highscores category={this.category} correctAnswers={this.correctAnswers} />
            )

        }

        return (
            <div id='quizme-quiz-container' className="nes-container is-dark">
                <div id="quizme-quiz-question" className="nes-container is-dark with-title">
                    <p id="quizme-quiz-question-number" className="title">Question {this.question + 1}</p>
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
        this.getAllQuestions(); 
        this.shuffle(this.allQuestions); 
        this.getQuestion();
        this.startTimer();
    }
    getAllQuestions() {
        this.allQuestions = questions.categories[this.props.match.params.category];

    }
    getQuestion() {
        let category = this.props.match.params.category;
        if (this.question === this.allQuestions.length) { this.setState({ gameOver: true }); return }
        var correctAnswer = questions.categories[category][this.question].correct_answer;
        var incorrectAnswers = questions.categories[category][this.question].incorrect_answers;
        var answers = [...incorrectAnswers, correctAnswer].sort(() => { return 0.5 - Math.random() });
        answers.forEach((element, index) => {
            answers[index] = this.htmlDecode(answers[index]);
            correctAnswer = (correctAnswer === element) ? index : correctAnswer;
        });
        this.setState({ questionText: this.htmlDecode(questions.categories[category][this.question].question), answers: answers, correctAnswer: correctAnswer })
    }
    nextQuestion(index) {
        if (this.state.gameOver) return;
        var correct = index === this.state.correctAnswer;
        if (correct) {
            this.setState({ timerValue: this.state.timerValue > this.timerMax - 5 ? this.timerMax : this.state.timerValue + this.timeBonus })
            this.question++;
            this.getQuestion();
            this.correctAnswers++;
        } else {
            this.setState(
                { timerValue: this.state.timerValue > this.timePenalty ? this.state.timerValue - this.timePenalty : 0 });
            this.question++;
            this.getQuestion();

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