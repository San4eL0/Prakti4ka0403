// ===================================================
// 1. ПОЛУЧЕНИЕ ССЫЛОК НА ЭЛЕМЕНТЫ
// ===================================================

const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const birthdateInput = document.getElementById('birthdate');   // ЗАДАНИЕ 4
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const agreeCheckbox = document.getElementById('agree');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const birthdateError = document.getElementById('birthdateError'); // ЗАДАНИЕ 4
const passwordError = document.getElementById('passwordError');
const confirmError = document.getElementById('confirmError');
const agreeError = document.getElementById('agreeError');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.querySelector('.btn-submit');

// ===================================================
// 2. ФУНКЦИИ ВАЛИДАЦИИ
// ===================================================

/**
 * Проверка имени: не менее 2 символов, только буквы и пробелы
 */
function validateName() {
    const value = nameInput.value.trim();
    const regex = /^[А-Яа-яA-Za-z\s]{2,}$/;

    if (value === '') {
        nameError.textContent = 'Имя обязательно для заполнения';
        nameInput.className = 'error';
        return false;
    } else if (!regex.test(value)) {
        nameError.textContent = 'Имя должно содержать только буквы (минимум 2)';
        nameInput.className = 'error';
        return false;
    } else {
        nameError.textContent = '';
        nameInput.className = 'success';
        return true;
    }
}

/**
 * Проверка email
 */
function validateEmail() {
    const value = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === '') {
        emailError.textContent = 'Email обязателен для заполнения';
        emailInput.className = 'error';
        return false;
    } else if (!regex.test(value)) {
        emailError.textContent = 'Введите корректный email';
        emailInput.className = 'error';
        return false;
    } else {
        emailError.textContent = '';
        emailInput.className = 'success';
        return true;
    }
}

/**
 * Проверка телефона (необязательное поле)
 */
function validatePhone() {
    const value = phoneInput.value.trim();

    // Поле необязательное — если пусто, ошибки нет
    if (value === '') {
        phoneError.textContent = '';
        phoneInput.className = '';
        return true;
    }

    // Разрешены: цифры, пробелы, дефисы, скобки, плюс
    const regex = /^[\d\s\-\(\)\+]+$/;

    if (!regex.test(value)) {
        phoneError.textContent = 'Используйте только цифры, пробелы, +, -, ()';
        phoneInput.className = 'error';
        return false;
    } else if (value.replace(/\D/g, '').length < 10) {
        phoneError.textContent = 'Введите минимум 10 цифр';
        phoneInput.className = 'error';
        return false;
    } else {
        phoneError.textContent = '';
        phoneInput.className = 'success';
        return true;
    }
}

/**
 * ЗАДАНИЕ 4: Проверка даты рождения (возраст не младше 18 лет)
 */
function validateBirthdate() {
    const value = birthdateInput.value;

    if (value === '') {
        birthdateError.textContent = 'Укажите дату рождения';
        birthdateInput.className = 'error';
        return false;
    }

    const birthDate = new Date(value);
    const today = new Date();

    // Проверка на некорректную дату
    if (isNaN(birthDate.getTime())) {
        birthdateError.textContent = 'Некорректная дата';
        birthdateInput.className = 'error';
        return false;
    }

    // Вычисляем возраст
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Корректировка, если день рождения ещё не наступил в этом году
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        birthdateError.textContent = 'Возраст должен быть не младше 18 лет';
        birthdateInput.className = 'error';
        return false;
    } else if (age > 120) {
        birthdateError.textContent = 'Проверьте правильность даты';
        birthdateInput.className = 'error';
        return false;
    } else {
        birthdateError.textContent = '';
        birthdateInput.className = 'success';
        return true;
    }
}

/**
 * ЗАДАНИЯ 1 и 2: Проверка пароля
 * - минимум 8 символов (было 6)
 * - должна быть хотя бы одна цифра
 */
function validatePassword() {
    const value = passwordInput.value;
    const hasDigit = /\d/.test(value);   // есть ли хотя бы одна цифра

    if (value === '') {
        passwordError.textContent = 'Пароль обязателен для заполнения';
        passwordInput.className = 'error';
        return false;
    } else if (value.length < 8) {
        passwordError.textContent = 'Пароль должен содержать минимум 8 символов';
        passwordInput.className = 'error';
        return false;
    } else if (!hasDigit) {
        passwordError.textContent = 'Пароль должен содержать хотя бы одну цифру';
        passwordInput.className = 'error';
        return false;
    } else {
        passwordError.textContent = '';
        passwordInput.className = 'success';
        return true;
    }
}

/**
 * Проверка подтверждения пароля
 */
function validateConfirm() {
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    if (confirm === '') {
        confirmError.textContent = 'Подтвердите пароль';
        confirmInput.className = 'error';
        return false;
    } else if (password !== confirm) {
        confirmError.textContent = 'Пароли не совпадают';
        confirmInput.className = 'error';
        return false;
    } else {
        confirmError.textContent = '';
        confirmInput.className = 'success';
        return true;
    }
}

/**
 * Проверка чекбокса согласия
 */
function validateAgree() {
    if (!agreeCheckbox.checked) {
        agreeError.textContent = 'Необходимо согласие на обработку данных';
        return false;
    } else {
        agreeError.textContent = '';
        return true;
    }
}

// =====================================================
// 3. ОБЩАЯ ПРОВЕРКА ВСЕЙ ФОРМЫ
// =====================================================

function validateForm() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isBirthdateValid = validateBirthdate();   // ЗАДАНИЕ 4
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirm();
    const isAgreeValid = validateAgree();

    const isValid = isNameValid
                 && isEmailValid
                 && isPhoneValid
                 && isBirthdateValid
                 && isPasswordValid
                 && isConfirmValid
                 && isAgreeValid;

    // Блокируем/разблокируем кнопку отправки
    submitBtn.disabled = !isValid;

    return isValid;
}

// ===================================================
// 4. НАЗНАЧЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ
// ===================================================

// Валидация в реальном времени (при вводе)
nameInput.addEventListener('input', () => {
    validateName();
    validateForm();
});

emailInput.addEventListener('input', () => {
    validateEmail();
    validateForm();
});

phoneInput.addEventListener('input', () => {
    validatePhone();
    validateForm();
});

// ЗАДАНИЕ 4: обработчик для даты рождения
birthdateInput.addEventListener('input', () => {
    validateBirthdate();
    validateForm();
});

passwordInput.addEventListener('input', () => {
    validatePassword();
    // Если пароль меняется — перепроверяем подтверждение
    if (confirmInput.value) {
        validateConfirm();
    }
    validateForm();
});

confirmInput.addEventListener('input', () => {
    validateConfirm();
    validateForm();
});

agreeCheckbox.addEventListener('change', () => {
    validateAgree();
    validateForm();
});

// Проверка при потере фокуса (blur) — для лучшего UX
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);
birthdateInput.addEventListener('blur', validateBirthdate);   // ЗАДАНИЕ 4
passwordInput.addEventListener('blur', validatePassword);
confirmInput.addEventListener('blur', validateConfirm);

// ===================================================
// ЗАДАНИЕ 3: Показ/скрытие пароля ("глаз")
// ===================================================
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function () {
        const targetId = this.dataset.target;
        const input = document.getElementById(targetId);

        if (input.type === 'password') {
            input.type = 'text';
            this.textContent = '🙈';
        } else {
            input.type = 'password';
            this.textContent = '👁';
        }
    });
});

// ===================================================
// 5. ОБРАБОТКА ОТПРАВКИ ФОРМЫ
// ===================================================

form.addEventListener('submit', function (event) {
    // Отменяем стандартную отправку
    event.preventDefault();

    // Финальная проверка всех полей
    if (validateForm()) {
        // Имитация отправки данных на сервер
        console.log('✅ Форма валидна! Отправка данных...');
        console.log({
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            birthdate: birthdateInput.value,
            password: passwordInput.value // в реальности пароль не логируем
        });

        // Показываем сообщение об успехе
        successMessage.className = 'success-visible';

        // Блокируем форму после успешной отправки
        form.querySelectorAll('input').forEach(input => {
            input.disabled = true;
        });
        submitBtn.disabled = true;

        // Скрываем сообщение через 5 секунд (для демонстрации)
        setTimeout(() => {
            successMessage.className = 'success-hidden';
        }, 5000);
    } else {
        // Прокручиваем к первому полю с ошибкой
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
        console.warn('❌ Форма содержит ошибки');
    }
});

// =============================================
// 6. ОБРАБОТКА СБРОСА (кнопка "Очистить")
// =============================================

form.addEventListener('reset', function () {
    // Сброс состояния полей через небольшую задержку,
    // чтобы браузер успел очистить значения
    setTimeout(() => {
        // Сбрасываем классы и сообщения об ошибках
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.className = '';
        });

        const errors = form.querySelectorAll('.error-message');
        errors.forEach(err => {
            err.textContent = '';
        });

        // Возвращаем кнопкам "глаз" исходную иконку
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.textContent = '👁';
        });

        // Скрываем сообщение об успехе
        successMessage.className = 'success-hidden';

        // Разблокируем все поля
        form.querySelectorAll('input').forEach(input => {
            input.disabled = false;
        });

        // Обновляем состояние кнопки
        submitBtn.disabled = true;

        console.log('🔄 Форма очищена');
    }, 10);
});

// ===================================================
// 7. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// ===================================================
// При загрузке кнопка отправки заблокирована
submitBtn.disabled = true;

console.log('✅ Форма загружена, валидация активна');