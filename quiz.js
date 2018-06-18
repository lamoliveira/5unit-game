

// Make our variables global to the runtime of application
var question = {
  correctanswer: "",
  vscorrectanswer: "",
  question: "",
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  imgpath: "",

  new: function () {
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
    var ind1 = Math.floor(Math.random() * myquestions.length);
    this.question = myquestions[ind1].question;
    this.correctanswer = myquestions[ind1].correctanswer;
    this.answer1 = myquestions[ind1].answers.a;
    this.answer2 = myquestions[ind1].answers.b;
    this.answer3 = myquestions[ind1].answers.c;
    this.answer4 = myquestions[ind1].answers.d;
    this.imgpath = myquestions[ind1].imgpath;
    if (this.correctanswer === "1"){
      this.vscorrectanswer = this.answer1;
    } else if (this.correctanswer === "2"){
      this.vscorrectanswer = this.answer2;
    } else if (this.correctanswer === "3"){
      this.vscorrectanswer = this.answer3;
    } else if (this.correctanswer === "4"){
      this.vscorrectanswer = this.answer4;
    }
  },
    showcorrect: function () {
    //$("#warning").attr("SRC", "assets/images/200w.webp");
    $("#warning").attr("SRC", this.imgpath);
    $("#messagediv").html("Correct!!");
    $("#imagediv").show();
    $("#messagediv").show();
    $("#questiondiv").hide();
    delaytestscore = setTimeout(testscore, 3000);
  },
  showincorrect: function () {
    $("#messagediv").html("Nope!! The correct answer was: " +this.vscorrectanswer);
    $("#messagediv").show();
    $("#warning").attr("SRC", "assets/images/looser.webp");
    $("#imagediv").show();
    $("#questiondiv").hide();
    delaytestscore = setTimeout(testscore, 3000);
  },
  testanswer: function (answer) {
    // test the answer
    if (answer === question.correctanswer) {
      vntotalscore++;
      this.showcorrect();
    }
    else {
      vnerrors++;
      this.showincorrect();
    }
    $("#sptotalscore").text(vntotalscore);
    $("#sperrors").text(vnerrors);
  },
  stopwatch: {
    time: 0,
    clockRunning: false,
    intervalId: 0,
    reset: function () {
      time = 25;

    },
    start: function () {
      if (!this.clockRunning) {
        this.intervalId = setInterval(this.count, 1000);
        this.clockRunning = true;
      }
    },
    count: function () {
      // DONE: increment time by 1, remember we cant use "this" here.
      this.time = this.time - 1;
      // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
      //       and save the result in a variable.
      var converted = question.stopwatch.timeConverter(this.time);
      // DONE: Use the variable we just created to show the converted time in the "display" div.
      $("#display").text("Time Remaining: " + converted);
      if (converted === "00:20") {
        $("#warning1").show();
      } else if (converted === "00:15") {
        $("#warning2").show();
      } else if (converted === "00:10") {
        $("#warning3").show();
      } else if (converted === "00:05") {
        $("#warning4").show();
      } else if (converted === "00:00") {
        vnnotanswered++;
        question.showincorrect();
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
  }
}
// Globals

var vntotalscore = 0;
var vnwins = 0;
var vnlosses = 0;
var vnnotanswered = 0;
var vnerrors = 0;
var totquestions = 0;

function newgame() {
  vntotalscore = 0;
  vnerrors = 0;
  vnnotanswered = 0;
  totquestions = 0;
  question.new();
  totquestions++;
  question.stopwatch.reset();
  question.stopwatch.start();
  $("#imagediv").hide();
  $("#questiondiv").show();
  $("#instructions").show();
  $("#wrapper").show();
  $("#results").hide();
}

function showresults(){

  $("#spwins").text(vnwins);
  $("#splosses").text(vnlosses);
  $("#spnotanswered").text(vnnotanswered);
  $("#imagediv").hide();
  $("#messagediv").hide();
  $("#questiondiv").show();
  $("#instructions").hide();
  $("#wrapper").hide();
  $("#results").show();

}

function testscore() {
console.log("totalscore: " + vntotalscore);
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
    $("#questiondiv").show();
    question.new();
    question.stopwatch.reset();
    question.stopwatch.start();
    totquestions++;

  }
}

// end functions

// This code will run as soon as the page loads
window.onload = function () {
  $("#results").show();
  $("#questiondiv").show();
  $("#wrapper").hide();
}
$( ".answer" )
  .mouseenter(function() {
    
    $( this ).css("background-color", "green");
    $( this ).css("color", "white");
  })

  $( ".answer" )
  .mouseleave(function() {
    
    $( this ).css("background-color", "white");
    $( this ).css("color", "black");
  })

$("#start").on("click", function () {
  newgame();
})
$("#answer1").on("click", function () {
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
