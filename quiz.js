let currentQuestion = 0;
let score = 0;
let totalQuestions = questions.length;
let questionIndex = 0

let startPage = document.getElementById('start-page');
let quizPage = document.getElementById('quiz-container');
let resultPage = document.getElementById('result')

let questionElement = document.getElementById('question');
let option1 = document.getElementById('opt1');
let option2 = document.getElementById('opt2');
let option3 = document.getElementById('opt3');
let scoreCounter = document.querySelector('.counter')
let nextButton = document.getElementById('next-button');
let startButton = document.getElementById('start-button');


const loadQuestion = (index) => {
    let q = questions[index];
    questionElement.innerHTML = q.question;
    option1.innerHTML = q.option1;
    option2.innerHTML = q.option2;
    option3.innerHTML = q.option3;
    nextButton.disabled = true;
}

const loadNextQuestion = () => {
    resetPage();
    currentQuestion++;
    if(currentQuestion == totalQuestions -1) {
        nextButton.textContent = 'Finish';
    }
    if(currentQuestion === totalQuestions) {
        quizPage.style.display = 'none';
        resultPage.style.display = 'block';
        resultPage.textContent = 'Your Score ' + score;
        return;
    }
    loadQuestion(currentQuestion);
}

const answerQuestion =() => {
    let options = document.querySelectorAll('input[type=radio')
    let selectedOption = document.querySelector('input[type=radio]:checked');
    let response = selectedOption.parentElement.textContent;
    let answer = questions[currentQuestion].answer
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
    });
    nextButton.disabled = false;

}


const resetPage = () => {
    let selectedOption = document.querySelector('input[type=radio]:checked');
    let options = document.querySelectorAll('input[type=radio')
    //disable nextbutton
    nextButton.disabled = true;
    //reset classes
    options.forEach(option => {
        option.nextSibling.classList.remove('wrong');
        option.nextSibling.classList.remove('correct');
    });
   
    //deselect radio buttton
    selectedOption.checked = false;
}

startButton.addEventListener('click', () => {
    startPage.style.display = 'none';
    quizPage.style.display ='block';
    loadQuestion(questionIndex);
});

nextButton.addEventListener('click', loadNextQuestion)