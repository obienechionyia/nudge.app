const reminder = document.getElementById('reminder');
const submitBtn = document.querySelector('.submit-btn');
const reminderList = document.querySelector('.reminder-list');
const container = document.querySelector('.reminder-container');
const clearBtn = document.querySelector('.clear-btn');
const clearChecked = document.querySelector('.clear-checked');
const form = document.querySelector('.reminder-form');
const undo = document.querySelector('.undo-btn');


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
        submitBtn.textContent = "submit";
        reminder.value = "";
        editFlag = false;
    } else {
        alert('please enter a nudge');
    }

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
    undo.classList.add('show-item');
    undo.addEventListener('click', function () {
        container.classList.add('show-container');
        reminderList.appendChild(element);
    })
}

function editItem (e) {
    editElement = e.currentTarget.parentElement.previousElementSibling;
    reminder.value = editElement.innerHTML;
    editFlag = true;
    submitBtn.textContent = "edit";
}

// function showClearChecked (array) {
//     if (array.length > 0) {
//         clearChecked.classList.add('show-item');
//     } else {
//         clearChecked.classList.remove('show-item');
//     }
//     clearChecked.addEventListener('click', function () {
//         array.forEach(function (check) {
//             check.parentElement.parentElement.innerHTML = "";
//         })
//     })
// }