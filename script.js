const questions = [
    new Question('Who created Star Wars?', ['Stan Lee', 'George Lucas', 'Gene Roddenberry'], 'George Lucas'),
    new Question('Which furry species lives on the forest moon of Endor?', ['Ewoks', 'C-3PO', 'Chewbacca'], 'Ewoks'),
    new Question('Which movie is the one where Luke finds out Vader is his father?', ['The Empire Strikes Back', 'The Phantom Menace', 'The Last Jedi'], 'The Empire Strikes Back'),
    new Question('Who is the mentor of Luke Skywalker?', ['Darth Vader', 'Han Solo', 'Obi-Wan Kenobi'], 'Obi-Wan Kenobi'),
    new Question('How old was Yoda when he died?', ['120', '900', '500'], '900'),
]

let quiz = new Quiz(questions);

//assigns index to the new Question
function Question (text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.amswer = answer;
}

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

function loadNewGame() {
    if(quiz.isEnded()) {
        showScores();
    } else {
        //show question
        let displayQuestion = document.getElementById('question');
        displayQuestion.innerHTML = quiz.getQuestionIndex().text;
        
        //show options
        let choices = quiz.getQuestionIndex().choices;
        for(let i = 0; i < choices.length; i++ ) {
            let option = document.getElementById('option' + i);
            option.innerHTML = choices[i];
            guess('btn' + i, choices[i]);
        }
        showProgress();
    }
}

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        loadNewGame();
    }
}

function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let element = document.getElementById('progress');
    element.innerHTML = 'Question ' + currentQuestionNumber + 'of' + quiz.questions.length;
}

function showScores() {
    let gameOverHTML = '<h1>Result</h1>';
    gameOverHTML += '<h2 id="score"> Your score:' + quiz.score + '<h2>'
    let element = document.querySelector('.container-main');
    element.innerHTML = gameOverHTML;
}

loadNewGame();