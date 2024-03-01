'use strict';
let possibleNumbers = Array.from({ length: 9900 }, (_, index) => {
   if (index < 1000) {
      return `0${index}`;
   }
   return index.toString();
}).filter(num => new Set(num).size === 4);

let userNumber, guessNumber, bulls, cows;
let attempts = 0;
const submitBtn = document.getElementById('submit_computer_game');
const askElement = document.getElementById('ask');
const helpFormElement = document.getElementById('form_help_view');

document.getElementById('form_computer').addEventListener('submit', e => {
   e.preventDefault();
   const inputs = [...document.getElementsByClassName('input_computer')];
   userNumber = inputs.reduce(
      (accum, element) => accum + (+element.value).toString(),
      ''
   );
   if (new Set(userNumber).size !== 4) {
      addNotification('Цифры не должны повторяться', 'error');
      return;
   }
   inputs.forEach(input => input.setAttribute('readonly', true));
   submitBtn.setAttribute('disabled', true);
   guess();
});

askElement.addEventListener('submit', e => {
   e.preventDefault();
   const userBulls = +document.getElementById('bulls').value;
   const userCows = +document.getElementById('cows').value;
   let realBulls = 0;
   let realCows = 0;

   for (const i in userNumber) {
      if (userNumber[i] === guessNumber[i]) {
         realBulls++;
      } else if (userNumber.indexOf(guessNumber[i]) > -1) {
         realCows++;
      }
   }
   if (realBulls !== userBulls || realCows !== userCows) {
      addNotification(
         'Вы неправильно посчитали &#128002; или &#128004;',
         'warn'
      );
      return;
   }
   bulls = userBulls;
   cows = userCows;
   if (bulls === 4) {
      showFinalPanel(
         `Компьютер отгадал ваше число за ${formatAttempts(attempts)}!`
      );
      return;
   }
   guess();
});

function guess() {
   if (
      typeof bulls !== 'undefined' &&
      typeof cows !== 'undefined' &&
      guessNumber
   ) {
      possibleNumbers = possibleNumbers.filter(num => {
         let currentBulls = 0;
         let currentCows = 0;
         for (const i in num) {
            if (guessNumber[i] === num[i]) {
               currentBulls++;
            } else if (guessNumber.indexOf(num[i]) > -1) {
               currentCows++;
            }
         }
         return currentBulls === bulls && currentCows === cows;
      });
   }
   const guessIndex = Math.floor(Math.random() * possibleNumbers.length);
   guessNumber = possibleNumbers[guessIndex];
   pushGuess(guessNumber);
   attempts++;
   askElement.classList.remove('hidden');
   helpFormElement.classList.remove('hidden');
}
