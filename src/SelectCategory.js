import React from 'react';
import './SelectCategory.css'
import {Link} from 'react-router-dom';

class SelectCategory extends React.Component {
    state = {category: ""}
    setCategory(e) {
        this.setState({category: e.target.options[e.target.selectedIndex].value})
    }
    constructor() {
        super();
        this.setCategory = this.setCategory.bind(this);
    }
    render() {
        return (
            <div id="quizme-select-category-container" className="nes-container is-dark">
                <h1 id="quizme-select-category-h1">Categories</h1>
                <div className="nes-select">
                    <select id="quizme-select-category-select" onChange={this.setCategory}>
                        <option>Any Category</option>
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
                <Link id="quizme-select-category-link" to={`/Quiz/${this.state.category}`} className="nes-btn is-primary">
                    Continue
                </Link>
            </div>
        )
    }
}

export default SelectCategory;