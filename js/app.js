'use strict'

// == form ===>
const formBtn = document.querySelector('.form-btn');
const inputs = document.querySelectorAll('label input');

// btn active
formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    inputs.forEach((item) => {
        item.value = '';
    });
});

// == choices ===>
const input = document.querySelector('.naming-field input');
const name = document.querySelectorAll('.naming-name');
const choices = document.querySelectorAll('.naming-choice');
const welcomePopup = document.querySelector('.naming-popup');

// == welcome popup ===>
let count;

// == Name Setter in Local Storage ===>
function fillNames() {
    name.forEach((item) => {
        item.innerHTML = localStorage.getItem('nameOfTheUser');
    });
}

if(localStorage.getItem('nameOfTheUser') !== null) {
    fillNames();
}

// To set name (dynamic view)
input.addEventListener('input', () => {
    localStorage.setItem('nameOfTheUser', input.value);
    fillNames();
});

// == Choices Picker ====>
choices.forEach((item) => {
    item.addEventListener('click', () => {
        // clear count
        localStorage.setItem('countOfGreetengs', count = 0)
        // remove all unnecessary choices
        choices.forEach((item) => {
            item.classList.remove('active');
        });
        // show the need one
        item.classList.toggle('active');
        // register id of the chosen choice
        choices.forEach((item, i) => {
            if(item.classList.contains('active')) {
                localStorage.setItem('choiceID', i);
            }
        });
    })
});

// == Choice Detecter ====>
choices.forEach((item, i) => {
    if(i == localStorage.getItem('choiceID')) {
        item.classList.add('active');
    }
});

// == welcome popup ===>
count = localStorage.getItem('countOfGreetengs');
count++;
localStorage.setItem('countOfGreetengs', count);
if(count > 3) {
    count = 3;
    localStorage.setItem('countOfGreetengs', count);
} else {
    toGreet(welcomePopup);
}

function toGreet(popup) {
    let choiceText = document.querySelector('.naming-choice.active .naming-style').textContent;
    welcomePopup.innerHTML = `<p>${choiceText}</p>
    <h3>${localStorage.getItem('nameOfTheUser')}</h3>`;
    popup.classList.add('active');
    setTimeout(() => {popup.classList.remove('active')}, 3000);
}