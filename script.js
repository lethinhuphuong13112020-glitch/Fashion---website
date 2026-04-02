let todo = JSON.parse(localStorage.getItem("todo")) || [];

// DOM elements will be queried after DOMContentLoaded to avoid null when script
// runs before the elements are parsed. Declare variables here so they're
// available to other functions.
let todoList;
let todoCount;
let todoInput;
let addButton;
let deleteAllButton;

// Initialize the app
document.addEventListener("DOMContentLoaded", function() {
    // Query DOM elements now that the document is ready
    todoList = document.getElementById("todolist");
    todoCount = document.querySelector(".counter-container span");  // Fixed: select counter span
    todoInput = document.getElementById("todoinput");
    addButton = document.querySelector(".btn");  // Fixed: use querySelector for class
    deleteAllButton = document.getElementById("deleteButton");

    // Defensive checks to avoid runtime errors if an element is missing
    if (addButton) {
        addButton.addEventListener("click", addTask);
    } else {
        console.warn('Add button (.btn) not found in DOM');
    }

    if (todoInput) {
        todoInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                addTask();
            }
        });
    } else {
        console.warn('todoInput (#todoinput) not found in DOM');
    }

    if (deleteAllButton) {
        deleteAllButton.addEventListener("click", deleteAllTasks);
    } else {
        console.warn('deleteAllButton (#deleteButton) not found in DOM');
    }

    displayTasks();
});
 function addTask() {
    const newTask = todoInput.value.trim();
    if (newTask !== "") {
        todo.push({ text: newTask, disabled: false });
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();
    }
}

function deleteAllTasks() {
   console.log("test");
}
function displayTasks() {
  todoList.innerHTML = "";

  todo.forEach((item, index) => {
    const wrapper = document.createElement("p");

    const html = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox"
          id="input-${index}" ${item.disabled ? "checked" : ""}>
        <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}"
          onclick="editTask(${index})">${item.text}</p>
      </div>
    `;

    wrapper.innerHTML = html;

    const checkbox = wrapper.querySelector(".todo-checkbox");
    checkbox.addEventListener("change", () => {
      toggleTask(index);
    });

    todoCount.textContent = todo.length;
    todoList.appendChild(wrapper);
  });
}

function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", () => {
        const updatedText = inputElement.value.trim();
        if (updatedText !== "") {
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    });
}

function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}