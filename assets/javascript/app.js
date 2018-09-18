let intervalId;

const quiz = {
  questions: [
    {question: `Placeholder question 1`,
     answers: [`placeholder answer 1`, `placeholder answer 2`, `placeholder answer 3`],
      correctAnswer: `placeholder answer 1`
    },
    {question: `Placeholder question 2`,
      answers: [`placeholder answer 1`, `placeholder answer 2`, `placeholder answer 3`],
      correctAnswer: `placeholder answer 2`
    },
    {question: `Placeholder question 3`,
      answers: [`placeholder answer 1`, `placeholder answer 2`, `placeholder answer 3`],
      correctAnswer: `placeholder answer 3`
    }
  ]
};

let game = {
  clockTimer: 0,
  intervalId,
  questionIndex: 0,
  correctCount: 0,
  incorrectCount: 0,
  initializeGame: function() {
    this.questionIndex = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    $("#start-btn-container").css("display","none");
    $("#question").css("display","block");
    game.initiateQuestion(game.questionIndex)
  },
  selectAnswer: function (selected) {
    console.log(selected.target.innerText);
    console.log(quiz.questions[game.questionIndex].correctAnswer);
    game.questionIndex++;
    if(selected.target.innerText === quiz.questions[game.questionIndex-1].correctAnswer) {return game.correct()}
    else {return game.incorrect()}
  },

  correct: function () {
    $(document).off("click",".answer",this.selectAnswer);
    game.correctCount++;
    $("#after-question").text("Correct!");
    clearInterval(intervalId);
    setTimeout(function(){
      $("#after-question").empty();
      game.endCheck();
    },2000)
  },

  incorrect: function () {
    $(document).off("click",".answer",this.selectAnswer);
    game.incorrectCount++;
    $("#after-question").text("Incorrect!");
    clearInterval(intervalId);
    setTimeout(function(){
      $("#after-question").empty();
      game.endCheck();
    },2000)
  },

  initiateQuestion: function (qIndex) {
   $("#question").empty();
   $("#answers").empty();
   $("#question").text(quiz.questions[qIndex].question);
   for(answer of quiz.questions[qIndex].answers) {
     let newAnswer = $("<span class='answer'>");
     newAnswer.text(answer);
     $("#answers").append(newAnswer).append("<br>");
   }
   $(document).on("click",".answer",this.selectAnswer); //add listener
   this.startQTimer()
  },

  startQTimer: function() {
    game.clockTimer = 30;
    $("#timer").text(game.clockTimer);
    intervalId = setInterval(game.clockStep,1000);
  },

  clockStep: function() {
    game.clockTimer--;
    $("#timer").text(game.clockTimer);
    if (game.clockTimer === 0) {
      clearInterval(intervalId);
      game.timeOut();
    }
  },

  timeOut: function() {
    $("#after-question").text("Out of time!");
    setTimeout(function(){
      $("#after-question").empty();
      game.endCheck();
    },2000)
  },

  endCheck: function() {
    if(game.questionIndex === quiz.questions.length){
      $("#question").empty();
      $("#answers").empty();
      $("#timer").empty();
      $("#after-question").html(`<span>GAME OVER!</span><br>
      <span>Correct Answers: ${game.correctCount}</span><br>
      <span>Incorrect Answers: ${game.incorrectCount}</span>`)
    }
    else{return(game.initiateQuestion(game.questionIndex))}
  }
};

$("#start-btn").on("click",game.initializeGame);