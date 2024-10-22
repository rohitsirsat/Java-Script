const todoInpudt = document.getElementById("todo-input");
const addTaskButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let tasks = [];

addTaskButton.addEventListener("click", (e) => {
  const taskText = todoInpudt.value.trim();
  if (taskText === "") return alert("add a task");

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);
  todoInpudt.value = ""; // clear input

  console.log(tasks);
});

function saveTask() {}
