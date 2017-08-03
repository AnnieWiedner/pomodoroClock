var currentTime = new Date().getTime();
var sessionInMin = 15;

var sessionInSec = 0;
var breakInMin = 5;
var endTime = currentTime + (sessionInMin * 60000);
var breakEnd = currentTime + (breakInMin * 60000);

var clockMin1 = document.getElementById('minutes1');
var clockMin2 = document.getElementById('minutes2');
var clockSec1 = document.getElementById('seconds1');
var clockSec2 = document.getElementById('seconds2');
clockMin1.innerHTML = ('0' + sessionInMin).slice(-2, -1);
clockMin2.innerHTML = ('0' + sessionInMin).slice(-1);
clockSec1.innerHTML = ('0' + sessionInSec).slice(-2, -1);
clockSec2.innerHTML = ('0' + sessionInSec).slice(-1);

var breakNum = document.getElementById('breakNum');
breakNum.innerHTML = breakInMin;

var sessionNum = document.getElementById('sessionNum');
sessionNum.innerHTML = sessionInMin;

document.getElementById("start").addEventListener("click", updateSessionClock);



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
  var timeIntrvlSession = setInterval(function(){
    var t = remainingTime(endTime);
    // putting one digit in each box
    clockMin1.innerHTML = ('0' + t.minutes).slice(-2, -1);
    clockMin2.innerHTML = ('0' + t.minutes).slice(-1);
    clockSec1.innerHTML = ('0' + t.seconds).slice(-2, -1);
    clockSec2.innerHTML = ('0' + t.seconds).slice(-1);
    if (t.total <= 0) {
      clearInterval(timeIntrvlSession);
      clockMin1.innerHTML = ('0' + breakInMin).slice(-2, -1);
      clockMin2.innerHTML = ('0' + breakInMin).slice(-1);
      clockSec1.innerHTML = ('00').slice(-2, -1);
      clockSec2.innerHTML = ('00').slice(-1);
      breakEnd = currentTime + (breakInMin * 60000);
      remainingTime(breakEnd);
      updateBreakClock();
    }
  }, 1000);
}

function updateBreakClock() {
  var timeIntrvlBreak = setInterval(function(){
    var t = remainingTime(breakEnd);
    // putting one digit in each box
    clockMin1.innerHTML = ('0' + t.minutes).slice(-2, -1);
    clockMin2.innerHTML = ('0' + t.minutes).slice(-1);
    clockSec1.innerHTML = ('0' + t.seconds).slice(-2, -1);
    clockSec2.innerHTML = ('0' + t.seconds).slice(-1);
    if (t.total <= 0) {
      clearInterval(timeIntrvlBreak);
      clockMin1.innerHTML = '0';
      clockMin2.innerHTML = '0';
      clockSec1.innerHTML = '0';
      clockSec2.innerHTML = '0';
    }
  }, 1000);
}
