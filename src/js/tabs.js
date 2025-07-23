// tabs.js
export const setupTabs = (
  headerTabActive,
  headerTabClose,
  renderTodos,
  filterState
) => {


  headerTabActive.addEventListener("click", () => {
    filterState.currentFilter = "active"; // Используем объект
    headerTabActive.classList.add("active");
    headerTabClose.classList.remove("active");
    renderTodos();
  });

  headerTabClose.addEventListener("click", () => {
    filterState.currentFilter = "completed";
    headerTabClose.classList.add("active");
    headerTabActive.classList.remove("active");
    renderTodos();
  });
};
