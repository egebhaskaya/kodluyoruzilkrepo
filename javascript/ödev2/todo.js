let toDoList = localStorage.getItem("toDoList");
toDoList = toDoList ? JSON.parse(toDoList) : [];

const newElement = () => {
  let inputValue = document.getElementById("task").value;
  if (inputValue === " ") {
    console.log("boş girdin");
  } else if (inputValue) {
    toDoList.push({ name: inputValue, done: false });
    console.log(toDoList);
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    let liDOM = document.querySelector("#list");
    let newTask = document.createElement("li");
    newTask.innerHTML = `<li>${toDoList[toDoList.length - 1].name}</li>`;
    liDOM.append(newTask);
  } else {
    console.log("doldur");
  }
  renderTodos();
};

const removeTodo = (index) => {
  removed = toDoList.splice(index, 1);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  renderTodos();
};

const toggleDone = (index) => {
  let booltrue = true;
  let boolfalse = false;
  toDoList[index].done === false
    ? (toDoList[index].done = booltrue)
    : (toDoList[index].done = boolfalse);
  console.log(toDoList[index]);
  renderTodos();
};

const renderTodos = () => {
  let liDOM = document.querySelector("#list");
  let tasks = JSON.parse(localStorage.getItem("toDoList"));
  liDOM.innerHTML = null;
  tasks.map((value, index) => {
    let renderTodos = document.createElement("li");
    let removeTodo = document.createElement("button");
    removeTodo.innerHTML = `<button onclick="removeTodo(${index})">x</button>`;
    renderTodos.innerHTML = `<li key="${index}" onclick="toggleDone(${index})" style="${
      toDoList[index].done === false ? "" : "text-decoration-line: line-through"
    }">${value.name}${removeTodo.innerHTML}</li> `;
    liDOM.append(renderTodos);
  });
};

document.onload = renderTodos();
