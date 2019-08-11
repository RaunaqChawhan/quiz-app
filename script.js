const startButton = document.getElementById('start-button');
const questionOptions = document.querySelector('.questions-options');
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
    displayQuestion();
    console.log(questions);
}

function displayQuestion() {
  // console.log('working');
  for(let i = 0; i < questions.length; i++) {
    if(questions[i].questionNumber === questionNumber) {
      const question =  questions[i].question;
      const options = questions[i].options;
      questionOptions.innerHTML = `
        <h1 class="question">${question}</h1>
        <p class="options" draggable="true" ondragstart="dragStart()">${options[i]}</p>
        <p class="options" draggable="true" ondragstart="dragStart()">${options[i + 1]}</p>
        <p class="options" draggable="true" ondragstart="dragStart()">${options[i + 2]}</p>
        <p class="options" draggable="true" ondragstart="dragStart()">${options[i + 3]}</p>
      `;
      // console.log('working');
    }
  }
}

function startQuiz() {
    fetchQuestions();
}
