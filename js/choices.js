'use strict'

const input = document.querySelector('.naming-field input');
const name = document.querySelectorAll('.naming-name');
const choices = document.querySelectorAll('.naming-choice');

// == Name Setter in LS ===>
function fillNames() {
    name.forEach((item) => {
        item.innerHTML = localStorage.getItem('nameOfTheUser');
    });
}

// To set name (dynamic view)
input.addEventListener('input', () => {
    localStorage.setItem('nameOfTheUser', input.value);
    fillNames();
});

if(localStorage.getItem('nameOfTheUser') !== null) {
    fillNames()
}

// == Choices Picker ====>
choices.forEach((item) => {
    item.addEventListener('click', () => {
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