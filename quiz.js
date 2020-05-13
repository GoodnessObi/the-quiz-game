let currentQuestion = 0;
let score = 0;
let totalQuestions = questions.length;
let questionIndex = 0;

let startPage = document.getElementById('start-page');
let quizPage = document.getElementById('quiz-container');
let resultPage = document.getElementById('result');

let questionElement = document.getElementById('question');
let option1 = document.getElementById('opt1');
let option2 = document.getElementById('opt2');
let option3 = document.getElementById('opt3');
let scoreCounter = document.querySelector('.counter');
let nextButton = document.getElementById('next-button');
let startButton = document.getElementById('start-button');
let replayButton = document.getElementById('restart');
let progressCounter = document.querySelector('#progress');
let quote = document.querySelector('#quote');


const loadQuestion = (index) => {
    let q = questions[index];
    let questionNumber = currentQuestion + 1
    questionElement.innerHTML = q.question;
    option1.innerHTML = q.option1;
    option2.innerHTML = q.option2;
    option3.innerHTML = q.option3;
    quote.innerHTML = q.quote;
    progressCounter.innerHTML = 'Question ' + questionNumber + ' of ' + totalQuestions;
    nextButton.disabled = true;
}

const loadNextQuestion = () => {
    resetPage();
    currentQuestion++;
    if(currentQuestion == totalQuestions -1) {
        nextButton.textContent = 'Finish';
    }
    if(currentQuestion === totalQuestions) {
        let finalScore = document.getElementById('final-score');
        quizPage.style.display = 'none';
        resultPage.style.display = 'block';
        finalScore.textContent = 'You scored ' + score + ' of ' + totalQuestions;
        return;
    }
    loadQuestion(currentQuestion);
}

const answerQuestion = () => {
    let options = document.querySelectorAll('input[type=radio')
    let selectedOption = document.querySelector('input[type=radio]:checked');
    let response = selectedOption.parentElement.textContent;
    let answer = questions[currentQuestion].answer;
    if(answer != response) {
        //add classList.wrong to label
        selectedOption.nextSibling.classList.add('wrong');
    } else {
        score += 1;
        scoreCounter.textContent = score;
    }
    options.forEach(option => {
        if(option.parentElement.textContent === answer) {
            option.nextSibling.classList.add('correct');
        }
        option.disabled =true;
    });
    
    nextButton.disabled = false;
}

const resetPage = () => {
    let selectedOption = document.querySelector('input[type=radio]:checked');
    let options = document.querySelectorAll('input[type=radio');
    //disable nextbutton
    nextButton.disabled = true;
    //reset classes
    options.forEach(option => {
        option.nextSibling.classList.remove('wrong');
        option.nextSibling.classList.remove('correct');
        option.disabled = false;
    });
   
    //deselect radio buttton
    selectedOption.checked = false;
}

startButton.addEventListener('click', () => {
    startPage.style.display = 'none';
    quizPage.style.display ='block';
    loadQuestion(questionIndex);
});

nextButton.addEventListener('click', loadNextQuestion);

replayButton.addEventListener('click', () => {
    resultPage.style.display ='none';
    quizPage.style.display ='block';
    nextButton.textContent = 'Next Question';
    score = 0;
    scoreCounter.textContent = score;
    currentQuestion = 0;
    loadQuestion(currentQuestion);
});
