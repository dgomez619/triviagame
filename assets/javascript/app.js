// Initial Values 
let counter = 10;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer; 

function nextQuestion (){

    const isQuestionOver = (quizzQuestions.length - 1) === currentQuestion;
    if (isQuestionOver){
        displayResult();

    } else {
        currentQuestion++;
    loadQuestion();
  
    }
    
}

// Start a 30 second timer for user to respond or choose an answer to each question

function timeUp(){
    clearInterval(timer);

    lost++;

    nextQuestion();
}

function countDown () {
     counter--;

     $('#time').html('Timer: ' + counter);

     if (counter === 0){
         timeUp();

     }
 }
// Display the question and the choices together in the browser

function loadQuestion() {
    counter = 10;
    timer = setInterval(countDown, 1000);

    const question = quizzQuestions[currentQuestion].question; //
    const choices = quizzQuestions[currentQuestion].choices; // 
    
    $('#time').html('Timer: ' + counter);
    $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}

    `);
}

function loadChoices (choices){
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`; 
    }

    return result; 
}

$(document).on('click', '.choice', function (){
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizzQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {

        score++;   
        
        nextQuestion();
    }  else {
        lost++;
        nextQuestion();
    }
});

function displayResult() {
const result = `
    <p>You Get ${score} questions(s) right</p> 
    <p>You missed ${lost} question(s)</p> 
    <p>Total questions ${quizzQuestions.length} questions(s) right </p> 
    <button>Reset Game</button> 

`;
$(`#game`).html(result);

}

loadQuestion();