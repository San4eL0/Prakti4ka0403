// ==========================================================
// 1. ИНФОРМАЦИЯ ОБ ЭКРАНЕ
// ==========================================================
const width  = screen.width;
const height = screen.height;

// ЗАДАНИЕ 1.1: Общее количество пикселей в мегапикселях
const totalPixels = width * height;
const megaPixels  = (totalPixels / 1_000_000).toFixed(2);

// ЗАДАНИЕ 1.2: Соотношение сторон через НОД (алгоритм Евклида)
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

const divisor = gcd(width, height);
const aspectW = width  / divisor;
const aspectH = height / divisor;
const aspectString = `${aspectW}:${aspectH}`;

// ЗАДАНИЕ 2: Глубина цвета
// screen.colorDepth — количество бит на 1 пиксель (24, 30, 32...)
const colorDepthBits = screen.colorDepth;
const bytesPerPixel  = colorDepthBits / 8;  // 1 байт = 8 бит

// Общий объём видеопамяти для текущего разрешения
// Формула: (всего пикселей × байт на пиксель) / (1024³) — переводим в ГБ
const videoBytes = totalPixels * bytesPerPixel;
const videoMB    = (videoBytes / (1024 * 1024)).toFixed(2);
const videoGB    = (videoBytes / (1024 * 1024 * 1024)).toFixed(3);

// Доступная область (без панели задач)
const availWidth  = screen.availWidth;
const availHeight = screen.availHeight;

// ВЫВОД
document.getElementById('screenRes').textContent   = `${width} × ${height}`;
document.getElementById('availRes').textContent    = `${availWidth} × ${availHeight}`;
document.getElementById('pixels').textContent      = megaPixels;
document.getElementById('aspectRatio').textContent = aspectString;
document.getElementById('colorDepth').textContent  = colorDepthBits;
document.getElementById('bytesPerPixel').textContent = bytesPerPixel;
document.getElementById('videoMemory').textContent =
    `${videoMB} МБ (${videoGB} ГБ)`;

// ==========================================================
// 2. ИНФОРМАЦИЯ О ПАМЯТИ (ОЗУ)
// ==========================================================
// navigator.deviceMemory — только приблизительное значение (0.25, 0.5, 1, 2, 4, 8)
// Может быть недоступно (в Firefox, Safari)
let ram = navigator.deviceMemory || 4;   // по умолчанию 4 ГБ

const ramMB = ram * 1024;
const ramKB = ramMB * 1024;

// ЗАДАНИЕ 3: "Умный" кэш — сколько страниц А4 (~10 КБ) поместится в ОЗУ
const pagesA4 = Math.floor((ram * 1024 * 1024) / 10);

document.getElementById('ramGB').textContent  = ram;
document.getElementById('ramMB').textContent  = ramMB;
document.getElementById('ramKB').textContent  = ramKB;
document.getElementById('ramPages').textContent =
    pagesA4.toLocaleString('ru-RU');

// ==========================================================
// 3. ИНФОРМАЦИЯ О БРАУЗЕРЕ И СИСТЕМЕ
// ==========================================================
const ua = navigator.userAgent;
let browser = 'Неизвестный';

// ВАЖНО: проверяем Edge ДО Chrome, т.к. Edge содержит в UA "Chrome"
if (ua.includes('Edg/'))       browser = 'Microsoft Edge';
else if (ua.includes('OPR/') || ua.includes('Opera')) browser = 'Opera';
else if (ua.includes('YaBrowser')) browser = 'Яндекс.Браузер';
else if (ua.includes('Firefox'))   browser = 'Mozilla Firefox';
else if (ua.includes('Chrome'))    browser = 'Google Chrome';
else if (ua.includes('Safari'))    browser = 'Safari';

// ЗАДАНИЕ 3.1: Разрядность ОС
// Современный способ (Chrome/Edge)
let arch = 'не определено';

if (navigator.userAgentData) {
    // Используем современный API
    navigator.userAgentData.getHighEntropyValues(['architecture', 'bitness'])
        .then(data => {
            if (data.bitness) {
                document.getElementById('osArch').textContent =
                    `${data.bitness}-bit (${data.architecture || 'unknown'})`;
            }
        })
        .catch(() => {});
    arch = 'определяется...';
} else {
    // Fallback через парсинг userAgent
    if (ua.includes('WOW64') || ua.includes('Win64') || ua.includes('x64')) {
        arch = '64-bit';
    } else if (ua.includes('Win32') || ua.includes('x86')) {
        arch = '32-bit';
    } else if (ua.includes('Mac OS X')) {
        arch = '64-bit (macOS)';
    } else if (ua.includes('Linux')) {
        arch = '64-bit (Linux)';
    } else if (ua.includes('Android')) {
        arch = 'ARM (Android)';
    }
}

// ЗАДАНИЕ 3.2: Язык системы
const language = navigator.language || navigator.userLanguage || 'неизвестно';

document.getElementById('browserName').textContent = browser;
document.getElementById('osArch').textContent      = arch;
document.getElementById('sysLang').textContent     = language;
document.getElementById('platform').textContent    = navigator.platform || 'неизвестно';

// ==========================================================
// 4. СЕТЕВЫЕ ВЫЧИСЛЕНИЯ
// ==========================================================
const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;

// ЗАДАНИЕ 4.1: Тип соединения
const connType = connection ? connection.effectiveType : 'не определено';
document.getElementById('connType').textContent = connType || 'не определено';

// ==========================================================
// ЗАДАНИЕ 1 (самостоятельное): Автоматическое определение скорости
// ==========================================================
function updateDownloadTime() {
    // navigator.connection.downlink — скорость в Мбит/с (приблизительно)
    // Если недоступно — используем 50 Мбит/с по умолчанию
    const realSpeedMbps = connection && connection.downlink
        ? connection.downlink
        : 50;

    // Перевод Мбит/с → МБ/с: делим на 8 (1 байт = 8 бит)
    const speedMBps = realSpeedMbps / 8;

    // Время скачивания файла 500 МБ
    const fileSizeMB  = 500;
    const downloadSec = fileSizeMB / speedMBps;

    document.getElementById('realSpeed').textContent = realSpeedMbps;
    document.getElementById('downloadTime').textContent = downloadSec.toFixed(1);

    // Дополнительно: время в минутах и секундах
    const minutes = Math.floor(downloadSec / 60);
    const seconds = Math.round(downloadSec % 60);
    console.log(`⏱ Скачивание 500 МБ при ${realSpeedMbps} Мбит/с: ` +
                `${minutes} мин ${seconds} сек (${downloadSec.toFixed(1)} сек)`);
}

// Первоначальный расчёт
updateDownloadTime();

// Слушаем изменения сети (если API доступен)
if (connection) {
    connection.addEventListener('change', () => {
        console.log('🔄 Соединение изменилось:', connection.effectiveType);
        document.getElementById('connType').textContent = connection.effectiveType;
        updateDownloadTime();
    });
}

// ==========================================================
// 5. ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ
// ==========================================================

// Размер окна браузера (обновляется при изменении)
function updateWindowSize() {
    document.getElementById('windowSize').textContent =
        `${window.innerWidth} × ${window.innerHeight}`;
}
updateWindowSize();
window.addEventListener('resize', updateWindowSize);

// Время загрузки страницы
window.addEventListener('load', () => {
    const loadTime = performance.now();
    document.getElementById('loadTime').textContent =
        `${loadTime.toFixed(0)} мс`;

    // Разрядность (обновляем после возможного ответа от userAgentData)
    setTimeout(() => {
        if (arch === 'определяется...') {
            document.getElementById('osArch').textContent = 'не определено';
        }
    }, 500);
});

// Часовой пояс
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
document.getElementById('timezone').textContent = timezone;

// Онлайн-статус
function updateOnlineStatus() {
    const statusEl = document.getElementById('onlineStatus');
    if (navigator.onLine) {
        statusEl.textContent = '🟢 Онлайн';
        statusEl.className = 'result online';
    } else {
        statusEl.textContent = '🔴 Оффлайн';
        statusEl.className = 'result offline';
    }
}
updateOnlineStatus();
window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// ==========================================================
// ВЫВОД В КОНСОЛЬ
// ==========================================================
console.log('========================================');
console.log('🖥️ Системный калькулятор загружен');
console.log('========================================');
console.log(`Разрешение экрана: ${width}×${height}`);
console.log(`Мегапиксели: ${megaPixels} MP`);
console.log(`Соотношение сторон: ${aspectString}`);
console.log(`Глубина цвета: ${colorDepthBits} бит (${bytesPerPixel} байт/пиксель)`);
console.log(`ОЗУ: ~${ram} ГБ`);
console.log(`Вместится страниц А4: ${pagesA4.toLocaleString('ru-RU')}`);
console.log(`Браузер: ${browser}`);
console.log(`Язык: ${language}`);
console.log(`Часовой пояс: ${timezone}`);
console.log('========================================');