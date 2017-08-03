var currentTime = new Date().getTime();
var sessionInMin = 1;
var breakInMin = 2;
var endTime = currentTime + (sessionInMin * 60000);
var breakEnd = currentTime + (breakInMin * 60000);
var clockMin = document.getElementById('minutes');
clockMin.innerHTML = ('0' + sessionInMin).slice(-2);
remainingTime(endTime);



function remainingTime(end) {
  currentTime = new Date().getTime();
  var difference = end - currentTime;
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  console.log({'total': difference, 'minutes': minutes, 'seconds': seconds})
  return {
    'total': difference,
    'minutes': minutes,
    'seconds': seconds
  };
}

function updateSessionClock() {
  var clockMin = document.getElementById("minutes");
  var clockSec = document.getElementById("seconds");
  var timeIntrvlSession = setInterval(function(){
    var t = remainingTime(endTime);
    clockMin.innerHTML = ('0' + t.minutes).slice(-2);
    clockSec.innerHTML = ('0' + t.seconds).slice(-2);
    if (t.total <= 0) {
      clearInterval(timeIntrvlSession);
      clockMin.innerHTML = ('0' + breakInMin).slice(-2);
      clockSec.innerHTML = ('00').slice(-2);
      breakEnd = currentTime + (breakInMin * 60000);
      remainingTime(breakEnd);
      updateBreakClock();
    }
  }, 1000);
}

function updateBreakClock() {
  var clockMin = document.getElementById("minutes");
  var clockSec = document.getElementById("seconds");
  var timeIntrvlBreak = setInterval(function(){
    var t = remainingTime(breakEnd);
    clockMin.innerHTML = ('0' + t.minutes).slice(-2);
    clockSec.innerHTML = ('0' + t.seconds).slice(-2);
    if (t.total <= 0) {
      clearInterval(timeIntrvlBreak);
      clockMin.innerHTML = '00';
      clockSec.innerHTML = '00';
    }
  }, 1000);
}

updateSessionClock();
