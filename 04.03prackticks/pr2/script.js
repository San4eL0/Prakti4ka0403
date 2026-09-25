// ==========================================================
// ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ДЛЯ ВЫВОДА
// ==========================================================
function print(title, content) {
    const output = document.getElementById('output');
    output.textContent = `${title}\n\n${content}`;
    console.log(`===== ${title} =====`);
    console.log(content);
}

// ==========================================================
// ЗАДАНИЕ 1: КАЛЬКУЛЯТОР
// ==========================================================
// Функции калькулятора
function add(a, b)      { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b)   {
    if (b === 0) return '❌ На ноль делить нельзя!';
    return a / b;
}

function taskCalc(operation) {
    const a = parseFloat(document.getElementById('calcA').value);
    const b = parseFloat(document.getElementById('calcB').value);

    if (isNaN(a) || isNaN(b)) {
        print('❌ Ошибка', 'Введите два числа');
        return;
    }

    let result, symbol, funcName;
    switch (operation) {
        case 'add':      result = add(a, b);      symbol = '+'; funcName = 'add';      break;
        case 'subtract': result = subtract(a, b); symbol = '−'; funcName = 'subtract'; break;
        case 'multiply': result = multiply(a, b); symbol = '×'; funcName = 'multiply'; break;
        case 'divide':   result = divide(a, b);   symbol = '÷'; funcName = 'divide';   break;
    }

    print(`🧮 ${funcName}(${a}, ${b})`,
        `Операция: ${a} ${symbol} ${b}

Результат: ${result}

📝 Функция ${funcName}() принимает два параметра и возвращает результат.`);
}

function taskCalcAll() {
    const a = parseFloat(document.getElementById('calcA').value);
    const b = parseFloat(document.getElementById('calcB').value);

    if (isNaN(a) || isNaN(b)) {
        print('❌ Ошибка', 'Введите два числа');
        return;
    }

    print('🧮 Все операции калькулятора',
        `Числа: a = ${a}, b = ${b}

Сложение:  add(${a}, ${b})      = ${add(a, b)}
Вычитание: subtract(${a}, ${b}) = ${subtract(a, b)}
Умножение: multiply(${a}, ${b}) = ${multiply(a, b)}
Деление:   divide(${a}, ${b})   = ${typeof divide(a, b) === 'number' ? divide(a, b).toFixed(2) : divide(a, b)}

📝 Все 4 функции — стрелочные или обычные, принимают два числа.`);
}

// ==========================================================
// ЗАДАНИЕ 2: СРЕДНЕЕ АРИФМЕТИЧЕСКОЕ
// ==========================================================
function getAverage(arr) {
    if (arr.length === 0) return 0;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}

function taskAverage() {
    const input = document.getElementById('avgArray').value;
    const arr = input.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));

    if (arr.length === 0) {
        print('❌ Ошибка', 'Введите хотя бы одно число через запятую');
        return;
    }

    const sum = arr.reduce((acc, n) => acc + n, 0);
    const avg = getAverage(arr);

    print('📊 Среднее арифметическое',
        `Массив: [${arr.join(', ')}]

Сумма:   ${sum}
Элементов: ${arr.length}
Среднее: ${avg.toFixed(2)}

📝 Формула: среднее = сумма всех элементов / количество элементов`);
}

// ==========================================================
// ЗАДАНИЕ 3: ОБРАТНЫЙ ПОРЯДОК (без reverse)
// ==========================================================
function reverseArray(arr) {
    const result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    return result;
}

function taskReverse() {
    const input = document.getElementById('reverseArray').value;
    const arr = input.split(',').map(s => s.trim()).filter(s => s !== '');

    if (arr.length === 0) {
        print('❌ Ошибка', 'Введите значения через запятую');
        return;
    }

    const reversed = reverseArray(arr);

    print('🔄 Обратный порядок (без .reverse())',
        `Исходный:   [${arr.join(', ')}]
Развёрнутый: [${reversed.join(', ')}]

📝 Алгоритм:
  1. Создаём пустой массив result
  2. Идём по исходному массиву с конца (i = length - 1) до 0
  3. Добавляем каждый элемент в result
  4. Возвращаем result

⚠️ Исходный массив не изменён!`);
}

// ==========================================================
// ЗАДАНИЕ 4: УНИКАЛЬНЫЕ ЭЛЕМЕНТЫ
// ==========================================================
function getUnique(arr) {
    const result = [];
    for (let item of arr) {
        if (!result.includes(item)) {
            result.push(item);
        }
    }
    return result;
}

// Альтернативная реализация через объект (без includes)
function getUniqueFast(arr) {
    const seen = {};
    const result = [];
    for (let item of arr) {
        if (!seen[item]) {
            seen[item] = true;
            result.push(item);
        }
    }
    return result;
}

function taskUnique() {
    const input = document.getElementById('uniqueArray').value;
    const arr = input.split(',').map(s => s.trim()).filter(s => s !== '');

    if (arr.length === 0) {
        print('❌ Ошибка', 'Введите значения через запятую');
        return;
    }

    const unique = getUnique(arr);
    const uniqueFast = getUniqueFast(arr);
    const duplicates = arr.length - unique.length;

    print('✨ Уникальные элементы',
        `Исходный массив:  [${arr.join(', ')}]
Всего элементов:  ${arr.length}

Уникальные:       [${unique.join(', ')}]
Только уникальных: ${unique.length}
Удалено дубликатов: ${duplicates}

📝 Способы решения:
  1. Через includes()  → [${unique.join(', ')}]
  2. Через объект-сет  → [${uniqueFast.join(', ')}]
  3. Через new Set()   → [${[...new Set(arr)].join(', ')}]

✅ Все три способа дают одинаковый результат!`);
}

// ==========================================================
// ДЕМОНСТРАЦИЯ ТЕОРИИ: ФУНКЦИИ
// ==========================================================
function demoFunctions() {
    // Обычная функция
    function greet(name) {
        return "Привет, " + name + "!";
    }

    // Функция без параметров
    function showDate() {
        return new Date().toLocaleString('ru-RU');
    }

    // Функция с несколькими параметрами
    function calculateRectangleArea(width, height) {
        return width * height;
    }

    // Стрелочная функция
    const multiplyArrow = (a, b) => a * b;

    // Стрелочная функция с телом
    const power = (base, exp) => {
        let result = 1;
        for (let i = 0; i < exp; i++) result *= base;
        return result;
    };

    print('🔬 Функции в JavaScript',
        `1️⃣ Обычная функция:
   function greet(name) { return "Привет, " + name; }
   greet("Анна") → "${greet("Анна")}"

2️⃣ Без параметров:
   showDate() → "${showDate()}"

3️⃣ С несколькими параметрами:
   calculateRectangleArea(5, 8) → ${calculateRectangleArea(5, 8)} кв.ед.

4️⃣ Стрелочная функция (короткая):
   const multiply = (a, b) => a * b;
   multiply(5, 3) → ${multiplyArrow(5, 3)}

5️⃣ Стрелочная с телом:
   power(2, 10) → ${power(2, 10)}

📝 Виды функций:
   • Function Declaration:   function name() {}
   • Function Expression:    const name = function() {}
   • Arrow Function:         const name = () => {}`);
}

// ==========================================================
// ДЕМОНСТРАЦИЯ ТЕОРИИ: МЕТОДЫ МАССИВОВ
// ==========================================================
function demoArrayMethods() {
    let numbers = [1, 2, 3];

    print('🔬 Методы массивов',
        `Исходный массив: [${numbers.join(', ')}]

1️⃣ push(4) — добавить в конец:
   let arr = [${numbers.join(', ')}];
   arr.push(4);  → [${[...numbers, 4].join(', ')}]

2️⃣ pop() — удалить с конца:
   arr.pop();    → возвращает 4, arr = [${numbers.join(', ')}]

3️⃣ unshift(0) — добавить в начало:
   arr.unshift(0); → [${[0, ...numbers].join(', ')}]

4️⃣ shift() — удалить с начала:
   arr.shift();  → возвращает 0, arr = [${numbers.join(', ')}]

5️⃣ slice(1, 3) — копия части:
   [${numbers.join(', ')}].slice(1, 3) → [${numbers.slice(1, 3).join(', ')}]

6️⃣ indexOf(2) — поиск индекса:
   [${numbers.join(', ')}].indexOf(2) → ${numbers.indexOf(2)}

7️⃣ includes(2) — проверка наличия:
   [${numbers.join(', ')}].includes(2) → ${numbers.includes(2)}

8️⃣ concat() — объединение:
   [1, 2].concat([3, 4]) → [${[1, 2].concat([3, 4]).join(', ')}]

9️⃣ join(" - ") — в строку:
   [${numbers.join(', ')}].join(" - ") → "${numbers.join(' - ')}"

📝 Все методы, которые МЕНЯЮТ массив: push, pop, shift, unshift, splice, sort, reverse
   Все методы, которые НЕ МЕНЯЮТ: slice, concat, map, filter, reduce, indexOf, includes, join`);
}

// ==========================================================
// ДЕМОНСТРАЦИЯ ТЕОРИИ: ПЕРЕБОР МАССИВОВ
// ==========================================================
function demoIteration() {
    const fruits = ["Яблоко", "Банан", "Апельсин"];

    let result = `🔬 Способы перебора массива
Массив: [${fruits.join(', ')}]

1️⃣ Цикл for (классический):
   for (let i = 0; i < fruits.length; i++) { ... }
   → `;
    for (let i = 0; i < fruits.length; i++) result += `${i}:${fruits[i]} `;

    result += `\n\n2️⃣ for...of (современный):
   for (let fruit of fruits) { ... }
   → `;
    for (const fruit of fruits) result += `${fruit} `;

    result += `\n\n3️⃣ forEach (метод массива):
   fruits.forEach((fruit, i) => ...)
   → `;
    fruits.forEach((fruit, i) => { result += `[${i}]${fruit} `; });

    result += `\n\n4️⃣ forEach со стрелочной функцией:
   fruits.forEach(fruit => console.log(fruit))
   → `;
    fruits.forEach(fruit => { result += `${fruit} `; });

    result += `\n\n5️⃣ Цикл с индексом через forEach:
   fruits.forEach((fruit, index) => ...)
   → `;
    fruits.forEach((fruit, index) => { result += `${index + 1}. ${fruit}; `; });

    result += `\n\n📝 Какой выбрать?
   • for         — нужен индекс или break/continue
   • for...of    — простой перебор значений
   • forEach     — функциональный стиль, без break
   • map/filter  — когда нужно преобразовать/отфильтровать`;

    print('🔬 Перебор массивов', result);
}

// ==========================================================
// ДЕМОНСТРАЦИЯ ПРИ ЗАГРУЗКЕ
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('===================== ЗАГРУЗКА =====================');

    // Задание №2.1 из практической части
    const sum = (a, b) => a + b;
    console.log('Сумма 5 и 3 =', sum(5, 3));

    // Задание №2.2 из практической части
    const students = ["Мария", "Иван", "Петр", "Анна", "Елена"];
    console.log('Список студентов:');
    students.forEach(s => console.log('  -', s));

    // Задание №2.3 из практической части
    function findLongestName(names) {
        if (names.length === 0) return null;
        let longest = names[0];
        for (const name of names) {
            if (name.length > longest.length) longest = name;
        }
        return longest;
    }

    const names = ["Александр", "Оля", "Екатерина", "Петр"];
    console.log('Самое длинное имя:', findLongestName(names));

    console.log('====================================================');
    console.log('✅ Откройте консоль, чтобы увидеть все результаты!');
});