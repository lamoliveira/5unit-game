// STOPWATCH ACTIVITY (SOLUTION)
// =============================

// This code will run as soon as the page loads
window.onload = function() {
  stopwatch.start();
};
//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
// prevents the clock from being sped up unnecessarily
var clockRunning = false;
// Our stopwatch object
var stopwatch = {
  time: 0,
  question: 1,
  reset: function() {
    stopwatch.time = 0;
    // DONE: Change the "display" div to "00:00."
    $("#display").text("00:00");
    // DONE: Empty the "laps" div.
    $("#question").text("");
  },
  start: function() {
    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
    }
  },
  stop: function() {
    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
  },
  count: function() {
    // DONE: increment time by 1, remember we cant use "this" here.
    stopwatch.time = stopwatch.time +1;
    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);
    //console.log(converted);
    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#display").text(converted);
  },
  timeConverter: function(t) {
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
    // Make our variables global to the runtime of our application
    var question={
      correctanswer: "1",
      question: "Show Question",
      answer1: "Answer 1",
      answer2: "Answer 2",
      answer3: "Answer 3",
      answer4: "Answer 4",
      get: function() {
        // DONE: gets one question to show.
        var bdquestion={

        };
        $("#question").html(this.question);
        $("#answer1").html(this.answer1);
        $("#answer2").html(this.answer2);
        $("#answer3").html(this.answer3);
        $("#answer4").html(this.answer4);
      },
      start: function() {
        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
          intervalId = setInterval(stopwatch.count, 1000);
          clockRunning = true;
        }
      },
      testanswer: function(answer) {
        //var image = ($(this).attr("value"));
        console.log("answer:" + answer);
        // test the answer
        if (answer === question.correctanswer) {
          console.log("correct answer");
        vntotalscore ++;}
        else {
          vnerrors ++;
          console.log("Wrong answer");}
        console.log("totalscore: " + vntotalscore);
        $("#sptotalscore").text(vntotalscore);
        $("#sperrors").text(vnerrors);
        if (vnerrors > vnachieve) {
            vnlosses++;
            $("#splosses").text(vnlosses);
            initialize();
        } else if (vntotalscore === vnachieve) {
            vnwins++;
            vnachieve++;
            $("#spwins").text(vnwins);
            if (vntotalscore === 5) {alert("You answered all questions correctly!! Congratulations");}
            initialize();
        }
      }

    };
    var vacrystal = [0, 1, 2, 3];
    var vnachieve = 3;
    var vntotalscore = 0;
    var vnwins = 0;
    var vnlosses = 0;
    var vnerrors = 0;
    // Use a function to initialize our calculator.
    // This way when the user hits clear, we can guarantee a reset of the app.
    function initialize() {
        vntotalscore = 0;
        vnerrors=0;
      
        console.log("achieve : " + vnachieve);

        $("#spachieve").text(vnachieve);
        $("#sptotalscore").text(vntotalscore);
        $("#spwins").text(vnwins);
        $("#sperrors").text(vnerrors);
        $("#splosses").text(vnlosses);
        question.get();
    }
    $("#answer1").on("click", function () {
      question.testanswer("1");
    });
    $("#answer2").on("click", function () {
      question.testanswer("2");
    });
    $("#answer3").on("click", function () {
      question.testanswer("3");
    });
    $("#answer4").on("click", function () {
      question.testanswer("4");
    });

    initialize();


