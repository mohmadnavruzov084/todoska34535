import { setupTabs } from "./js/tabs.js";
import { setupModal } from "./js/modal.js";
import "./scss/main.scss";

// DOM элементы
const headerTabActive = document.querySelector(".js-header-tab-active");
const headerTabClose = document.querySelector(".js-header-tab-close");
const bodyList = document.querySelector(".js-body");

// Состояние приложения
let todos = JSON.parse(localStorage.getItem("tasks")) || [];
let filterState = { currentFilter: "active" };

// Функция сохранения задач
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(todos));
}

// Форматирование времени
function formatTimeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return "только что";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} минут назад`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} часов назад`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} дней назад`;
  return `${Math.floor(seconds / 604800)} недель назад`;
}

// Рендер одной задачи
function renderTodo(todo) {
  const taskItem = document.createElement("div");
  taskItem.className = "body-item";
  taskItem.dataset.id = todo.id;
  taskItem.dataset.createdAt = todo.createDate;

  if (todo.color) taskItem.style.backgroundColor = todo.color;
  if (todo.completed) taskItem.style.opacity = "0.7";

  taskItem.innerHTML = `
    <div>
      <div class="task-text">${todo.text}</div>
      <div class="task-time">${formatTimeAgo(new Date(todo.createDate))}</div>
    </div>
    <div class="body-icon">
      <button class="delete_btn js-delete-btn">
        <!-- SVG иконка -->
      </button>
    </div>
  `;

  taskItem.addEventListener("click", (e) => {
    if (!e.target.closest(".js-delete-btn")) {
      todo.completed = !todo.completed;
      saveTasks();
      renderTodos();
    }
  });

  taskItem.querySelector(".js-delete-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    todos = todos.filter(item => item.id !== todo.id);
    saveTasks();
    renderTodos();
  });

  bodyList.append(taskItem);
}

// Фильтрация задач
function filterTodos() {
  if (filterState.currentFilter === "all") return todos;
  return todos.filter(todo => 
    filterState.currentFilter === "active" ? !todo.completed : todo.completed
  );
}

// Рендер всех задач
function renderTodos() {
  bodyList.innerHTML = "";
  filterTodos().forEach(todo => renderTodo(todo));
}

// Инициализация
setupTabs(headerTabActive, headerTabClose, renderTodos, filterState);
setupModal({
  onAddTodo: (text, color) => {
    const todo = {
      id: Math.random().toString(36).substring(2, 9),
      text,
      color,
      completed: false,
      createDate: Date.now()
    };
    todos.push(todo);
    saveTasks();
    renderTodos();
  }
});

// Загрузка задач при старте
if (todos.length > 0) renderTodos();

// Обновление времени каждую минуту
setInterval(() => {
  document.querySelectorAll(".task-time").forEach(el => {
    const createdAt = new Date(parseInt(el.closest(".body-item").dataset.createdAt));
    el.textContent = formatTimeAgo(createdAt);
  });
}, 60000);