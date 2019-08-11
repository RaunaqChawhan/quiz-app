const startButton = document.getElementById('start-button');
let questions;
let questionNumber = 1;

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
    for(let i = 0; i < questions.length; i++) {
      questions[i].questionNumber = i + 1;
      questions[i].options = [];
      questions[i].options.push(...questions[i].incorrect_answers);
      let index = Math.round(Math.random() * 3);
      questions[i].options.splice(index, 0, questions[i].correct_answer);
    }
    console.log(questions);
}

function startQuiz() {
    fetchQuestions();
}
