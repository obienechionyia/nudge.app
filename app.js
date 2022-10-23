// buttons and containers that will be used to manipulate DOM

const reminder = document.getElementById('reminder');
const submitBtn = document.querySelector('.submit-btn');
const reminderList = document.querySelector('.reminder-list');
const container = document.querySelector('.reminder-container');
const clearBtn = document.querySelector('.clear-btn');
const clearChecked = document.querySelector('.clear-checked');
const form = document.querySelector('.reminder-form');
const undo = document.querySelector('.undo-btn');

// event listeners

form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);
clearChecked.addEventListener('click', deleteChecked);

// edit variables
let editElement;
let editFlag = false;


// function to add an item to the reminder list

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
                            <div class="btn-container">
                            <input type="checkbox" class="checkbox">
                                <button class="delete-btn"><i class="fa-regular fa-trash-can"></i></button>
                                <button class="edit-btn"><i class="fa-regular fa-pen-to-square"></i></button>
                            </div>`;
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
        submitBtn.textContent = "add";
        reminder.value = "";
        editFlag = false;
    } else {
        alert('please enter a nudge');
    }

    // checked boxes array, necessary to show and remove the clearChecked button
    let checkedBoxes = [];

    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach(function(box) {
        box.addEventListener('change', function() {
            if (box.checked && !checkedBoxes.includes(box)) {
                box.parentElement.parentElement.children[0].classList.add('strike');
                checkedBoxes.push(box);
            } else {
                box.parentElement.parentElement.children[0].classList.remove('strike');
                checkedBoxes = checkedBoxes.filter(function(item) {
                    return item !== box;
                })
            }
            if (checkedBoxes.length >= 1) {
                clearChecked.classList.add('show-item');
                console.log(checkedBoxes.length);
            } else {
                clearChecked.classList.remove('show-item');
            }
        })
    })
}



function clearItems () {
    reminderList.innerHTML = "";
    container.classList.remove('show-container');
}

function deleteItem (e) {
    const element = e.currentTarget.parentElement.parentElement;
    reminderList.removeChild(element);
    if (reminderList.children.length === 0) {
        container.classList.remove('show-container');
    }
}

function editItem (e) {
    editElement = e.currentTarget.parentElement.previousElementSibling;
    reminder.value = editElement.innerHTML;
    editFlag = true;
    submitBtn.textContent = "edit";
}

function deleteChecked () {
    checkedList = [];
    checked = document.querySelectorAll('.checkbox');
    checked.forEach(function (box) {
        if (box.checked) {
            box.parentElement.parentElement.remove();
        }
    })
    clearChecked.classList.remove('show-item');
    if (reminderList.innerHTML == "") {
        container.classList.remove('show-container');
    }
}