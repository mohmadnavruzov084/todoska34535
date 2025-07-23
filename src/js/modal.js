export const setupModal = ({ onAddTodo }) => {
  // Получаем элементы DOM
  const headerBtnAdd = document.querySelector(".js-header-add");
  const closeModalBtn = document.querySelector(".js-close-modal");
  const modalBtn = document.querySelector(".js-modal-btn");
  const colorButtons = document.querySelectorAll(".color button");
  const modalInput = document.querySelector(".js-modal-input");
  const overlay = document.querySelector(".js-overlay");
  const modal = document.querySelector(".js-modal");

  // Состояние модального окна
  let selectedColor = "blue";

  // Функции управления модальным окном
  const openModal = () => {
    overlay.classList.add("block");
    modal.classList.add("block");
    // Сброс выбранного цвета при открытии
    colorButtons.forEach((btn) => (btn.style.border = "none"));
    colorButtons[2].style.border = "2px solid black"; // Синий по умолчанию
    selectedColor = "blue";
  };

  const closeModal = () => {
    overlay.classList.remove("block");
    modal.classList.remove("block");
    modalInput.value = "";
  };

  // Обработчик выбора цвета
  const handleColorSelect = (selectedBtn) => {
    colorButtons.forEach((btn) => {
      btn.style.border = "none";
    });
    selectedBtn.style.border = "2px solid black";

    // Определяем выбранный цвет
    if (selectedBtn.classList.contains("js-color-item-1")) {
      selectedColor = "red";
    } else if (selectedBtn.classList.contains("js-color-item-2")) {
      selectedColor = "green";
    } else {
      selectedColor = "blue";
    }
  };

  // Обработчик добавления задачи
  const handleAddTodo = () => {
    const taskText = modalInput.value.trim();
    if (!taskText) return;

    onAddTodo({
      text: taskText,
      color: selectedColor,
    });

    closeModal();
  };

  // Навешиваем обработчики событий
  headerBtnAdd.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);
  modalBtn.addEventListener("click", handleAddTodo);

  // Обработчики для кнопок цвета
  colorButtons.forEach((btn) => {
    btn.addEventListener("click", () => handleColorSelect(btn));
  });

  // Закрытие по клику на overlay
  overlay.addEventListener("click", closeModal);

  // Закрытие по ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("block")) {
      closeModal();
    }
  });
};
