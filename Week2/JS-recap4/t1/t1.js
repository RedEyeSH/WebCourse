// import { query } from "express";

// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

// add your code here
const get_ul = document.querySelector("ul");
const addButton = document.querySelector(".add-btn");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const input = document.querySelector("input");

function renderTodo() {
  get_ul.innerHTML = "";

  todoList.forEach((todo) => {
    const li = document.createElement("li");
    
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = todo.completed;
      input.addEventListener("change", () => {
        todo.completed = input.checked;
        console.log("Updated todo list:", todo);
      }); 
    
      const label = document.createElement("label");
      label.innerHTML = todo.task;
      
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", () => deleteTodo(li, todo.id));
    
      li.append(input, label, deleteButton);
      get_ul.append(li);
  });
}

const deleteTodo = (listItem, id) => {
  get_ul.removeChild(listItem);
  
  const index = todoList.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todoList.splice(index, 1);
  }

  console.log("Updated todo list:", todoList);
}

addButton.addEventListener("click", () => {
  dialog.show();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const taskName = input.value.trim();
  if (taskName) {
    const newTodo = {
      id: todoList.length ? todoList[todoList.length - 1].id + 1 : 1,
      task: taskName,
      completed: false
    }

    todoList.push(newTodo);
    console.log("Updated todo list:", todoList);
    dialog.close();
    renderTodo();
  }
});


renderTodo();

