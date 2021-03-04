const moment = require('moment');

const timerValue = document.getElementById('timer_value');
const info = document.getElementById('timer_hint');
//plus button
const plus = document.getElementById('plus');
//minus button
const minus = document.getElementById('minus');
//start button
const start = document.getElementById('start');
//variable to save the number of minutes to count
let minutesNumber = 5;

/**
 * Increases the number of minutes be clicking on plus button
 */
plus.onclick = () => {
  const value = timerValue.innerHTML;
  minutesNumber = parseInt(value) + 1;
  timerValue.innerHTML = minutesNumber;
};

/**
 * Decreases the number of minutes by clicking on minus button
 */
minus.onclick = () => {
  const value = timerValue.innerHTML;
  minutesNumber = parseInt(value);
  if (minutesNumber < 1) {
    timerValue.innerHTML = 0;
  } else {
    minutesNumber--;
    timerValue.innerHTML = minutesNumber;
  }
};

/**
 * Starts the timer by clicking on start button
 */
start.onclick = () => {
  const container = document.getElementById('timer_container');
  container.classList.add('center');
  //hides unneeded elements
  start.classList.add('hidden');
  plus.classList.add('hidden');
  minus.classList.add('hidden');
  info.innerText = 'Time left:';
  //the actual duration
  let duration = moment.duration(minutesNumber, 'minutes');

  /**
   * Corrects the number under 10
   * @param number is the number to correct
   * @returns the corrected number
   */
  function checkDigit(number) {
    const correctedNumber = number.toString();
    if (correctedNumber.length < 2) {
      return `0${correctedNumber}`;
    }
    return number;
  }

  /**
   * Shows the countdown
   */
  function timer() {
    //in order not to count under 0
    if (minutesNumber>0){
      duration = moment.duration(duration.asSeconds() - 1, 'seconds');
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      if (minutes === 0 && seconds === 0) {
        myStopFunction();
      }
      timerValue.innerHTML = `${checkDigit(duration.minutes())}:${checkDigit(
        duration.seconds()
      )}`;
    }
    else addButton();
  }

  /**
   * Stops the timer when it reaches 0
   */
  function myStopFunction() {
    clearInterval(timerId);
    addButton();
  }

  /**
   * Adds the restart button in order to restart the timer
   */
  function addButton() {
    start.style.display = 'block';
    start.innerText = 'Restart';
  }

  /**
   * Reloads the page in order to restart the timer
   */
  start.onclick = () => {
    window.location.reload(false);
  };

  let timerId = setInterval(() => {
    timer();
  }, 1000);
};
