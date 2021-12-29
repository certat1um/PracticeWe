'use strict'

// == form popup ===>
const formBtn = document.querySelector('.form-btn');
const formPopUp = document.querySelector('.form-popup');
const inputs = document.querySelectorAll('label input');

// btn active
formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    inputs.forEach((item) => {
        item.value = '';
    });
    formPopUp.classList.add('active');
    setTimeout(() => {formPopUp.classList.remove('active')}, 5000);
});

// form inputs clearing


