const header = document.querySelector('.intro');
const startButton = document.getElementById('start-button');
const questionOptions = document.querySelector('.questions-options');
const answer = document.querySelector('.answer');
let questions;
let questionNumber = 1;

//start-quiz
startButton.addEventListener('click', startQuiz);
answer.addEventListener('dragover', dragOver);
answer.addEventListener('dragenter', dragEnter);
answer.addEventListener('dragleave', dragLeave);
answer.addEventListener('drop', dragDrop);

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
      let options = questions[i].options;
      // questionOptions.innerHTML = `
      //   <h1 class="question">${question}</h1>
      //   <p class="options" draggable="true" ondragstart="dragStart()" ondragend="dragEnd()" data-option="${options[i]}">${options[i]}</p>
      //   <p class="options" draggable="true" ondragstart="dragStart()" ondragend="dragEnd()" data-option="${options[i + 1]}">${options[i + 1]}</p>
      //   <p class="options" draggable="true" ondragstart="dragStart()" ondragend="dragEnd()" data-option="${options[i + 2]}">${options[i + 2]}</p>
      //   <p class="options" draggable="true" ondragstart="dragStart()" ondragend="dragEnd()" data-option="${options[i + 3]}">${options[i + 3]}</p>
      //   `;
      questionOptions.innerHTML = `
        <h1 class="question">${question}</h1>
        <p class="options" draggable="true" data-option="${options[i]}">${options[i]}</p>
        <p class="options" draggable="true" data-option="${options[i + 1]}">${options[i + 1]}</p>
        <p class="options" draggable="true" data-option="${options[i + 2]}">${options[i + 2]}</p>
        <p class="options" draggable="true" data-option="${options[i + 3]}">${options[i + 3]}</p>
        `;
      // console.log('working');
    }
    // document.querySelectorAll('.options')[i].addEventListener('dragstart', dragStart);
    // document.querySelectorAll('.options')[i].addEventListener('dragend', dragEnd);
  }
  //for(let i = 0; i < questions.length; i++) {
    // document.querySelectorAll('.options')[0].addEventListener('dragstart', dragStart);
    // document.querySelectorAll('.options')[0].addEventListener('dragend', dragEnd);
  //}

  let options = document.querySelectorAll('.options');
  options.forEach((option) => {
    option.addEventListener('dragstart', dragStart);
    option.addEventListener('dragend', dragEnd);
  });
  //addingListeners();
}

// function addingListeners() {
//   let options = document.querySelectorAll('.options');
//   options.forEach((option) => {
//     option.addEventListener('dragstart', dragStart);
//     option.addEventListener('dragend', dragEnd);
//   });
//   console.log(options);
// }

//Drag functions
function dragStart() {
  console.log(this);
}

function dragEnd(e) {
  // console.log(this);
}

function dragOver(e) {
  // e.preventDefault();
  // console.log(this);
}

function dragEnter() {
// console.log(this);
}

function dragLeave() {
// console.log(this);
}

function dragDrop() {
// console.log(this);
}

function startQuiz() {
    fetchQuestions();
    // setTimeout(() => header.classList.add('hide'), 1000);
    header.classList.add('hide');
}
