
var  clockRunning= false;
 var intervalId= 0;


var stopwatch = {
  time: 0,
  reset: function () {
    stopwatch.time = 0;
  
  },
  start: function () {
    if (!clockRunning) {
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
    }
  },
  count: function () {
    // DONE: increment time by 1, remember we cant use "this" here.
    stopwatch.time = stopwatch.time + 1;
    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);
    //console.log(converted);
    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#display").text(converted);
    if (converted === "00:20") {
      $("#warning1").show();
    } else if (converted === "00:30") {
      $("#warning2").show();
    } else if (converted === "00:40") {
      $("#warning3").show();
    } else if (converted === "00:50") {
      $("#warning4").show();
    } else if (converted === "01:00") {
      Console.log("time is Up!!");
    };
  },
  timeConverter: function (t) {
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
};
// Make our variables global to the runtime of application
var question = {
  correctanswer: "",
  question: "",
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",

  new: function() {
    question.newquestion();
    question.show();
  },  
  show: function () {
    $("#warning1").hide();
    $("#warning2").hide();
    $("#warning3").hide();
    $("#warning4").hide();
    $("#sptotalscore").text(vntotalscore);
    $("#spwins").text(vnwins);
    $("#sperrors").text(vnerrors);
    $("#splosses").text(vnlosses);
    $("#question").html(this.question);
    $("#answer1").html(this.answer1);
    $("#answer2").html(this.answer2);
    $("#answer3").html(this.answer3);
    $("#answer4").html(this.answer4);
  },
  newquestion: function () {
    // DONE: Use newquestion to get a newquestion from the array.
    // test for answered questions
    var ind1 = Math.floor(Math.random()*myquestions.length);
    console.log(ind1);
    this.question = myquestions[ind1].question;
    this.correctanswer = myquestions[ind1].correctanswer;
    this.answer1 = myquestions[ind1].answers.a;
    this.answer2 = myquestions[ind1].answers.b;
    this.answer3 = myquestions[ind1].answers.c;
    this.answer4 = myquestions[ind1].answers.d;
  },
}
// Globals

var vntotalscore = 0;
var vnwins = 0;
var vnlosses = 0;
var vnerrors = 0;
var totquestions = 0;

function newgame() {
  vntotalscore = 0;
  vnerrors = 0;
  totquestions = 0;
  question.new();
  totquestions++;
  stopwatch.reset();  
  stopwatch.start();
  
}

 function testanswer(answer) {
  //var image = ($(this).attr("value"));
  console.log("answer:" + answer);
  // test the answer
  if (answer === question.correctanswer) {
    console.log("correct answer");
    vntotalscore++;
  }
  else {
    vnerrors++;
    console.log("Wrong answer");
  }
  console.log("totalquestions: " + totquestions);
  console.log("totalscore: " + vntotalscore);
 
  $("#sptotalscore").text(vntotalscore);
  $("#sperrors").text(vnerrors);
  if (vntotalscore === 5) {
    vnwins++;
    $("#spwins").text(vnwins);
    alert("You answered all the 5 questions correctly!! Congratulations");
    newgame();
  } else if (totquestions > 4) {
    vnlosses++;
    $("#splosses").text(vnlosses);
    alert("You've got " + vnerrors + " errors and loose the game. Try again");
    newgame();
  } else {
    question.new();
    stopwatch.reset();  
    stopwatch.start();  
    totquestions++;
  }
  
}
// end functions

// This code will run as soon as the page loads
window.onload = function() {
  newgame();
  };

$("#answer1").on("click", function () {
  testanswer("1");})
$("#answer2").on("click", function () {
  testanswer("2");})
$("#answer3").on("click", function () {
  testanswer("3");})
$("#answer4").on("click", function () {
  testanswer("4");})
