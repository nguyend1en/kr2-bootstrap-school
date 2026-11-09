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

// 2. Тест на уровень (test.html)
const levelTest = document.getElementById('level-test');

if (levelTest) {
  const result = document.getElementById('test-result');
  const warning = document.getElementById('test-warning');
  const total = 8;
  // Порог правильных ответов -> уровень и подходящий курс
  const levels = [
    { min: 7, level: 'B2', course: 'Русский для учёбы в вузе (B2)' },
    { min: 5, level: 'B1', course: 'Подготовка к ТРКИ-1 (B1)' },
    { min: 3, level: 'A2', course: 'Базовый уровень (A2)' },
    { min: 0, level: 'A1', course: 'Русский с нуля (A1)' },
  ];

  levelTest.addEventListener('submit', (event) => {
    event.preventDefault();

    // Bootstrap-валидация: если есть вопрос без ответа, подсвечиваем его
    if (!levelTest.checkValidity()) {
      levelTest.classList.add('was-validated');
      warning.classList.remove('d-none');
      return;
    }
    // Ответы проверены — убираем зелёную подсветку полей, чтобы она
    // не выглядела как «все ответы верные»
    levelTest.classList.remove('was-validated');
    warning.classList.add('d-none');

    const answers = levelTest.querySelectorAll('input[type="radio"]:checked');
    let score = 0;
    answers.forEach((answer) => { score += Number(answer.value); });

    const found = levels.find((item) => score >= item.min);
    const percent = Math.round((score / total) * 100);

    document.getElementById('test-score').textContent = `Правильных ответов: ${score} из ${total}`;
    const bar = document.getElementById('test-progress-bar');
    bar.style.width = `${percent}%`;
    bar.textContent = `${percent}%`;
    document.getElementById('test-progress').setAttribute('aria-valuenow', score);
    document.getElementById('test-level').innerHTML =
      `Ваш примерный уровень — <strong>${found.level}</strong>. Рекомендуем курс «${found.course}». ` +
      '<a class="alert-link" href="catalog.html">Перейти к курсам</a>';

    result.classList.remove('d-none');
    result.scrollIntoView({ behavior: 'smooth' });
  });

  // Кнопка «Пройти заново» очищает форму и скрывает результат
  levelTest.addEventListener('reset', () => {
    levelTest.classList.remove('was-validated');
    result.classList.add('d-none');
    warning.classList.add('d-none');
  });
}
