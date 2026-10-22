// ============================================================
// 1. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================
function getActiveTab() {
    return browser.tabs.query({ active: true, currentWindow: true });
}

function executeInTab(actionCode) {
    getActiveTab().then(tabs => {
        const tabId = tabs[0].id;
        browser.tabs.executeScript(tabId, { code: actionCode }).catch(error => {
            showError('Не удалось выполнить действие на этой странице');
            console.error('Ошибка:', error);
        });
    });
}

function showError(message) {
    document.getElementById('popup-content').classList.add('hidden');
    const errorDiv = document.getElementById('error-content');
    errorDiv.classList.remove('hidden');
    errorDiv.querySelector('p').textContent = message;
    setTimeout(() => {
        errorDiv.classList.add('hidden');
        document.getElementById('popup-content').classList.remove('hidden');
    }, 2000);
}

// ============================================================
// 2. ДЕЙСТВИЯ НА СТРАНИЦЕ (выполняются через executeScript)
// ============================================================
const actions = {
    showHello: () => {
        alert('Hello, World! 👋');
    },
    changeColor: () => {
        document.body.style.backgroundColor = '#2196F3';
        document.body.style.transition = 'background-color 0.5s';
    },
    increaseFont: () => {
        const currentSize = parseInt(document.body.style.fontSize) || 16;
        document.body.style.fontSize = (currentSize + 2) + 'px';
    },
    decreaseFont: () => {
        const currentSize = parseInt(document.body.style.fontSize) || 16;
        document.body.style.fontSize = Math.max(8, currentSize - 2) + 'px';
    },
    toggleDarkMode: () => {
        const isDark = document.body.dataset.dark === 'true';
        if (isDark) {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
            document.body.dataset.dark = 'false';
        } else {
            document.body.style.backgroundColor = '#1a1a1a';
            document.body.style.color = '#ffffff';
            document.body.dataset.dark = 'true';
        }
    },
    resetAll: () => {
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        document.body.style.fontSize = '';
        document.body.dataset.dark = 'false';
    }
};

// ============================================================
// 3. СЧЁТЧИК КЛИКОВ (Задание 4 — storage.local)
// ============================================================
function incrementHelloCount() {
    browser.storage.local.get('helloCount').then(result => {
        const count = (result.helloCount || 0) + 1;
        browser.storage.local.set({ helloCount: count });
        document.getElementById('hello-count').textContent = count;
    });
}

function loadHelloCount() {
    browser.storage.local.get('helloCount').then(result => {
        document.getElementById('hello-count').textContent = result.helloCount || 0;
    });
}

// ============================================================
// 4. ОБРАБОТЧИКИ
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    loadHelloCount();

    document.getElementById('hello-btn').addEventListener('click', () => {
        executeInTab(`(${actions.showHello.toString()})();`);
        incrementHelloCount();
    });

    document.getElementById('color-btn').addEventListener('click', () => {
        executeInTab(`(${actions.changeColor.toString()})();`);
    });

    document.getElementById('font-up-btn').addEventListener('click', () => {
        executeInTab(`(${actions.increaseFont.toString()})();`);
    });

    document.getElementById('font-down-btn').addEventListener('click', () => {
        executeInTab(`(${actions.decreaseFont.toString()})();`);
    });

    document.getElementById('dark-btn').addEventListener('click', () => {
        executeInTab(`(${actions.toggleDarkMode.toString()})();`);
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        executeInTab(`(${actions.resetAll.toString()})();`);
        browser.storage.local.set({ helloCount: 0 });
        document.getElementById('hello-count').textContent = '0';
    });
});