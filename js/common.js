'use strict';
const attemptsElement = document.getElementById('attempts');
const infoElement = document.getElementById('info');
const guessesElement = document.getElementById('computer_guesses');
const guessMessages = [
   'Я называю число',
   'Я думаю это',
   'Зуб даю это',
   'Ставлю на',
   'Мне кажется, это число',
   'Предположу, что это число',
   'Склоняюсь к числу'
];

function destroy(element) {
   element.parentElement.remove();
}

function openTab(tabID, button) {
   const tabs = document.getElementsByClassName('tab');
   const tab_btns = document.getElementsByClassName('tab_btn');
   for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.add('hidden');
      tab_btns[i].classList.remove('active');
   }

   document.getElementById(tabID).classList.remove('hidden');
   button.classList.add('active');
}


const formatBulls = count => {
   if (count === 1) return '1 бык';
   if (2 <= count && count <= 4) return `${count} быка`;

   return `${count} быков`;
};
const formatCows = count => {
   if (count === 1) return '1 корова';
   if (2 <= count && count <= 4) return `${count} коровы`;

   return `${count} коров`;
};
const formatAttempts = count => {
   const last = count % 10;
   const twoLast = count % 100;
   if (count === 1 && twoLast !== 11) return `${count} попытку`;
   if (2 <= last && last <= 4 && (twoLast < 12 || twoLast > 14)) return `${count} попытки`;

   return `${count} попыток`;
};

function showFinalPanel(message) {
   guessesElement.classList.add('hidden');
   infoElement.classList.add('hidden');

   document.getElementById('final').classList.remove('hidden');
   document.getElementById('final_text').innerText = message;
}

function addAttempt(bulls, cows, numString, attempts) {
   attemptsElement.classList.remove('hidden');

   const smile = bulls + cows === 0 ? ':&lpar;' : '';
   const attempt = document.createElement('p');
   attempt.innerHTML = `${attempts}&rpar; ${numString}: ${formatBulls(
      bulls
   )}, ${formatCows(cows)} ${smile}`;
   attempt.classList.add('attempt');
   attemptsElement.insertBefore(attempt, attemptsElement.childNodes[2]);
}

function addNotification(message, type) {
   const error = document.createElement('div');
   error.innerHTML = `<span>${message}</span><button class="close" onclick="destroy(this)">&times;</button>`;
   error.classList.add(type);
   infoElement.appendChild(error);
}

function pushGuess(number) {
   const index = Math.floor(Math.random() * guessMessages.length);
   guessesElement.innerHTML = `<div class="guess">${guessMessages[index]} ${number}</div>`;

   const inputs = document.getElementsByClassName('input_help');
   for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = number[i];
   }
}
