var TIMEOUT_IN_SECS = 3 * 60
var NOTIFY_TIMEOUT_IN_MILISECS = 30 * 1000;
var timerStyle = 'font-family: "Aldrich"; font-size: 60px; color: rgba(0,0,0,0.25);'
var TEMPLATE = `<h1 style='${timerStyle}'><span id="timer-minutes">00</span>:<span id="timer-seconds">00</span></h1>`;

// adds HTML tag to current page
var timerContainer = document.createElement('div');
timerContainer.setAttribute("style", "z-index:10000; position: fixed; top: 25px; display: inline-block;");
var bodyTag = document.body;
bodyTag.insertBefore(timerContainer, bodyTag.firstChild);
timerContainer.innerHTML = TEMPLATE;

function getTimestampInSecs(){
    var timestampInMilliseconds = new Date().getTime();
    return Math.round(timestampInMilliseconds/1000);
}

function padZero(number){
    return ("00" + String(number)).slice(-2);
}

var timestampOnStart = getTimestampInSecs();

function displayTimer(){
    var currentTimestamp = getTimestampInSecs();
    var secsGone = currentTimestamp - timestampOnStart;
    var secsLeft = Math.max(TIMEOUT_IN_SECS - secsGone, 0);

    var minutes = Math.floor(secsLeft / 60);
    var seconds = secsLeft - minutes * 60;

    document.getElementById('timer-minutes').innerHTML = padZero(minutes);
    document.getElementById('timer-seconds').innerHTML = padZero(seconds);
}
setInterval(displayTimer, 300);
quotes = ['Молодец!', 'Так держать!', 'Я тобой горжусь!', 'Ещё лучше, чем прежде!',
          'Я знал, что тебе это по силам!', 'Не останавливайся!'];
function setupNotifications(){
    window.setInterval(function(){
        var currentTimestamp = getTimestampInSecs();
        var secsGone = currentTimestamp - timestampOnStart;
        var minutes = Math.floor(secsGone / 60);
        var seconds = secsGone - minutes * 60;
        var quote = quotes[Math.floor(Math.random()*quotes.length)];
        alert(`Ты на сайте уже ${minutes} минут, ${seconds} секунд. ${quote}`);
    }, NOTIFY_TIMEOUT_IN_MILISECS)
}
setTimeout(setupNotifications, TIMEOUT_IN_SECS * 1000);
