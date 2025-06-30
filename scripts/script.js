// Load saved tasks on page load
window.onload = () => {
  loadTasks();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");

  li.innerHTML = `
    <span onclick="toggleComplete(this)">${taskText}</span>
    <button onclick="deleteTask(this)">❌</button>
  `;

  taskList.appendChild(li);
  input.value = "";
  saveTasks();
}

function toggleComplete(span) {
  span.parentElement.classList.toggle("completed");
  saveTasks();
}

function deleteTask(button) {
  const li = button.parentElement;
  li.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  const listItems = document.querySelectorAll("#taskList li");

  listItems.forEach(item => {
    tasks.push({
      text: item.querySelector("span").innerText,
      completed: item.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");

    li.classList.toggle("completed", task.completed);
    li.innerHTML = `
      <span onclick="toggleComplete(this)">${task.text}</span>
      <button onclick="deleteTask(this)">❌</button>
    `;
    taskList.appendChild(li);
  });
}
