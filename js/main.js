// main.js — небольшие сценарии поверх Bootstrap.
// Каждый блок проверяет, есть ли нужный элемент на странице,
// поэтому один файл можно подключать на любой странице.

// 1. Фильтр курсов по уровню (catalog.html)
const courseList = document.getElementById('course-list');

if (courseList) {
  const filterInputs = document.querySelectorAll('input[name="level-filter"]');
  const courseCount = document.getElementById('course-count');

  filterInputs.forEach((input) => {
    input.addEventListener('change', () => {
      const group = input.value;
      let shown = 0;

      courseList.querySelectorAll('[data-group]').forEach((course) => {
        const visible = group === 'all' || course.dataset.group === group;
        // d-none — утилита Bootstrap, скрывает элемент (display: none)
        course.classList.toggle('d-none', !visible);
        if (visible) shown += 1;
      });

      courseCount.textContent = `Показано курсов: ${shown}`;
    });
  });
}
