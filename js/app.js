'use strict'

// == form ===>
const formBtn = document.querySelector('.form-btn');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const password = document.getElementById('password');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

// btn active
formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkForm();
});

function checkForm() {
    const firstName_value = firstName.value.trim();
    const lastName_value = lastName.value.trim();
    const password_value = password.value.trim();
    const email_value = email.value.trim();
    const phone_value = phone.value.trim();

    if(firstName_value === '') {
        setErrorFor(firstName);
    } else {
        let capital = firstName_value.charAt(0);
        if(capital !== capital.toUpperCase() || capital == isNaN()) {
            setErrorFor(firstName);
        } else {
            setSuccessFor(firstName);
        }
    }

    if(lastName_value === '') {
        setErrorFor(lastName);
    } else {
        let capital = lastName_value.charAt(0);
        if(capital !== capital.toUpperCase() || capital == isNaN()) {
            setErrorFor(lastName);
        } else {
            setSuccessFor(lastName);
        }
    }

    if(password_value === '' || password_value.length < 6) {
        setErrorFor(password);
    } else {
        setSuccessFor(password);
    }
    if(email_value === '') {
        setErrorFor(email);
    } else if (!isEmail(email_value)) {
		setErrorFor(email);
	} else {
		setSuccessFor(email);
	}
    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
    if(phone_value === '' || phone_value.length !== 10) {
        setErrorFor(phone);
    } else {
        setSuccessFor(phone);
    }
}

function setErrorFor(input, message) {
    const formItemField = input.parentElement;
    formItemField.classList.remove('success');
    formItemField.classList.add('failure');
}
function setSuccessFor(input) {
    const formItemField = input.parentElement;
    formItemField.classList.remove('failure');
    formItemField.classList.add('success');
}

// == choices ===>
const input = document.querySelector('.naming-field input');
const name = document.querySelectorAll('.naming-name');
const choices = document.querySelectorAll('.naming-choice');
const welcomePopup = document.querySelector('.naming-popup');
let count; // for welcome popup

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