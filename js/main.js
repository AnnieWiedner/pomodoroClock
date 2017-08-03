var currentTime = new Date().getTime();
var sessionInMin = 15;
var sessionInSec = 0;
var breakInMin = 5;
var breakInSec = 0;
var endTime = currentTime + (sessionInMin * 60000);
var breakEnd = currentTime + (breakInMin * 60000);

var action = document.getElementById('action');
var clockMin1 = document.getElementById('minutes1');
var clockMin2 = document.getElementById('minutes2');
var clockSec1 = document.getElementById('seconds1');
var clockSec2 = document.getElementById('seconds2');
var secItem = document.getElementById('sec-item');
var minItem = document.getElementById('min-item');

var breakNum = document.getElementById('break-num');
breakNum.innerHTML = breakInMin;

var sessionNum = document.getElementById('session-num');
sessionNum.innerHTML = sessionInMin;


//event listener for user clicking start timer
document.getElementById("start").addEventListener("click", updateSessionClock);

//event listeners for user changing length of break and session
document.getElementById("session-plus").addEventListener("click", function(){
  sessionInMin = sessionInMin + 1;
  sessionNum.innerHTML = sessionInMin;
  staticStart()
})
document.getElementById("session-minus").addEventListener("click", function(){
  sessionInMin = sessionInMin - 1;
  if (sessionInMin <= 0) {
    sessionInMin = 0;
  }
  sessionNum.innerHTML = sessionInMin;
  staticStart()
})
document.getElementById("break-plus").addEventListener("click", function(){
  breakInMin = breakInMin + 1;
  breakNum.innerHTML = breakInMin;
})
document.getElementById("break-minus").addEventListener("click", function(){
  breakInMin = breakInMin - 1;
  if (breakInMin <= 0) {
    breakInMin = 0;
  }
  breakNum.innerHTML = breakInMin;
})

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

function staticStart() {
  currentTime = new Date().getTime();
  endTime = currentTime + (sessionInMin * 60000);
  replaceHTML(sessionInMin, sessionInSec);
}


function updateSessionClock() {
  replaceClass("spanGray", "spanGreen", "itemGray", "itemGreen")
  action.classList.add("working");
  action.innerHTML = ("Keep working...");
  currentTime = new Date().getTime();
  endTime = currentTime + (sessionInMin * 60000);
  var t = remainingTime(endTime);
  var timeIntrvlSession = setInterval(function(){
    t = remainingTime(endTime);
    // putting one digit in each box
    replaceHTML(t.minutes, t.seconds)
    if (t.total <= 0) {
      clearInterval(timeIntrvlSession);
      action.innerHTML = "";
      action.classList.remove("working");
      replaceHTML(breakInMin, breakInSec);
      breakEnd = currentTime + (breakInMin * 60000);
      remainingTime(breakEnd);
      updateBreakClock();
    }
  }, 500);
}

function updateBreakClock() {
  action.classList.add("breaking");
  action.innerHTML = ("Take a break");
  replaceClass("spanGreen", "spanRed", "itemGreen", "itemRed")
  var timeIntrvlBreak = setInterval(function(){
    var t = remainingTime(breakEnd);
    // putting one digit in each box
    replaceHTML(t.minutes, t.seconds);
    if (t.total <= 0) {
      action.innerHTML = "FINISHED!!!";
      action.classList.remove("breaking");
      replaceClass("spanRed", "spanGray", "itemRed", "itemGray")
      clearInterval(timeIntrvlBreak);
      replaceHTML('0', '0')
    }
  }, 500);
}


// making code dry
function replaceHTML(min, sec) {
  clockMin1.innerHTML = ('0' + min).slice(-2, -1);
  clockMin2.innerHTML = ('0' + min).slice(-1);
  clockSec1.innerHTML = ('0' + sec).slice(-2, -1);
  clockSec2.innerHTML = ('0' + sec).slice(-1);
}
// making code dry
function replaceClass(oldSpan, newSpan, oldItem, newItem) {
  clockMin1.classList.add(newSpan);
  clockMin2.classList.add(newSpan);
  clockMin1.classList.remove(oldSpan);
  clockMin2.classList.remove(oldSpan);
  clockSec1.classList.add(newSpan);
  clockSec2.classList.add(newSpan);
  clockSec1.classList.remove(oldSpan);
  clockSec2.classList.remove(oldSpan);
  minItem.classList.add(newItem);
  secItem.classList.add(newItem);
  minItem.classList.remove(oldItem);
  secItem.classList.remove(oldItem);
}
