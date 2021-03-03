const moment = require("moment");
let timerValue = document.getElementById("timer_value");
let info = document.getElementById("timer_hint");
let plus = document.getElementById("plus");
let minus = document.getElementById("minus");
let start = document.getElementById("start");
let minutesNumber = 5;

plus.onclick = () => {
    let value = timerValue.innerHTML;
    minutesNumber = parseInt(value) + 1;
    timerValue.innerHTML = minutesNumber;
}

minus.onclick = () => {
    let value = timerValue.innerHTML;
    minutesNumber = parseInt(value);
    if (minutesNumber < 1) {
        timerValue.innerHTML = 0;
    } else {
        minutesNumber--;
        timerValue.innerHTML = minutesNumber;
    }
}

start.onclick = () => {
    let container = document.getElementById('timer_container');
    container.classList.add('center');
    start.classList.add("hidden");
    plus.classList.add("hidden");
    minus.classList.add("hidden");
    info.innerText = 'Time left:';
    let duration = moment.duration(minutesNumber, "minutes");

//corrects the number under 10
    function checkDigit(number) {
        let correctedNumber = number.toString()
        if (correctedNumber.length < 2) {
            return `0${correctedNumber}`;
        }
        return number;
    }

    function timer() {
        duration = moment.duration(duration.asSeconds() - 1, 'seconds');
        let minutes = duration.minutes();
        let seconds = duration.seconds();
        if (minutes == 0 && seconds == 0) {
            myStopFunction();
        }
        timerValue.innerHTML = `${duration.minutes()}:${checkDigit(duration.seconds())}`;
    }

    function myStopFunction() {
        clearInterval(timerId);
        addButton();
    }

    function addButton() {
        start.style.display = 'block';
        start.innerText = 'Restart';
    }

    start.onclick = () => {
        window.location.reload(false);
    }

    let timerId = setInterval(() => {
        timer()
    }, 1000);
}