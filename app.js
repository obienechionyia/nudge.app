const reminder = document.getElementById('reminder');
const submitBtn = document.querySelector('.submit-btn');
const reminderList = document.querySelector('.reminder-list');
const container = document.querySelector('.reminder-container');
const clearBtn = document.querySelector('.clear-btn');
const form = document.querySelector('.reminder-form');

form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);

function addItem (e) {
    e.preventDefault();
    const value = reminder.value
    reminderList.innerHTML += `<p class="title">${value}</p>`
    reminder.value = "";
}

function clearItems () {
    reminderList.innerHTML = "";
}