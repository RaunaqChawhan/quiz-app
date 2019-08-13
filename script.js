const header = document.querySelector('.intro');
const startButton = document.getElementById('start-button');
const questionOptions = document.querySelector('.questions-options');
const answer = document.querySelector('.answer');
const nextQuestion = document.querySelector('.next-question');
let questions;
let questionNumber = 1;

//start-quiz
startButton.addEventListener('click', startQuiz);
nextQuestion.addEventListener('click', nextQuestionDisplay);
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
      console.log(options);
      // questionOptions.innerHTML = `
      //   <h1 class="question">${question}</h1>
      //   <p class="options" draggable="true" ondragstart="dragStart()" ondragend="dragEnd()" data-option="${options[i]}">${options[i]}</p>
      //   <p class="options" draggable="true" ondragstart="dragStart()" ondragend="dragEnd()" data-option="${options[i + 1]}">${options[i + 1]}</p>
      //   <p class="options" draggable="true" ondragstart="dragStart()" ondragend="dragEnd()" data-option="${options[i + 2]}">${options[i + 2]}</p>
      //   <p class="options" draggable="true" ondragstart="dragStart()" ondragend="dragEnd()" data-option="${options[i + 3]}">${options[i + 3]}</p>
      //   `;
      questionOptions.innerHTML = `
        <h1 class="question">${question}</h1>
        <p class="options" id="option-1" draggable="true" data-option="${options[0]}">${options[0]}</p>
        <p class="options" id="option-2" draggable="true" data-option="${options[1]}">${options[1]}</p>
        <p class="options" id="option-3" draggable="true" data-option="${options[2]}">${options[2]}</p>
        <p class="options" id="option-4" draggable="true" data-option="${options[3]}">${options[3]}</p>
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
  answer.classList.add('visible');
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
function dragStart(e) {
  // console.log(this);
  e.dataTransfer.setData("text", e.target.id);
  setTimeout(() => (this.classList.add('invisible')), 0);
}

function dragEnd() {
  //console.log(this);
  this.className = 'options';
}

function dragOver(e) {
  e.preventDefault();
  // console.log(this);
}

function dragEnter(e) {
  e.preventDefault();
  // let data = e.dataTransfer.getData("text");
  // console.log(e.currentTarget);
  //hovered class - dashed border and background
// console.log(this);
}

function dragLeave() {
  //we don't want hovered anymore hence do empty
// console.log(this);
  this.style.borderColor = 'black';
  console.log('leave');
}

function dragDrop(e) {
  let data = e.dataTransfer.getData("text");
  let element = document.getElementById(`${data}`);
  if(element.dataset.option === questions[questionNumber - 1].correct_answer) {
    this.append(document.getElementById(`${data}`));
    if(questionNumber === questions.length) {
      nextQuestion.innerHTML = '<button type="button" id="restart-button">Restart</button>';
      while(answer.firstChild) {
        answer.removeChild(answer.firstChild);
      }
      while(questionOptions.firstChild) {
        questionOptions.removeChild(questionOptions.firstChild);
      }
      answer.classList.add('hide');
      answer.classList.remove('visible');
    } else {
      nextQuestion.innerHTML = '<button type="button" id="next-button">Continue</button>';
    }
    // nextQuestion.innerHTML = '<button type="button" id="next-button">Continue</button>'
    console.log('working');
  } else {
    // this.style.borderColor = 'red';
  }
  // console.log(element.dataset.option);
  // console.log(element);
  // console.log('drop');
}

function startQuiz() {
    fetchQuestions();
    // setTimeout(() => header.classList.add('hide'), 1000);
    header.classList.add('hide');
}

function nextQuestionDisplay() {
  questionNumber++;
  if(questionNumber <= questions.length) {
    answer.removeChild(document.querySelector('.answer .options'));
    displayQuestion();
    document.getElementById('next-button').classList.add('hide');
  } else {
    // answer.removeChild(document.querySelector('.answer .options'));
    // while(questionOptions.firstChild) {
    //   questionOptions.removeChild(questionOptions.firstChild);
    // }
    questionNumber = 1;
    fetchQuestions();
    document.getElementById('restart-button').classList.add('hide');
  }
}
