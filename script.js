const startButton = document.getElementById('start-button');
let questions;

//start-quiz
startButton.addEventListener('click', startQuiz);


//Quiz functions
function fetchQuestions() {
    fetch('https://cors-anywhere.herokuapp.com/https://opentdb.com/api.php?amount=10&type=multiple')
    .then((result) => result.json())
    .then(function(data) {
        const questionSet = data.results;
        transferQuestions(questionSet);
        //console.log(questionSet);
    });
}

function transferQuestions(questionSet) {
    questions = questionSet;
    console.log(questions);
}

function startQuiz() {
    fetchQuestions();
}
