let intervalId;

const quiz = {
  questions: [
    {question: `Who is known as the 'father of botany'?`,
     answers: [`Aristotle`, `Mendel`, `Theophrastus`],
      correctAnswer: `Theophrastus`
    },
    {question: `In geology, what is the name given to naturally occuring molten rock material generated and found within the Earth?`,
      answers: [`Lava`, `Magma`, `Igneous Rock`],
      correctAnswer: `Magma`
    },
    {question: `All plant leaves are connected to the stem by a thin stalk. What is this stalk called?`,
      answers: [`Stem`, `Blade`, `Petiole`],
      correctAnswer: `Petiole`
    },
    {question: `Which unit of energy was named in honour of an English scientist of the 19th century?`,
      answers: [`Hertz`, `Joule`, `Farad`],
      correctAnswer: `Joule`
    },
    {question: `What substance produced from the plant is used to create its cell walls?`,
      answers: [`Lignin`, `Ligature`, `Cellulose`],
      correctAnswer: `Cellulose`
    }
  ]
};

let game = {
  clockTimer: 0,
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
    game.questionIndex++;
    if(selected.target.innerText === quiz.questions[game.questionIndex-1].correctAnswer) {
      selected.target.style.color = "#2db34a";
      return game.correct()
    }
    else {
      selected.target.style.color = "#d21034";
      return game.incorrect()}
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
    $(".answer").each(function(){
      if(this.innerText === quiz.questions[game.questionIndex-1].correctAnswer){
        this.style.color = "#2db34a";
      }
    });
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
     let newAnswer = $("<span class='answer'>").text(answer);
     let newDiv = $("<div class='answerContainer'>");
     newDiv.append(newAnswer);
     $("#answers").append(newDiv);
   }
   $(document).on("click",".answer",this.selectAnswer); //add listener
   this.startQTimer()
  },

  startQTimer: function() {
    game.clockTimer = 10;
    $("#timer").text(`Time Remaining: ${game.clockTimer}`);
    intervalId = setInterval(game.clockStep,1000);
  },

  clockStep: function() {
    game.clockTimer--;
    $("#timer").text(`Time Remaining: ${game.clockTimer}`);
    if (game.clockTimer === 0) {
      clearInterval(intervalId);
      game.timeOut();
    }
  },

  timeOut: function() {
    $(document).off("click",".answer",this.selectAnswer);
    game.questionIndex++;
    game.incorrectCount++;
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
      <span>Incorrect Answers: ${game.incorrectCount}</span>`);
      $("#play-again-btn-container").css("display","block")
    }
    else{return(game.initiateQuestion(game.questionIndex))}
  }
};

$("#start-btn").on("click",game.initializeGame);