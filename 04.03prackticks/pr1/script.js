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
// ЗАДАНИЕ 1: КАЛЬКУЛЯТОР ВОЗРАСТА
// ==========================================================
function taskAgeCalculator() {
    const yearInput = document.getElementById('birthYear');
    const birthYear = parseInt(yearInput.value);

    // Проверка ввода
    if (isNaN(birthYear) || birthYear < 1900 || birthYear > 2100) {
        print('❌ Ошибка', 'Введите корректный год рождения (1900–2100)');
        return;
    }

    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    let status;
    if (age < 0) {
        status = 'Ты ещё не родился! 👶';
    } else if (age < 18) {
        status = 'Несовершеннолетний 🧒';
    } else if (age < 65) {
        status = 'Совершеннолетний 🧑';
    } else {
        status = 'Пенсионный возраст 👴';
    }

    print('🎂 Калькулятор возраста',
        `Год рождения: ${birthYear}
Текущий год:  ${currentYear}

Возраст: ${age} лет
Статус:  ${status}`);
}

// ==========================================================
// ЗАДАНИЕ 2: ТАБЛИЦА УМНОЖЕНИЯ
// ==========================================================
function taskMultiplicationTable() {
    const input = document.getElementById('multTableNumber');
    const n = parseInt(input.value);

    if (isNaN(n)) {
        print('❌ Ошибка', 'Введите число');
        return;
    }

    let result = `📊 Таблица умножения на ${n}:\n\n`;

    // Цикл for от 1 до 10
    for (let i = 1; i <= 10; i++) {
        const product = n * i;
        result += `${n} × ${i} = ${product}\n`;
    }

    print(`📊 Таблица умножения на ${n}`, result);
}

// ==========================================================
// ЗАДАНИЕ 3: ПОИСК МАКСИМУМА ИЗ ТРЁХ ЧИСЕЛ
// ==========================================================
function taskFindMax() {
    const a = parseFloat(document.getElementById('num1').value);
    const b = parseFloat(document.getElementById('num2').value);
    const c = parseFloat(document.getElementById('num3').value);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        print('❌ Ошибка', 'Введите три числа');
        return;
    }

    // Способ 1: через вложенные условия (классический)
    let max1;
    if (a >= b && a >= c) {
        max1 = a;
    } else if (b >= a && b >= c) {
        max1 = b;
    } else {
        max1 = c;
    }

    // Способ 2: через Math.max (для проверки)
    const max2 = Math.max(a, b, c);

    // Дополнительно: найти минимум
    const min = Math.min(a, b, c);

    // Проверка: все ли числа равны?
    let comment = '';
    if (a === b && b === c) {
        comment = '⚠️ Все три числа равны!';
    } else if (a === max1 || b === max1 || c === max1) {
        const count = [a, b, c].filter(x => x === max1).length;
        if (count > 1) comment = `⚠️ Максимум встречается ${count} раза`;
    }

    print('🔝 Поиск максимума из трёх чисел',
        `Числа: ${a}, ${b}, ${c}

Максимум (через if):     ${max1}
Максимум (через Math):   ${max2}
Минимум:                 ${min}

${comment}`);
}

// ==========================================================
// ЗАДАНИЕ 4: ФАКТОРИАЛ ЧИСЛА N
// ==========================================================
function taskFactorial() {
    const input = document.getElementById('factorialN');
    const n = parseInt(input.value);

    if (isNaN(n) || n < 0) {
        print('❌ Ошибка', 'Введите неотрицательное целое число');
        return;
    }

    if (n > 20) {
        print('❌ Ошибка',
            'N не должно превышать 20 — иначе результат слишком велик для точного отображения!');
        return;
    }

    // Способ 1: цикл for
    let factorialFor = 1;
    for (let i = 2; i <= n; i++) {
        factorialFor *= i;
    }

    // Способ 2: цикл while (для демонстрации)
    let factorialWhile = 1;
    let j = 2;
    while (j <= n) {
        factorialWhile *= j;
        j++;
    }

    // Показываем процесс вычисления
    let process = '';
    if (n === 0 || n === 1) {
        process = `${n}! = 1 (по определению)`;
    } else {
        process = `${n}! = ` + Array.from({ length: n }, (_, i) => i + 1).join(' × ');
        process += ` = ${factorialFor}`;
    }

    print(`🧮 Факториал числа ${n}`,
        `${process}

Через for:   ${factorialFor}
Через while: ${factorialWhile}

Проверка: ${factorialFor === factorialWhile ? '✅ Оба способа дали одинаковый результат' : '❌ Расхождение!'}`);
}

// ==========================================================
// ДЕМОНСТРАЦИЯ ТЕОРИИ: ТИПЫ ДАННЫХ
// ==========================================================
function demoTypes() {
    // Разные типы данных
    let numberVar = 42;
    let stringVar = "Привет, мир!";
    let boolVar = true;
    let nullVar = null;
    let undefinedVar;
    let arrayVar = [1, 2, 3];
    let objectVar = { name: "Анна", age: 25 };
    let functionVar = function() { return "Я функция"; };

    print('🔬 Типы данных в JavaScript',
        `Число:      ${numberVar}          → typeof: ${typeof numberVar}
Строка:     "${stringVar}"  → typeof: ${typeof stringVar}
Булево:     ${boolVar}            → typeof: ${typeof boolVar}
null:       ${nullVar}             → typeof: ${typeof nullVar}  ← историческая особенность!
undefined:  ${undefinedVar}  → typeof: ${typeof undefinedVar}
Массив:     [${arrayVar}]         → typeof: ${typeof arrayVar}  ← тоже object!
Объект:     {name: "Анна", age: 25}
Функция:    function(){}         → typeof: ${typeof functionVar}

⚠️ Интересные факты:
• typeof null === "object" (баг, но так задумано)
• typeof [] === "object" (массив — частный случай объекта)
• Array.isArray([]) === ${Array.isArray([])} (правильная проверка)`);
}

// ==========================================================
// ДЕМОНСТРАЦИЯ ТЕОРИИ: ОПЕРАТОРЫ
// ==========================================================
function demoOperators() {
    const a = 10, b = 3;

    print('🔬 Операторы JavaScript',
        `Арифметические (a = ${a}, b = ${b}):
  ${a} + ${b}  = ${a + b}     (сложение)
  ${a} - ${b}  = ${a - b}      (вычитание)
  ${a} * ${b}  = ${a * b}     (умножение)
  ${a} / ${b}  = ${(a / b).toFixed(2)}  (деление)
  ${a} % ${b}  = ${a % b}      (остаток)
  ${a} ** ${b} = ${a ** b}  (степень)

Сравнение:
  5 == "5"   → ${5 == "5"}    (нестрогое: приводит типы)
  5 === "5"  → ${5 === "5"}   (строгое: типы важны!)
  5 != "5"   → ${5 != "5"}
  5 !== "5"  → ${5 !== "5"}

Логические:
  true && false → ${true && false}    (И)
  true || false → ${true || false}    (ИЛИ)
  !true         → ${!true}       (НЕ)

📝 Правило: всегда используйте === вместо ==`);
}

// ==========================================================
// ДЕМОНСТРАЦИЯ ТЕОРИИ: УСЛОВИЯ
// ==========================================================
function demoConditions() {
    const scores = [95, 85, 75, 65, 55];
    let result = '🔬 Условные операторы\n\n';

    // if / else if / else
    result += 'Пример с if / else if / else:\n';
    scores.forEach(score => {
        let grade;
        if (score >= 90) grade = 'Отлично! 🏆';
        else if (score >= 70) grade = 'Хорошо! 👍';
        else if (score >= 60) grade = 'Удовлетворительно';
        else grade = 'Нужно подтянуть знания 📚';
        result += `  ${score} баллов → ${grade}\n`;
    });

    // Тернарный оператор
    result += '\nТернарный оператор (краткая запись):\n';
    scores.forEach(score => {
        const passed = score >= 60 ? 'Сдал ✅' : 'Не сдал ❌';
        result += `  ${score} → ${passed}\n`;
    });

    print('🔬 Условия в JavaScript', result);
}

// ==========================================================
// ДЕМОНСТРАЦИЯ ТЕОРИИ: ЦИКЛЫ
// ==========================================================
function demoLoops() {
    let result = '🔬 Циклы в JavaScript\n\n';

    // 1. Цикл for
    result += '1️⃣ Цикл for (числа от 1 до 5):\n  ';
    for (let i = 1; i <= 5; i++) {
        result += i + ' ';
    }

    // 2. Цикл while
    result += '\n\n2️⃣ Цикл while (обратный отсчёт от 5):\n  ';
    let counter = 5;
    while (counter > 0) {
        result += counter + ' ';
        counter--;
    }

    // 3. Цикл do...while (выполнится хотя бы раз)
    result += '\n\n3️⃣ Цикл do...while (выполнится хотя бы 1 раз):\n  ';
    let x = 10;
    do {
        result += x + ' (выполнилось один раз, потом условие x<5 ложно) ';
        x++;
    } while (x < 5);

    // 4. Перебор массива через for...of
    const fruits = ["Яблоко", "Банан", "Апельсин"];
    result += '\n\n4️⃣ Перебор массива (for...of):\n';
    for (const fruit of fruits) {
        result += `  • ${fruit}\n`;
    }

    // 5. Прерывание цикла (break) и пропуск (continue)
    result += '\n5️⃣ break и continue (числа 1–10, пропускаем чётные, стоп на 8):\n  ';
    for (let i = 1; i <= 10; i++) {
        if (i % 2 === 0) continue; // пропускаем чётные
        if (i > 8) break;          // останавливаемся на 9
        result += i + ' ';
    }

    print('🔬 Циклы в JavaScript', result);
}

// ==========================================================
// ДЕМОНСТРАЦИЯ ПРИ ЗАГРУЗКЕ (как в задании №1.1)
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    // Объявляем переменные разных типов
    const userName = "Алексей";
    const userAge = 20;
    const isStudent = true;
    const favoriteColor = null;
    let city; // undefined

    console.log('===================== ЗАГРУЗКА СТРАНИЦЫ =====================');
    console.log('Имя:', userName);
    console.log('Возраст:', userAge);
    console.log('Студент?', isStudent);
    console.log('Любимый цвет:', favoriteColor);
    console.log('Город:', city);
    console.log('---------------------');
    console.log('Тип userName:    ', typeof userName);
    console.log('Тип userAge:     ', typeof userAge);
    console.log('Тип isStudent:   ', typeof isStudent);
    console.log('Тип favoriteColor:', typeof favoriteColor);
    console.log('Тип city:        ', typeof city);
    console.log('==============================================================');
    console.log('✅ Откройте консоль, чтобы увидеть все результаты!');
});