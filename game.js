const question = document.getElementById("question")
const choices = Array.from(document.getElementsByClassName("choice-text"))
const scoreCounter = document.getElementById("score-counter")
const progressBar = document.getElementById("progress-bar")
const progressBarFull = document.getElementById("progress-bar-level")
const questionCounterText = document.getElementById("question-counter")
const spinner = document.getElementById("spinner")
const game = document.getElementById("game")

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map(loadedQuestion =>{
         const formattedQuestion = {
           question: loadedQuestion.question
         } 
         
         const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        })
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });
    
//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10


startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];

  getNewQuestion();
 spinner.classList.add("hidden")
        game.classList.remove("hidden")
       };

//startGame()

getNewQuestion = () =>{
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  //load the question
  questionCounter++;
  
  questionCounterText.innerText =   `Question ${questionCounter}/${MAX_QUESTIONS}`
  
 //change css property
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

//load the options
choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  
  //remove answered questions
  availableQuesions.splice(questionIndex, 1)
  
  acceptingAnswers = true
}

// clicking answer
choices.forEach(choice =>{
  choice.addEventListener("click", e =>{
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    
    //change clads based in input
    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"
    
    if(classToApply === "correct"){
      increnentScore(CORRECT_BONUS)
    }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
    
    
  })
})

increnentScore = num =>{
  score += num
  scoreCounter.innerText = score
}
