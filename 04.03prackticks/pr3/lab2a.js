// =====================================================
// ИСХОДНЫЕ ДАННЫЕ
// =====================================================
const INITIAL_DATA = {
    numbers: [12, 7, 23, 45, 18, 31, 6, 42, 19, 8],
    fruits: ["яблоко", "банан", "апельсин", "груша", "киви", "манго", "ананас"],
    students: [
        { id: 1, name: "Алексей", age: 20, group: "ИС-201", grade: 85 },
        { id: 2, name: "Мария",   age: 19, group: "ИС-202", grade: 92 },
        { id: 3, name: "Иван",    age: 21, group: "ИС-201", grade: 78 },
        { id: 4, name: "Екатерина", age: 20, group: "ИС-203", grade: 95 },
        { id: 5, name: "Дмитрий", age: 22, group: "ИС-201", grade: 67 },
        { id: 6, name: "Анна",    age: 19, group: "ИС-202", grade: 88 }
    ],
    matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
};

// =====================================================
// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
// =====================================================
let numbers  = [...INITIAL_DATA.numbers];
let fruits   = [...INITIAL_DATA.fruits];
let students = INITIAL_DATA.students.map(s => ({ ...s }));
let matrix   = INITIAL_DATA.matrix.map(row => [...row]);

// =====================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// =====================================================
function displayData(title, data) {
    const output = document.getElementById('output');
    let content = `📌 ${title}\n\n`;

    if (typeof data === 'string') {
        content += data;
    } else if (Array.isArray(data)) {
        if (data.length === 0) {
            content += '(пустой массив)';
        } else if (typeof data[0] === 'object' && data[0] !== null) {
            content += JSON.stringify(data, null, 2);
        } else {
            content += '[' + data.join(', ') + ']';
        }
    } else {
        content += JSON.stringify(data, null, 2);
    }

    output.textContent = content;
}

function updateDataDisplay() {
    document.getElementById('numbersDisplay').textContent = '[' + numbers.join(', ') + ']';
    document.getElementById('fruitsDisplay').textContent = '[' + fruits.join(', ') + ']';
    document.getElementById('studentsDisplay').innerHTML =
        'Всего: <span class="badge">' + students.length + '</span> студентов';
    document.getElementById('studentsList').textContent = students.map(s => s.name).join(', ');
}

function resetData() {
    numbers  = [...INITIAL_DATA.numbers];
    fruits   = [...INITIAL_DATA.fruits];
    students = INITIAL_DATA.students.map(s => ({ ...s }));
    matrix   = INITIAL_DATA.matrix.map(row => [...row]);
    updateDataDisplay();
    displayData('Сброс данных', '✅ Данные сброшены к исходному состоянию');
}

// =====================================================
// ЗАДАНИЕ 1: БАЗОВЫЕ ОПЕРАЦИИ
// =====================================================
function addNumber() {
    const input = document.getElementById('newNumberInput');
    const value = parseInt(input.value);
    if (isNaN(value)) {
        displayData('Ошибка', 'Пожалуйста, введите число');
        return;
    }
    numbers.push(value);
    input.value = '';
    updateDataDisplay();
    displayData('Добавление в конец (push)',
        `Добавлено число ${value} в конец\nТекущий массив: [${numbers.join(', ')}]`);
}

function addNumberFront() {
    const input = document.getElementById('newNumberInput');
    const value = parseInt(input.value);
    if (isNaN(value)) {
        displayData('Ошибка', 'Пожалуйста, введите число');
        return;
    }
    numbers.unshift(value);
    input.value = '';
    updateDataDisplay();
    displayData('Добавление в начало (unshift)',
        `Добавлено число ${value} в начало\nТекущий массив: [${numbers.join(', ')}]`);
}

function removeLastNumber() {
    if (numbers.length === 0) {
        displayData('Ошибка', 'Массив пуст!');
        return;
    }
    const removed = numbers.pop();
    updateDataDisplay();
    displayData('Удаление последнего (pop)',
        `Удалён последний элемент: ${removed}\nТекущий массив: [${numbers.join(', ')}]`);
}

function removeFirstNumber() {
    if (numbers.length === 0) {
        displayData('Ошибка', 'Массив пуст!');
        return;
    }
    const removed = numbers.shift();
    updateDataDisplay();
    displayData('Удаление первого (shift)',
        `Удалён первый элемент: ${removed}\nТекущий массив: [${numbers.join(', ')}]`);
}

function removeAtIndex() {
    const input = document.getElementById('removeIndexInput');
    const index = parseInt(input.value);
    if (isNaN(index) || index < 0 || index >= numbers.length) {
        displayData('Ошибка', `Некорректный индекс. Доступны индексы от 0 до ${numbers.length - 1}`);
        return;
    }
    const removed = numbers.splice(index, 1)[0];
    input.value = '';
    updateDataDisplay();
    displayData('Удаление по индексу (splice)',
        `Удалён элемент по индексу ${index}: ${removed}\nТекущий массив: [${numbers.join(', ')}]`);
}

function insertAtIndex() {
    const indexInput = document.getElementById('removeIndexInput');
    const valueInput = document.getElementById('newNumberInput');
    const index = parseInt(indexInput.value);
    const value = parseInt(valueInput.value);

    if (isNaN(index) || index < 0 || index > numbers.length) {
        displayData('Ошибка', `Некорректный индекс. Доступны индексы от 0 до ${numbers.length}`);
        return;
    }
    if (isNaN(value)) {
        displayData('Ошибка', 'Пожалуйста, введите число');
        return;
    }
    numbers.splice(index, 0, value);
    indexInput.value = '';
    valueInput.value = '';
    updateDataDisplay();
    displayData('Вставка элемента (splice)',
        `Вставлено число ${value} по индексу ${index}\nТекущий массив: [${numbers.join(', ')}]`);
}

// =====================================================
// ЗАДАНИЕ 2: ФУНКЦИОНАЛЬНЫЕ МЕТОДЫ
// =====================================================
function doubleNumbers() {
    const doubled = numbers.map(n => n * 2);
    displayData('Удвоение чисел (map)',
        `Исходный массив: [${numbers.join(', ')}]\n` +
        `Результат: [${doubled.join(', ')}]\n` +
        `✅ Исходный массив не изменён`);
}

function fruitsToUpper() {
    const upper = fruits.map(f => f.toUpperCase());
    displayData('Фрукты заглавными (map)',
        `Исходный массив: [${fruits.join(', ')}]\n` +
        `Результат: [${upper.join(', ')}]`);
}

function filterEven() {
    const evens = numbers.filter(n => n % 2 === 0);
    displayData('Чётные числа (filter)',
        `Исходный массив: [${numbers.join(', ')}]\n` +
        `Чётные: [${evens.join(', ')}]\n` +
        `Количество: ${evens.length}`);
}

function filterGreaterThan20() {
    const filtered = numbers.filter(n => n > 20);
    displayData('Числа > 20 (filter)',
        `Исходный массив: [${numbers.join(', ')}]\n` +
        `Числа > 20: [${filtered.join(', ')}]\n` +
        `Количество: ${filtered.length}`);
}

function filterStudentsByGrade() {
    const top = students.filter(s => s.grade >= 80);
    displayData('Студенты с оценкой ≥ 80 (filter)',
        `Всего студентов: ${students.length}\n` +
        `Подходящих: ${top.length}\n\n` +
        top.map(s => `${s.name} — ${s.grade} (${s.group})`).join('\n'));
}

function findNumber() {
    const input = document.getElementById('findNumberInput');
    const value = parseInt(input.value);
    if (isNaN(value)) {
        displayData('Ошибка', 'Введите число');
        return;
    }
    const index = numbers.indexOf(value);
    if (index !== -1) {
        displayData('Поиск числа (indexOf)',
            `Число ${value} найдено на позиции ${index}`);
    } else {
        displayData('Поиск числа',
            `Число ${value} не найдено\nМассив: [${numbers.join(', ')}]`);
    }
}

function findStudent() {
    const input = document.getElementById('findStudentInput');
    const name = input.value.trim();
    if (!name) {
        displayData('Ошибка', 'Введите имя студента');
        return;
    }
    const student = students.find(s => s.name.toLowerCase() === name.toLowerCase());
    if (student) {
        displayData('Поиск студента (find)',
            `Студент найден:\n${JSON.stringify(student, null, 2)}`);
    } else {
        displayData('Поиск студента',
            `Студент "${name}" не найден\n\n` +
            `Доступные: ${students.map(s => s.name).join(', ')}`);
    }
}

function sumNumbers() {
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    displayData('Сумма чисел (reduce)',
        `Массив: [${numbers.join(', ')}]\n\n` +
        `Сумма: ${sum}\n` +
        `Количество: ${numbers.length}\n` +
        `Среднее: ${(sum / numbers.length).toFixed(2)}`);
}

function avgStudentsAge() {
    const avg = students.reduce((sum, s) => sum + s.age, 0) / students.length;
    displayData('Средний возраст студентов (reduce)',
        students.map(s => `${s.name} — ${s.age} лет`).join('\n') +
        `\n\nСредний возраст: ${avg.toFixed(1)} лет`);
}

function maxNumber() {
    const max = numbers.reduce((m, n) => n > m ? n : m, numbers[0]);
    const index = numbers.indexOf(max);
    displayData('Максимальное число (reduce)',
        `Массив: [${numbers.join(', ')}]\n\n` +
        `Максимум: ${max}\n` +
        `Индекс: ${index}`);
}

// =====================================================
// ЗАДАНИЕ 3: ПРОВЕРКА И СОРТИРОВКА
// =====================================================
function checkEvenExists() {
    const hasEven = numbers.some(n => n % 2 === 0);
    displayData('Проверка наличия чётных (some)',
        `Массив: [${numbers.join(', ')}]\n\n` +
        `${hasEven ? '✅ Есть' : '❌ Нет'} чётных чисел`);
}

function checkAllEven() {
    const allEven = numbers.every(n => n % 2 === 0);
    displayData('Все ли числа чётные (every)',
        `Массив: [${numbers.join(', ')}]\n\n` +
        `${allEven ? '✅ Все' : '❌ Не все'} числа чётные`);
}

function checkIncludes() {
    const input = document.getElementById('includesInput');
    const value = input.value.trim();
    if (!value) {
        displayData('Ошибка', 'Введите элемент для поиска');
        return;
    }

    const numValue = parseInt(value);
    let found = false;
    let where = '';

    if (!isNaN(numValue) && numbers.includes(numValue)) {
        found = true;
        where = `в массиве чисел (индекс ${numbers.indexOf(numValue)})`;
    }
    if (!found && fruits.includes(value)) {
        found = true;
        where = `в массиве фруктов (индекс ${fruits.indexOf(value)})`;
    }

    displayData('Проверка наличия (includes)',
        `Ищем: "${value}"\n\n` +
        `${found ? '✅ Найдено ' + where : '❌ Не найдено'}\n\n` +
        `Числа: [${numbers.join(', ')}]\n` +
        `Фрукты: [${fruits.join(', ')}]`);
}

function sortNumbersAsc() {
    const sorted = [...numbers].sort((a, b) => a - b);
    displayData('Сортировка по возрастанию',
        `Исходный: [${numbers.join(', ')}]\n` +
        `Результат: [${sorted.join(', ')}]\n` +
        `✅ Исходный массив не изменён`);
}

function sortNumbersDesc() {
    const sorted = [...numbers].sort((a, b) => b - a);
    displayData('Сортировка по убыванию',
        `Исходный: [${numbers.join(', ')}]\n` +
        `Результат: [${sorted.join(', ')}]\n` +
        `✅ Исходный массив не изменён`);
}

function sortStudentsByGrade() {
    const sorted = [...students].sort((a, b) => b.grade - a.grade);
    displayData('Сортировка студентов по оценке',
        sorted.map((s, i) => `${i + 1}. ${s.name} — ${s.grade} (гр. ${s.group})`).join('\n'));
}

function reverseArray() {
    const reversed = [...numbers].reverse();
    displayData('Разворот массива (reverse)',
        `Исходный: [${numbers.join(', ')}]\n` +
        `Развёрнутый: [${reversed.join(', ')}]\n` +
        `✅ Исходный массив не изменён`);
}

// =====================================================
// ЗАДАНИЕ 4: МАТРИЦЫ И СЛОЖНЫЕ ОПЕРАЦИИ
// =====================================================
function sumMatrix() {
    let sum = 0;
    for (let row of matrix) {
        for (let num of row) sum += num;
    }
    displayData('Сумма элементов матрицы',
        `Матрица:\n${matrix.map(row => '[' + row.join(', ') + ']').join('\n')}\n\n` +
        `Сумма: ${sum}\n` +
        `Количество: ${matrix.length * matrix[0].length}`);
}

function transposeMatrix() {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const transposed = [];
    for (let j = 0; j < cols; j++) {
        transposed[j] = [];
        for (let i = 0; i < rows; i++) {
            transposed[j][i] = matrix[i][j];
        }
    }
    displayData('Транспонирование матрицы',
        `Исходная:\n${matrix.map(r => '[' + r.join(', ') + ']').join('\n')}\n\n` +
        `Транспонированная:\n${transposed.map(r => '[' + r.join(', ') + ']').join('\n')}`);
}

function flattenMatrix() {
    const flat = matrix.flat();
    displayData('Развёртывание матрицы (flat)',
        `Матрица:\n${matrix.map(r => '[' + r.join(', ') + ']').join('\n')}\n\n` +
        `Плоский: [${flat.join(', ')}]\n` +
        `Длина: ${flat.length}`);
}

function groupStudentsByGroup() {
    const groups = students.reduce((acc, s) => {
        if (!acc[s.group]) acc[s.group] = [];
        acc[s.group].push(s.name);
        return acc;
    }, {});
    displayData('Группировка студентов по группам',
        Object.entries(groups)
            .map(([group, names]) => `${group}: ${names.join(', ')}`)
            .join('\n\n'));
}

function statsByGroup() {
    const stats = students.reduce((acc, s) => {
        if (!acc[s.group]) acc[s.group] = { count: 0, sum: 0, grades: [] };
        acc[s.group].count++;
        acc[s.group].sum += s.grade;
        acc[s.group].grades.push(s.grade);
        return acc;
    }, {});

    let result = '';
    for (let [group, data] of Object.entries(stats)) {
        const avg = (data.sum / data.count).toFixed(1);
        const min = Math.min(...data.grades);
        const max = Math.max(...data.grades);
        result += `${group}:\n`;
        result += `  Студентов: ${data.count}\n`;
        result += `  Средняя оценка: ${avg}\n`;
        result += `  Min: ${min}, Max: ${max}\n\n`;
    }
    displayData('Статистика по группам', result);
}

// =====================================================
// ЗАДАНИЕ 5: КОМБИНИРОВАННЫЕ ЗАДАЧИ
// =====================================================
function getTopStudents() {
    const top = [...students].sort((a, b) => b.grade - a.grade).slice(0, 3);
    const medals = ['🥇', '🥈', '🥉'];
    displayData('Топ-3 студента',
        top.map((s, i) => `${medals[i]} ${s.name} — ${s.grade} (гр. ${s.group})`).join('\n'));
}

function getUniqueAges() {
    const ages = [...new Set(students.map(s => s.age))].sort((a, b) => a - b);
    displayData('Уникальные возрасты',
        students.map(s => `${s.name} — ${s.age} лет`).join('\n') +
        `\n\nУникальные: ${ages.join(', ')}\n` +
        `Всего: ${ages.length}`);
}

function averageGradeByGroup() {
    const groups = students.reduce((acc, s) => {
        if (!acc[s.group]) acc[s.group] = [];
        acc[s.group].push(s.grade);
        return acc;
    }, {});
    let result = '';
    for (let [group, grades] of Object.entries(groups)) {
        const avg = grades.reduce((s, g) => s + g, 0) / grades.length;
        result += `${group}: ${avg.toFixed(1)} баллов (${grades.length} чел.)\n`;
        result += `  Оценки: ${grades.join(', ')}\n\n`;
    }
    displayData('Средняя оценка по группам', result);
}

// =====================================================
// ⭐ ЗАДАНИЯ ДЛЯ САМОСТОЯТЕЛЬНОГО ВЫПОЛНЕНИЯ
// =====================================================

// ---------- Задание 1: Работа с числами ----------
function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function getPrimes() {
    const primes = numbers.filter(isPrime);
    displayData('Простые числа (filter + isPrime)',
        `Массив: [${numbers.join(', ')}]\n\n` +
        `Простые: [${primes.join(', ')}]\n` +
        `Количество: ${primes.length}`);
}

function getSquares() {
    const squares = numbers.map(n => n * n);
    displayData('Квадраты чисел (map)',
        `Исходный: [${numbers.join(', ')}]\n` +
        `Квадраты: [${squares.join(', ')}]`);
}

function getProduct() {
    const product = numbers.reduce((acc, n) => acc * n, 1);
    displayData('Произведение всех чисел (reduce)',
        `Массив: [${numbers.join(', ')}]\n\n` +
        `Произведение: ${product}`);
}

// ---------- Задание 2: Работа со строками ----------
function getLongestWord() {
    const longest = fruits.reduce((a, b) => b.length > a.length ? b : a, '');
    displayData('Самое длинное слово',
        `Массив: [${fruits.join(', ')}]\n\n` +
        `Самое длинное: "${longest}" (${longest.length} символов)`);
}

function getShortestWord() {
    const shortest = fruits.reduce((a, b) => b.length < a.length ? b : a, fruits[0]);
    displayData('Самое короткое слово',
        `Массив: [${fruits.join(', ')}]\n\n` +
        `Самое короткое: "${shortest}" (${shortest.length} символов)`);
}

function countWordsByLength() {
    const grouped = fruits.reduce((acc, word) => {
        const len = word.length;
        if (!acc[len]) acc[len] = [];
        acc[len].push(word);
        return acc;
    }, {});
    const result = Object.entries(grouped)
        .sort((a, b) => a[0] - b[0])
        .map(([len, words]) => `${len} символов: ${words.join(', ')}`)
        .join('\n');
    displayData('Группировка слов по длине',
        `Массив: [${fruits.join(', ')}]\n\n${result}`);
}

// ---------- Задание 3: Работа с объектами ----------
function findByGroup() {
    const input = document.getElementById('groupSearchInput');
    const group = input.value.trim();
    const found = students.filter(s => s.group === group);
    if (found.length === 0) {
        displayData('Поиск по группе',
            `Группа "${group}" не найдена\n\n` +
            `Доступные: ${[...new Set(students.map(s => s.group))].join(', ')}`);
        return;
    }
    displayData(`Студенты группы ${group}`,
        `Найдено: ${found.length}\n\n` +
        found.map(s => `${s.name} — ${s.age} лет, оценка ${s.grade}`).join('\n'));
}

function updateStudent() {
    const idInput = document.getElementById('updateIdInput');
    const gradeInput = document.getElementById('updateGradeInput');
    const id = parseInt(idInput.value);
    const newGrade = parseInt(gradeInput.value);

    if (isNaN(id) || isNaN(newGrade)) {
        displayData('Ошибка', 'Введите корректные ID и оценку');
        return;
    }

    const student = students.find(s => s.id === id);
    if (!student) {
        displayData('Ошибка', `Студент с ID=${id} не найден`);
        return;
    }

    const oldGrade = student.grade;
    student.grade = newGrade;
    updateDataDisplay();
    displayData('Обновление студента',
        `Студент: ${student.name}\n` +
        `Старая оценка: ${oldGrade}\n` +
        `Новая оценка: ${newGrade}\n\n` +
        `Обновлённый объект:\n${JSON.stringify(student, null, 2)}`);
}

function deleteStudent() {
    const input = document.getElementById('deleteIdInput');
    const id = parseInt(input.value);

    if (isNaN(id)) {
        displayData('Ошибка', 'Введите корректный ID');
        return;
    }

    const student = students.find(s => s.id === id);
    if (!student) {
        displayData('Ошибка', `Студент с ID=${id} не найден`);
        return;
    }

    if (!confirm(`Удалить студента "${student.name}"?`)) return;

    students = students.filter(s => s.id !== id);
    updateDataDisplay();
    displayData('Удаление студента',
        `✅ Студент "${student.name}" удалён\n\n` +
        `Осталось студентов: ${students.length}\n` +
        `Имена: ${students.map(s => s.name).join(', ')}`);
}

// ---------- Задание 4: Комбинированные ----------
function getTopStudentInGroup() {
    const groups = students.reduce((acc, s) => {
        if (!acc[s.group] || s.grade > acc[s.group].grade) {
            acc[s.group] = s;
        }
        return acc;
    }, {});

    let result = '';
    for (let [group, s] of Object.entries(groups)) {
        result += `${group}: 🏆 ${s.name} — ${s.grade} баллов\n`;
    }
    displayData('Лучший студент в каждой группе', result);
}

function getAgeDistribution() {
    const distribution = students.reduce((acc, s) => {
        if (!acc[s.age]) acc[s.age] = [];
        acc[s.age].push(s.name);
        return acc;
    }, {});

    const result = Object.entries(distribution)
        .sort((a, b) => a[0] - b[0])
        .map(([age, names]) => `${age} лет (${names.length} чел.): ${names.join(', ')}`)
        .join('\n\n');

    displayData('Распределение студентов по возрасту', result);
}

function getPassingStudents() {
    const input = document.getElementById('thresholdInput');
    const threshold = parseInt(input.value);

    if (isNaN(threshold)) {
        displayData('Ошибка', 'Введите числовой порог');
        return;
    }

    const passing = students.filter(s => s.grade > threshold);
    if (passing.length === 0) {
        displayData('Студенты выше порога',
            `Нет студентов с оценкой > ${threshold}`);
        return;
    }
    displayData(`Студенты с оценкой > ${threshold}`,
        `Найдено: ${passing.length}\n\n` +
        passing.map(s => `${s.name} — ${s.grade} (гр. ${s.group})`).join('\n'));
}

// =====================================================
// ИНИЦИАЛИЗАЦИЯ
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    updateDataDisplay();
    console.log('✅ Лабораторная работа 2а (Массивы) загружена!');
    console.log('Доступные данные:', { numbers, fruits, students, matrix });
});