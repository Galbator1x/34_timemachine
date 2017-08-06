var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css?family=Aldrich';
document.head.appendChild(link);

var TIMEOUT_IN_SECS = 3 * 60;
var NOTIFY_TIMEOUT_IN_SECS = 30;
var timerStyle = 'font-family: "Aldrich", sans-serif; font-size: 60px; color: #5f5f5f; background-color: rgba(255, 255, 255, 0.62); width: 190px; height: 60px; border: 3px solid rgba(95, 95, 95, 0.65);'
var TEMPLATE = `<h1 style='${timerStyle}'><span id="timer-minutes">00</span>:<span id="timer-seconds">00</span></h1>`;

// adds HTML tag to current page
var timerContainer = document.createElement('div');
timerContainer.setAttribute('style', 'z-index:10000; position: fixed; top: 25px; display: inline-block;');
var bodyTag = document.body;
bodyTag.insertBefore(timerContainer, bodyTag.firstChild);
timerContainer.innerHTML = TEMPLATE;

function getTimestampInSecs(){
    var timestampInMilliseconds = new Date().getTime();
    return Math.round(timestampInMilliseconds/1000);
}

function padZero(number){
    return ('00' + String(number)).slice(-2);
}

var timestampOnStart = getTimestampInSecs();
var lastAlertConfirmation = TIMEOUT_IN_SECS;

function displayTimer(){
    var currentTimestamp = getTimestampInSecs();
    var secsGone = currentTimestamp - timestampOnStart;
    var secsLeft = Math.max(TIMEOUT_IN_SECS - secsGone, 0);

    var minutes = Math.floor(secsLeft / 60);
    var seconds = secsLeft - minutes * 60;

    document.getElementById('timer-minutes').innerHTML = padZero(minutes);
    document.getElementById('timer-seconds').innerHTML = padZero(seconds);

    if (secsGone > TIMEOUT_IN_SECS && secsGone - lastAlertConfirmation >= NOTIFY_TIMEOUT_IN_SECS) {
        var mins = Math.floor(secsGone / 60);
        var secs = secsGone - mins * 60;
        alert(`Ты на сайте уже ${mins} минут, ${secs} секунд. Пора вернуться к работе`);
        lastAlertConfirmation = getTimestampInSecs() - timestampOnStart;
    }
}

setInterval(displayTimer, 300);
