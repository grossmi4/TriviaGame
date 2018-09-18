$("#start-btn").on("click",game.initializeGame());

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

const game = {
  questionIndex: 0,
  correctCount: 0,
  incorrectCount: 0,
  initializeGame: function() {
    this.questionIndex = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    $("#start-btn-container").css("display","none");
    $("#question").css("display","block")
  },
  selectAnswer: function (selected) {
    questionIndex++;
    if(selected === quiz.questions[questionIndex]) return this.correct;
    else {return this.incorrect}
  },

  correct: function () {
    //code to clear question, display correct for 2 seconds, initiate next question
  },

  incorrect: function () {
    //code to show incorrect, highlight correct answer, initiate next question
  },

  initiateQuestion: function (qIndex) {
   $("#question").empty();
   $("#answers").empty();
   $("#question").text(quiz.questions[qIndex].question);
   for(answer of quiz.questions[qIndex].answers) {
     let newAnswer = $("<span class='answer'>");
     newAnswer.attr("value",answer).text(answer);
     $("#answers").append(newAnswer);
   };
   this.startQTimer()
  },

  startQTimer: function() {
    //psuedocode 
  }
};