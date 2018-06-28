

// Object question to hold all information and methods
var question = {
  correctanswer: "", // set the number 1 to 4 of the correct question
  vscorrectanswer: "", // translate the correct number question to the string (could use onle the string but was thinking in a database with a key)
  question: "", // set the text of the question
  answer1: "", // set each possible answer
  answer2: "",
  answer3: "",
  answer4: "",
  imgpath: "", // set the path to be shown
  localquestions: {}, // questions already answered

  new: function () { // thinking in a database in the future i think it will be more clear to organize the funtions
    question.newquestion();
    question.show();
  },
  show: function () { // method to present all informations about the question

    $("#warning1").hide(); // just a bonus warning of time is up showed each 5 seconds
    $("#warning2").hide();
    $("#warning3").hide();
    $("#warning4").hide();

    $("#sptotalscore").text(vntotalscore); // present the total questions answered correctly for each game
    $("#spwins").text(vnwins); // present total wins of session
    $("#sperrors").text(vnerrors); // present total questions answered incorrectly for each game
    $("#splosses").text(vnlosses); // present total losses of session
    $("#question").html(this.question); // presents the question
    $("#answer1").html(this.answer1); // presents each possible answer
    $("#answer2").html(this.answer2);
    $("#answer3").html(this.answer3);
    $("#answer4").html(this.answer4);
    question.stopwatch.start();
  },
  newquestion: function () {
    // DONE: Use newquestion to get a newquestion from the array constant in quiz.js.
    // 
    if (question.localquestions.length === myquestions.length) { 
      alert("You answered all the questions available and the game will repeat from now on");
      localStorage.removeItem('localquestions');
      question.localquestions = [];
    }

    var questionfound = false;
    while (!questionfound) { // test if the question was already presented
      var ind1 = Math.floor(Math.random() * myquestions.length); // ind1 it is a random number to choose a question from repo. 
      console.log("-------------"+ind1);
      console.log(myquestions[ind1].question);
      console.log(question.localquestions);
      console.log(question.localquestions.indexOf(myquestions[ind1].question));

      if (question.localquestions.indexOf(myquestions[ind1].question)<0) {
        questionfound = true;
        this.localquestions.push(myquestions[ind1].question);
        console.log("new question" + myquestions[ind1].question);
        localStorage.setItem("localquestions", JSON.stringify(this.localquestions));
        
      } else {
        var ind1 = Math.floor(Math.random() * myquestions.length); // ind1 it is a random number to choose a question from repo.
        console.log("same question"); 
      }
    
    }
    // It is possible to setup an array of questions already shown but i will focus in the new learning of APIs
    this.question = myquestions[ind1].question;
    this.correctanswer = myquestions[ind1].correctanswer;
    this.answer1 = myquestions[ind1].answers.a;
    this.answer2 = myquestions[ind1].answers.b;
    this.answer3 = myquestions[ind1].answers.c;
    this.answer4 = myquestions[ind1].answers.d;
    this.imgpath = myquestions[ind1].imgpath;
    if (this.correctanswer === "1") {
      this.vscorrectanswer = this.answer1;
    } else if (this.correctanswer === "2") {
      this.vscorrectanswer = this.answer2;
    } else if (this.correctanswer === "3") {
      this.vscorrectanswer = this.answer3;
    } else if (this.correctanswer === "4") {
      this.vscorrectanswer = this.answer4;
    }
  },
  showcorrect: function () { // presents the correct answer with correspondent image and hide the div questions for 3 seconds and calls functions to test if the game should finish 
    $("#warning").attr("SRC", this.imgpath);
    $("#messagediv").html("Correct!!");
    $("#imagediv").show();
    $("#messagediv").show();
    $("#questiondiv").hide();
    $("#instructions").hide();
    delaytestscore = setTimeout(testscore, 3000);

  },
  showincorrect: function () { // presents the answer was wrong and the correct one with a specific image
    $("#messagediv").html("Nope!! The correct answer was: " + this.vscorrectanswer);
    $("#messagediv").show();
    $("#warning").attr("SRC", "assets/images/looser.webp");
    $("#imagediv").show();
    $("#questiondiv").hide();
    $("#instructions").hide();
    delaytestscore = setTimeout(testscore, 3000);

  },
  testanswer: function (answer) { // test a number of the answer chosen by the user and calls the presentation method of answer
    // test the answer
    if (answer === question.correctanswer) {
      vntotalscore++;
      this.showcorrect();
    }
    else {
      vnerrors++;
      this.showincorrect();
    }
    $("#sptotalscore").text(vntotalscore); // present the total score but it is only shown when the round game finish
    $("#sperrors").text(vnerrors);
  },

  loadQuestions: function () {


    question.localquestions = JSON.parse(localStorage.getItem("localquestions"));
    console.log("load");
    console.log(question.localquestions);
    // Checks to see if we have any question in localStorage
    // If we do, set the localquestions variable to our localsquestions
    // Otherwise set the localsquestions variable to an empty array
    if (!Array.isArray(question.localquestions)) {
      question.localquestions = [];
    }

    // console log localsquestions
    for (var i = 0; i < question.localquestions.length; i++) {
      console.log(question.localquestions[i]);
    }
  },
  stopwatch: { //object to control the time of each question
    time: 0,
    clockRunning: false,
    intervalId: 0,
    reset: function () {
      this.time = 25; // 25 seconds for each questions

    },
    stop: function() {
      // DONE: Use clearInterval to stop the count here and set the clock to not be running.
      clearInterval(this.intervalId);
      this.clockRunning = false;
      this.time = 25;
    },
    start: function () {
      time = 25; // 25 seconds for each questions
      if (!this.clockRunning) {
        this.intervalId = setInterval(this.count, 1000); // 1 second interval
        this.clockRunning = true;
      }
    },
    count: function () {
      // decrement time by 1
      this.time = this.time - 1;
      // Get the current time, pass that into the aquestion.stopwatch.timeConverter function,
      //       and save the result in a variable.
      var converted = question.stopwatch.timeConverter(this.time);
      // Use the variable we just created to show the converted time in the "display" div.
      $("#display").text("Time Remaining: " + converted);
      if (converted === "00:20") {
        $("#warning1").show(); // just a bonus to show a red warning of time remaining 
      } else if (converted === "00:15") {
        $("#warning2").show();
      } else if (converted === "00:10") {
        $("#warning3").show();
      } else if (converted === "00:05") {
        $("#warning4").show();
      } else if (converted === "00:00") { // time is up and calls showincorrect to show the error and increment the variable vnnotansered
        vnnotanswered++;
        question.showincorrect();
      };
    },
    timeConverter: function (t) { // convert the time to present correctly as xx:xx
      var minutes = Math.floor(t / 60);
      var seconds = t - (minutes * 60);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      if (minutes === 0) {
        minutes = "00";
      }
      else if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return minutes + ":" + seconds;
    }
  }
}
// Globals

var vntotalscore = 0;
var vnwins = 0;
var vnlosses = 0;
var vnnotanswered = 0;
var vnerrors = 0;
var totquestions = 0;

function newgame() { // reset the game variables and hide and show the divs int the right manner
  vntotalscore = 0;
  vnerrors = 0;
  vnnotanswered = 0;
  totquestions = 0;
  question.loadQuestions(); //use session storage to control questions already presented
  console.log("onload");
  console.log(question.sessionquestions);
  question.new();
  totquestions++;

  $("#imagediv").hide();
  $("#questiondiv").show();
  $("#instructions").show();
  $("#wrapper").show();
  $("#results").hide();
  $("#question").show();
}

function showresults() { // hide question informations and show the total results

  $("#spwins").text(vnwins);
  $("#splosses").text(vnlosses);
  $("#spnotanswered").text(vnnotanswered);
  $("#imagediv").hide();
  $("#messagediv").hide();
  $("#questiondiv").show();
  $("#instructions").show();
  $("#wrapper").hide();
  $("#results").show();
  $("#question").hide();
  question.stopwatch.stop();

}

function testscore() { // verify the end of each games and if it is not the end reset the time and gets a new question
  console.log("totalscore: " + vntotalscore);
  $("#warning").attr("SRC", ""); // include to clean the image due to a delay that was showing the previous image
  if (vntotalscore === 5) {
    vnwins++;
    console.log("wins: " + vnwins);
    showresults();
  } else if (totquestions > 4) {
    vnlosses++;
    showresults();
  } else {
    $("#imagediv").hide();
    $("#messagediv").hide();
    $("#instructions").show();
    $("#questiondiv").show();
    $("#question").show();
    question.new();

  //  question.stopwatch.start();
    totquestions++;

  }
}

// end functions

// This code will run as soon as the page loads. Just show the initial page and wait user command the start of a new game
window.onload = function () {
  $("#instructions").show();
  $("#results").show();
  $("#questiondiv").hide();
  $("#wrapper").hide();
}
$(".answer") // select each answer object and change the color of background when user pass the mouse over the answer
  .mouseenter(function () {

    $(this).css("background-color", "aquamarine");
    $(this).css("color", "white");
  })

$(".answer")
  .mouseleave(function () {

    $(this).css("background-color", "white");
    $(this).css("color", "green");
  })

$("#start").on("click", function () { // start a new game when user click
  newgame();
})
$("#answer1").on("click", function () { // could be a simple call for one class answer passing data value as a parameter, but it works.
  question.testanswer("1");
})
$("#answer2").on("click", function () {
  question.testanswer("2");
})
$("#answer3").on("click", function () {
  question.testanswer("3");
})
$("#answer4").on("click", function () {
  question.testanswer("4");
})
