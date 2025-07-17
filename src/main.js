import "./scss/main.scss";

const headerTabActive = document.querySelector(".js-header-tab-active");
const headerTabClose = document.querySelector(".js-header-tab-close");
const headerBtnAdd = document.querySelector(".js-header-add");

const deleteTaskItem = document.querySelector(".delete_btn");
const bodyList = document.querySelector(".js-body");

const overlay = document.querySelector(".js-overlay");
const modal = document.querySelector(".js-modal");
const closeModal = document.querySelector(".js-close-modal");
const modalInput = document.querySelector(".js-modal-input");
const colorItem_1 = document.querySelector(".js-color-item-1");
const colorItem_2 = document.querySelector(".js-color-item-2");
const colorItem_3 = document.querySelector(".js-color-item-3");
const allColorBtn = document.querySelectorAll(".color button");
const modalBtn = document.querySelector(".js-modal-btn");

let todos = [];

let currentFilter = "all";

// При клике на "Активные"
headerTabActive.addEventListener("click", () => {
  currentFilter = "active";
  headerTabActive.classList.add("active");
  headerTabClose.classList.remove("active");
  renderTodos();
});

// При клике на "Завершённые"
headerTabClose.addEventListener("click", () => {
  currentFilter = "completed";
  headerTabClose.classList.add("active");
  headerTabActive.classList.remove("active");
  renderTodos();
});

// Функция фильтрации
function filterTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  } else if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  } else {
    return todos; // Показывает все задачи
  }
}

function openModal() {
  overlay.classList.add("block");
  modal.classList.add("block");
}

function modalClose() {
  overlay.classList.remove("block");
  modal.classList.remove("block");
}

headerBtnAdd.addEventListener("click", openModal);
closeModal.addEventListener("click", modalClose);

function getTextInput() {
  addTodo();
  modalInput.value = "";
}
modalBtn.addEventListener("click", getTextInput);

let color = "blue";
function setColor() {
  allColorBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      allColorBtn.forEach((button) => {
        button.style.border = "2px solid transparent";
      });
      btn.style.border = "2px solid black";
      if (btn.classList.contains("js-color-item-1")) {
        color = "red";
      } else if (btn.classList.contains("js-color-item-2")) {
        color = "green";
      } else if (btn.classList.contains("js-color-item-3")) {
        color = "blue";
      }
    });
  });
}
setColor();

todos = JSON.parse(localStorage.getItem("tasks"));
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(todos));
}

function addTodo() {
  const todo = {
    id: Math.trunc(Math.random() * 99999),
    text: modalInput.value,
    color: color,
    completed: false,
    createDate: Date.now(),
  };

  todos.push(todo);
  renderTodos(todo);
  saveTasks();
  modalClose();
}

function renderTodos() {
  bodyList.innerHTML = "";
  const filteredTodos = filterTodos();
  filteredTodos.forEach((todo) => renderTodo(todo));
}

function formatTimeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "только что";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} минут назад`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} часов назад`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} дней назад`;
  return `${Math.floor(seconds / 604800)} недель назад`;
}

function renderTodo(todo) {
  if (!todo) return;
  const taskItem = document.createElement("div");
  taskItem.className = "body-item";
  taskItem.dataset.id = todo.id;
  const taskId = Date.now();
  taskItem.dataset.createdAt = todo.createDate;

  if (todo.color) {
    taskItem.style.backgroundColor = todo.color;
  }
  if (todo.completed) {
    taskItem.style.opacity = "0.7";
  }

  taskItem.innerHTML = `
  <div >
    <div class="task-text">${todo.text}</div>
    <div class="task-time">${formatTimeAgo(new Date(todo.createDate))}</div>
    
  </div>
  <div class="body-icon">
    <button class="delete_btn  js-delete-btn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
      </svg>
    </button>
  </div>
`;

  taskItem.addEventListener("click", (e) => {
    if (!e.target.closest(".js-delete-btn")) {
      todo.completed = !todo.completed;
      renderTodos();
    }
  });

  taskItem.querySelector(".js-delete-btn").addEventListener("click", () => {
    todos = todos.filter((item) => item.id !== todo.id);
    renderTodos();
  });

  bodyList.append(taskItem);
  saveTasks();
}
if (localStorage.length != 0) {
  renderTodos();
}

setInterval(() => {
  document.querySelectorAll(".body-item").forEach((task) => {
    const timeElement = task.querySelector(".task-time");
    if (timeElement) {
      const createdAt = new Date(parseInt(task.dataset.createdAt));
      timeElement.textContent = formatTimeAgo(createdAt);
    }
  });
}, 60000);
