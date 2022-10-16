const reminder = document.getElementById('reminder');
const submitBtn = document.querySelector('.submit-btn');
const reminderList = document.querySelector('.reminder-list');
const container = document.querySelector('.reminder-container');
const clearBtn = document.querySelector('.clear-btn');
const form = document.querySelector('.reminder-form');


form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);

let editElement;
let editFlag = false;

function addItem (e) {
    e.preventDefault();
    const value = reminder.value;
    if (value && !editFlag) {
        const id = new Date().getTime().toString();
        const element = document.createElement('article');
        element.classList.add('reminder-item');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        const value = reminder.value;
        element.innerHTML += `<p class="title">${value}</p>
                            <button class="delete-btn">delete</button>
                            <button class="edit-btn">edit</button>`;
        reminderList.appendChild(element);
        reminder.value = "";
        container.classList.add('show-container');
        const deleteBtn = document.querySelectorAll('.delete-btn');
        const editBtn = document.querySelectorAll('.edit-btn');
        editBtn.forEach(function (btn) {
            btn.addEventListener('click', editItem);
        })
        deleteBtn.forEach(function (btn) {
            btn.addEventListener('click', deleteItem);
    })} else if (value && editFlag == true) {
        editElement.innerHTML = reminder.value;
        submitBtn.textContent = "submit";
        reminder.value = "";
        editFlag = false;
    } else {
        alert('please enter a nudge');
    }
}

function clearItems () {
    reminderList.innerHTML = "";
    container.classList.remove('show-container');
}

function deleteItem (e) {
    const element = e.currentTarget.parentElement;
    reminderList.removeChild(element);
    if (reminderList.children.length === 0) {
        container.classList.remove('show-container');
    }
    console.log(element);
}

function editItem (e) {
    editElement = e.currentTarget.previousElementSibling.previousElementSibling;
    reminder.value = editElement.innerHTML;
    editFlag = true;
    submitBtn.textContent = "edit";
};