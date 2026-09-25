// =============================================
// ДАННЫЕ ДЛЯ РАБОТЫ
// =============================================
const DATA = {
    numbers: [12, 7, 23, 45, 18, 31, 6, 42, 19, 8],
    fruits: ["яблоко", "банан", "апельсин", "груша", "киви", "манго", "ананас"],
    users: [
        { name: "Анна",  age: 25, city: "Москва" },
        { name: "Иван",  age: 30, city: "СПб"    },
        { name: "Мария", age: 22, city: "Москва" },
        { name: "Петр",  age: 35, city: "Казань" },
        { name: "Елена", age: 28, city: "Москва" }
    ]
};

// ==============================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ==============================================
function displayOutput(title, content) {
    const output = document.getElementById('output');
    output.textContent = `📌 ${title}\n\n${content}`;
}

function formatArray(arr) {
    return '[' + arr.join(', ') + ']';
}

// ==============================================
// ЗАДАНИЕ 1: ЗНАКОМСТВО С ФУНКЦИЯМИ
// ==============================================
function demoSimpleFunction() {
    function sayHello() {
        return "Привет, мир! Это моя первая функция! 🎉";
    }

    displayOutput('Простейшая функция',
        `function sayHello() {
    return "Привет, мир! Это моя первая функция! 🎉";
}

Результат: ${sayHello()}

📝 Объяснение:
• function — ключевое слово
• sayHello — имя функции
• () — параметры (тут нет)
• {} — тело функции
• return — возвращает результат`);
}

function demoGreeting() {
    function greet(name) {
        return "Привет, " + name + "! Добро пожаловать! 😊";
    }

    const names = ["Анна", "Иван", "Мария", "Петр"];
    const results = names.map(name => `  ${greet(name)}`);

    displayOutput('Приветствие с параметром',
        `function greet(name) {
    return "Привет, " + name + "! Добро пожаловать! 😊";
}

Вызовы:
${results.join('\n')}

📝 Объяснение:
• name — параметр (переменная)
• При вызове подставляется конкретное значение
• Одна функция — много результатов`);
}

function demoCalculator() {
    const add      = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const multiply = (a, b) => a * b;
    const divide   = (a, b) => b === 0 ? "❌ На ноль делить нельзя!" : a / b;

    const a = 10, b = 5;

    displayOutput('Калькулятор',
        `Числа: ${a} и ${b}

Сложение:  ${a} + ${b} = ${add(a, b)}
Вычитание: ${a} − ${b} = ${subtract(a, b)}
Умножение: ${a} × ${b} = ${multiply(a, b)}
Деление:   ${a} ÷ ${b} = ${divide(a, b)}

📝 Объяснение:
• Функции принимают два параметра
• Каждая выполняет свою операцию
• Возвращают результат`);
}

function demoReturn() {
    function withoutReturn() {
        let x = 10 + 5;
    }
    function withReturn() {
        let x = 10 + 5;
        return x;
    }

    displayOutput('Демонстрация return',
        `Функция БЕЗ return:
  function withoutReturn() { let x = 10 + 5; }
  Результат: ${withoutReturn()} (undefined)

Функция С return:
  function withReturn() { let x = 10 + 5; return x; }
  Результат: ${withReturn()}

📝 Вывод:
• return возвращает значение и завершает функцию
• Без return функция возвращает undefined`);
}

// ==============================================
// ЗАДАНИЕ 2: ВИДЫ ФУНКЦИЙ
// ==============================================
function demoNoParams() {
    function getCurrentTime() {
        return new Date().toLocaleTimeString('ru-RU');
    }
    function getRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    displayOutput('Функции без параметров',
        `Текущее время: ${getCurrentTime()}
Случайное число (1-100): ${getRandomNumber()}

📝 Объяснение:
• Функции не требуют входных данных
• Используют внутреннюю логику
• Каждый вызов может давать разный результат`);
}

function demoDefaultParams() {
    function greet(name = "Гость", age = 18) {
        return `Привет, ${name}! Тебе ${age} лет.`;
    }

    displayOutput('Параметры по умолчанию',
        `function greet(name = "Гость", age = 18) { ... }

Без параметров:       ${greet()}
Только имя:           ${greet("Анна")}
Имя и возраст:        ${greet("Иван", 25)}
Только возраст:       ${greet(undefined, 30)}

📝 Объяснение:
• Если параметр не передан — используется значение по умолчанию
• Это делает функции гибкими`);
}

// ==============================================
// ЗАДАНИЕ 3: ПРОСТЫЕ ЗАДАЧИ
// ==============================================
function taskCheckAge() {
    const input = document.getElementById('ageInput');
    const age = parseInt(input.value);

    if (isNaN(age) || age < 0) {
        displayOutput('Ошибка', 'Пожалуйста, введите корректный возраст');
        return;
    }

    function checkAge(age) {
        if (age < 18) return "Тебе меньше 18 лет. Голосовать пока нельзя.";
        if (age < 65) return "Тебе от 18 до 65 лет. Можешь голосовать!";
        return "Тебе больше 65 лет. Удачи и здоровья!";
    }

    displayOutput('Проверка возраста',
        `Возраст: ${age} лет
Результат: ${checkAge(age)}`);
}

function taskConvertTemp() {
    const input = document.getElementById('tempInput');
    const celsius = parseFloat(input.value);

    if (isNaN(celsius)) {
        displayOutput('Ошибка', 'Пожалуйста, введите температуру');
        return;
    }

    const celsiusToFahrenheit = c => (c * 9 / 5) + 32;

    displayOutput('Перевод температуры',
        `${celsius}°C = ${celsiusToFahrenheit(celsius).toFixed(1)}°F

Формула: °F = (°C × 9/5) + 32

Справка:
  0°C   = 32°F   (замерзание)
  20°C  = 68°F   (комнатная)
  100°C = 212°F  (кипение)`);
}

function taskMaxNumber() {
    const num1 = parseInt(document.getElementById('num1Input').value);
    const num2 = parseInt(document.getElementById('num2Input').value);

    if (isNaN(num1) || isNaN(num2)) {
        displayOutput('Ошибка', 'Пожалуйста, введите числа');
        return;
    }

    const max = (a, b) => a > b ? a : b;
    const min = (a, b) => a < b ? a : b;

    displayOutput('Максимум из двух чисел',
        `Числа: ${num1} и ${num2}

Максимум: ${max(num1, num2)}
Минимум:  ${min(num1, num2)}`);
}

// ==============================================
// ЗАДАНИЕ 4: РАБОТА С МАССИВАМИ
// ==============================================
function taskSumArray() {
    const numbers = DATA.numbers;

    function sumArray(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) sum += arr[i];
        return sum;
    }

    const sum = sumArray(numbers);
    displayOutput('Сумма элементов массива',
        `Массив: ${formatArray(numbers)}

Сумма: ${sum}
Среднее: ${(sum / numbers.length).toFixed(2)}`);
}

function taskMaxInArray() {
    const numbers = DATA.numbers;

    function findMax(arr) {
        if (arr.length === 0) return null;
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
        }
        return max;
    }

    displayOutput('Максимальное число в массиве',
        `Массив: ${formatArray(numbers)}
Максимум: ${findMax(numbers)}`);
}

function taskFilterArray() {
    const input = document.getElementById('filterInput');
    const threshold = parseInt(input.value);

    if (isNaN(threshold)) {
        displayOutput('Ошибка', 'Введите число');
        return;
    }

    const numbers = DATA.numbers;

    function filterGreater(arr, minValue) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > minValue) result.push(arr[i]);
        }
        return result;
    }

    const filtered = filterGreater(numbers, threshold);
    displayOutput('Фильтрация чисел',
        `Массив: ${formatArray(numbers)}
Порог: ${threshold}

Числа > ${threshold}: ${formatArray(filtered)}
Количество: ${filtered.length}`);
}

// ==============================================
// ЗАДАНИЕ 5: РАБОТА С ОБЪЕКТАМИ
// ==============================================
function taskUserInfo() {
    const users = DATA.users;
    const list = users.map((u, i) =>
        `${i + 1}. ${u.name} — ${u.age} лет, г. ${u.city}`
    ).join('\n');

    displayOutput('Пользователи',
        `Всего: ${users.length}

${list}`);
}

function taskFindUser() {
    const input = document.getElementById('searchNameInput');
    const searchName = input.value.trim();
    const users = DATA.users;

    function findUserByName(arr, name) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name.toLowerCase() === name.toLowerCase()) return arr[i];
        }
        return null;
    }

    const user = findUserByName(users, searchName);

    if (user) {
        displayOutput('Поиск пользователя',
            `✅ Пользователь найден:

Имя:    ${user.name}
Возраст: ${user.age} лет
Город:  ${user.city}`);
    } else {
        displayOutput('Поиск пользователя',
            `❌ Пользователь "${searchName}" не найден

Доступные: ${users.map(u => u.name).join(', ')}`);
    }
}

function taskAverageAge() {
    const users = DATA.users;

    function calculateAverageAge(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) sum += arr[i].age;
        return sum / arr.length;
    }

    const avg = calculateAverageAge(users);
    const ages = users.map(u => `${u.name} — ${u.age} лет`).join('\n');

    displayOutput('Средний возраст',
        `Возрасты:\n${ages}

Средний возраст: ${avg.toFixed(1)} лет
Всего: ${users.length} пользователей`);
}

// ==============================================
// ЗАДАНИЕ 6: КОМБИНИРОВАННЫЕ
// ==============================================
function taskUserStats() {
    const users = DATA.users;

    function getStats(arr) {
        let total = arr.length;
        let sumAge = 0;
        let maxAge = arr[0].age;
        let minAge = arr[0].age;

        for (let user of arr) {
            sumAge += user.age;
            if (user.age > maxAge) maxAge = user.age;
            if (user.age < minAge) minAge = user.age;
        }

        return {
            total: total,
            averageAge: sumAge / total,
            maxAge: maxAge,
            minAge: minAge,
            cities: [...new Set(arr.map(u => u.city))]
        };
    }

    const stats = getStats(users);

    displayOutput('Статистика пользователей',
        `Всего пользователей: ${stats.total}

Возраст:
  Средний:      ${stats.averageAge.toFixed(1)} лет
  Максимальный: ${stats.maxAge} лет
  Минимальный:  ${stats.minAge} лет

Города: ${stats.cities.join(', ')}`);
}

function taskGroupByCity() {
    const users = DATA.users;

    function groupByCity(arr) {
        let groups = {};
        for (let user of arr) {
            let city = user.city;
            if (!groups[city]) groups[city] = [];
            groups[city].push(user.name);
        }
        return groups;
    }

    const groups = groupByCity(users);
    let result = '';
    for (let city in groups) {
        const names = groups[city];
        result += `${city} (${names.length} чел.)\n  ${names.join(', ')}\n\n`;
    }

    displayOutput('Группировка по городам', result);
}

// ==============================================
// ⭐ САМОСТОЯТЕЛЬНАЯ РАБОТА
// ==============================================

// ----- Задание 1 -----
function taskMultiply() {
    const a = parseFloat(document.getElementById('mult1').value);
    const b = parseFloat(document.getElementById('mult2').value);

    // ЗАДАНИЕ: multiply(a, b)
    function multiply(a, b) {
        return a * b;
    }

    if (isNaN(a) || isNaN(b)) {
        displayOutput('Ошибка', 'Введите числа');
        return;
    }

    displayOutput('multiply(a, b)',
        `multiply(${a}, ${b}) = ${multiply(a, b)}`);
}

function taskIsEven() {
    const n = parseInt(document.getElementById('evenInput').value);

    // ЗАДАНИЕ: isEven(n)
    function isEven(n) {
        return n % 2 === 0;
    }

    if (isNaN(n)) {
        displayOutput('Ошибка', 'Введите число');
        return;
    }

    displayOutput('isEven(n)',
        `isEven(${n}) = ${isEven(n)}

${isEven(n) ? '✅ Число чётное' : '❌ Число нечётное'}`);
}

function taskGetFullName() {
    const first = document.getElementById('firstNameInput').value.trim();
    const last = document.getElementById('lastNameInput').value.trim();

    // ЗАДАНИЕ: getFullName(firstName, lastName)
    function getFullName(firstName, lastName) {
        return firstName + " " + lastName;
    }

    if (!first || !last) {
        displayOutput('Ошибка', 'Введите имя и фамилию');
        return;
    }

    displayOutput('getFullName()',
        `getFullName("${first}", "${last}") = "${getFullName(first, last)}"`);
}

// ----- Задание 2 -----
function taskGetEvenNumbers() {
    const arr = DATA.numbers;

    // ЗАДАНИЕ: getEvenNumbers(arr)
    function getEvenNumbers(arr) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] % 2 === 0) result.push(arr[i]);
        }
        return result;
    }

    displayOutput('getEvenNumbers(arr)',
        `Массив: ${formatArray(arr)}
Чётные: ${formatArray(getEvenNumbers(arr))}`);
}

function taskGetAverage() {
    const arr = DATA.numbers;

    // ЗАДАНИЕ: getAverage(arr)
    function getAverage(arr) {
        if (arr.length === 0) return 0;
        let sum = 0;
        for (let i = 0; i < arr.length; i++) sum += arr[i];
        return sum / arr.length;
    }

    displayOutput('getAverage(arr)',
        `Массив: ${formatArray(arr)}
Среднее: ${getAverage(arr).toFixed(2)}`);
}

function taskReverseArray() {
    const arr = DATA.numbers;

    // ЗАДАНИЕ: reverseArray(arr)
    function reverseArray(arr) {
        let result = [];
        for (let i = arr.length - 1; i >= 0; i--) {
            result.push(arr[i]);
        }
        return result;
    }

    displayOutput('reverseArray(arr)',
        `Исходный:   ${formatArray(arr)}
Развёрнутый: ${formatArray(reverseArray(arr))}`);
}

// ----- Задание 3 -----
function taskGetUserNames() {
    const users = DATA.users;

    // ЗАДАНИЕ: getUserNames(arr)
    function getUserNames(arr) {
        let names = [];
        for (let i = 0; i < arr.length; i++) {
            names.push(arr[i].name);
        }
        return names;
    }

    displayOutput('getUserNames(arr)',
        `Все пользователи: ${users.length}

Имена: ${formatArray(getUserNames(users))}`);
}

function taskGetUsersByCity() {
    const users = DATA.users;
    const city = document.getElementById('cityInput').value.trim();

    // ЗАДАНИЕ: getUsersByCity(arr, city)
    function getUsersByCity(arr, city) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].city.toLowerCase() === city.toLowerCase()) {
                result.push(arr[i]);
            }
        }
        return result;
    }

    const found = getUsersByCity(users, city);

    if (found.length === 0) {
        displayOutput('getUsersByCity()',
            `Пользователей из города "${city}" нет.
Доступные города: ${[...new Set(users.map(u => u.city))].join(', ')}`);
        return;
    }

    displayOutput('getUsersByCity(arr, city)',
        `Город: ${city}
Найдено: ${found.length}

${found.map(u => `${u.name} — ${u.age} лет`).join('\n')}`);
}

function taskGetOldestUser() {
    const users = DATA.users;

    // ЗАДАНИЕ: getOldestUser(arr)
    function getOldestUser(arr) {
        if (arr.length === 0) return null;
        let oldest = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].age > oldest.age) oldest = arr[i];
        }
        return oldest;
    }

    const oldest = getOldestUser(users);

    displayOutput('getOldestUser(arr)',
        `Самый старший пользователь:

Имя:    ${oldest.name}
Возраст: ${oldest.age} лет
Город:  ${oldest.city}`);
}

// ----- Задание 4 -----
function taskCalculateDiscount() {
    const price = parseFloat(document.getElementById('priceInput').value);
    const discountPercent = parseFloat(document.getElementById('discountInput').value);

    // ЗАДАНИЕ: calculateDiscount(price, discountPercent)
    function calculateDiscount(price, discountPercent) {
        let discount = price * discountPercent / 100;
        return price - discount;
    }

    if (isNaN(price) || isNaN(discountPercent)) {
        displayOutput('Ошибка', 'Введите корректные значения');
        return;
    }

    const finalPrice = calculateDiscount(price, discountPercent);
    displayOutput('calculateDiscount(price, discountPercent)',
        `Цена:            ${price} ₽
Скидка:          ${discountPercent}%
Размер скидки:   ${(price - finalPrice).toFixed(2)} ₽
Итоговая цена:   ${finalPrice.toFixed(2)} ₽`);
}

function taskIsPasswordValid() {
    const password = document.getElementById('passwordInput').value;

    // ЗАДАНИЕ: isPasswordValid(password) — минимум 6 символов
    function isPasswordValid(password) {
        return password.length >= 6;
    }

    const valid = isPasswordValid(password);
    displayOutput('isPasswordValid(password)',
        `Пароль: "${password}"
Длина: ${password.length}

${valid ? '✅ Пароль валиден (≥ 6 символов)' : '❌ Пароль слишком короткий (< 6 символов)'}`);
}

function taskGetWeatherDescription() {
    const temp = parseFloat(document.getElementById('weatherInput').value);

    // ЗАДАНИЕ: getWeatherDescription(temp)
    function getWeatherDescription(temp) {
        if (temp < 0)  return "Холодно ❄️";
        if (temp < 20) return "Прохладно 🌥";
        if (temp < 30) return "Тепло ☀️";
        return "Жарко 🔥";
    }

    if (isNaN(temp)) {
        displayOutput('Ошибка', 'Введите температуру');
        return;
    }

    displayOutput('getWeatherDescription(temp)',
        `Температура: ${temp}°C
Описание: ${getWeatherDescription(temp)}`);
}

// =============================================
// ИНИЦИАЛИЗАЦИЯ
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Лабораторная работа 2б (Функции) загружена!');
    console.log('Данные:', DATA);
});