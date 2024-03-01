'use strict';
const numbers = Array.from('1234567890')
   .sort(() => 0.5 - Math.random())
   .slice(0, 4)
   .map(Number);

let attemptAmount = 0;

document.getElementById('form_human').addEventListener('submit', e => {
   e.preventDefault();

   let bulls = 0;
   let cows = 0;
   const inputNumbers = [...document.getElementsByClassName('input_human')].map(
      element => +element.value
   );
   if (new Set(inputNumbers).size !== 4) {
      addNotification('Цифры не должны повторяться', 'error');
      return;
   }
   for (const i in numbers) {
      if (inputNumbers[i] === numbers[i]) {
         bulls++;
      } else if (numbers.indexOf(inputNumbers[i]) > -1) {
         cows++;
      }
   }
   attemptAmount++;

   if (bulls === 4) {
      showFinalPanel(`Вы отгадали число за ${formatAttempts(attemptAmount)}!`);
   } else {
      addAttempt(bulls, cows, inputNumbers.join(''), attemptAmount);
   }
});
