 const input = document.getElementById('input-task');
const btn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((taskObj, i) => {
    const element = document.createElement('div');
    element.classList.add('todo');
    element.innerHTML = `
      <span class="task" contenteditable="false">${taskObj.text}</span>
      <button class="edit">Edit</button>
      <span class="delete">&#x2716;</span>
    `;

    // Delete Task
    element.querySelector('.delete').onclick = function() {
      tasks.splice(i, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };

    // Edit Task
    const taskText = element.querySelector('.task');
    element.querySelector('.edit').onclick = function() {
      if (this.innerText === 'Edit') {
        taskText.contentEditable = "true";
        taskText.focus();
        this.innerText = 'Save';
      } else {
        taskText.contentEditable = "false";
        tasks[i].text = taskText.innerText.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        this.innerText = 'Edit';
      }
    };

    taskList.appendChild(element);
  });
}

btn.onclick = function() {
  const query = input.value.trim();
  if (!query) {
    alert("No value entered");
    return;
  }
  tasks.push({ text: query });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  renderTasks();
};

renderTasks();