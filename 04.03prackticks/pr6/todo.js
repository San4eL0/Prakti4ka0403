// ==========================================================
// ЗАДАНИЕ 2: загрузка задач из localStorage
// ==========================================================
let tasks = loadTasks();
let currentFilter = "all";
let nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

// ===== DOM-элементы =====
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const deadlineInput = document.getElementById("deadlineInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const activeCount = document.getElementById("activeCount");
const filterButtons = document.querySelectorAll(".filters button");

// ==========================================================
// ЗАДАНИЕ 2: Сохранение и загрузка из localStorage
// ==========================================================
function saveTasks() {
    localStorage.setItem("todo_tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const data = localStorage.getItem("todo_tasks");
    if (data) {
        try {
            return JSON.parse(data);
        } catch (e) {
            console.warn("Ошибка чтения localStorage:", e);
            return [];
        }
    }
    return [];
}

// ==========================================================
// ЗАДАНИЕ 4: проверка просроченности задачи
// ==========================================================
function isOverdue(task) {
    if (!task.deadline || task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(task.deadline);
    deadline.setHours(0, 0, 0, 0);
    return deadline < today;
}

// ==========================================================
// ЗАДАНИЕ 1: форматирование даты создания
// ==========================================================
function formatDate(isoString) {
    if (!isoString) return "";
    const d = new Date(isoString);
    return d.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

// ===== Основные функции =====
function addTask(text) {
    if (text.trim() === "") {
        alert("Введите текст задачи!");
        return;
    }

    const task = {
        id: nextId++,
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),          // ЗАДАНИЕ 1
        priority: prioritySelect.value,                // ЗАДАНИЕ 3
        deadline: deadlineInput.value || null          // ЗАДАНИЕ 4
    };

    tasks.push(task);
    taskInput.value = "";
    deadlineInput.value = "";
    prioritySelect.value = "medium";

    saveTasks();   // ЗАДАНИЕ 2
    render();
}

function deleteTask(id) {
    if (confirm("Удалить задачу?")) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();   // ЗАДАНИЕ 2
        render();
    }
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();   // ЗАДАНИЕ 2
        render();
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newText = prompt("Редактировать задачу:", task.text);
    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();   // ЗАДАНИЕ 2
        render();
    }
}

function clearAllTasks() {
    if (tasks.length === 0) return;
    if (confirm("Удалить все задачи?")) {
        tasks = [];
        saveTasks();   // ЗАДАНИЕ 2
        render();
    }
}

// ===== Фильтрация =====
function getFilteredTasks() {
    if (currentFilter === "all") return tasks;
    if (currentFilter === "active") return tasks.filter(t => !t.completed);
    if (currentFilter === "completed") return tasks.filter(t => t.completed);
    if (currentFilter === "overdue") return tasks.filter(t => isOverdue(t));  // ЗАДАНИЕ 4
    return tasks;
}

// ==========================================================
// ЗАДАНИЕ 3: сортировка задач по приоритету
// ==========================================================
function sortByPriority(list) {
    const order = { high: 0, medium: 1, low: 2 };
    return [...list].sort((a, b) => {
        // Сначала невыполненные, потом выполненные
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        // Затем по приоритету
        return order[a.priority] - order[b.priority];
    });
}

// ===== Рендеринг =====
function render() {
    const filteredTasks = sortByPriority(getFilteredTasks());   // ЗАДАНИЕ 3

    // Обновляем статистику
    totalCount.textContent = tasks.length;
    completedCount.textContent = tasks.filter(t => t.completed).length;
    activeCount.textContent = tasks.filter(t => !t.completed).length;

    // Очищаем список
    taskList.innerHTML = "";

    // Проверка на пустоту
    if (filteredTasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "empty-message";
        let message;
        if (tasks.length === 0) {
            message = "Нет задач. Добавьте первую!";
        } else if (currentFilter === "overdue") {
            message = "Просроченных задач нет 🎉";
        } else {
            message = "Нет задач с выбранным фильтром";
        }
        emptyMessage.innerHTML = `
            <span>${tasks.length === 0 ? "📭" : "🔍"}</span>
            ${message}
        `;
        taskList.appendChild(emptyMessage);
        return;
    }

    // Рендерим каждую задачу
    for (let task of filteredTasks) {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        // ЗАДАНИЕ 3: класс приоритета
        li.classList.add("priority-" + (task.priority || "medium"));

        // ЗАДАНИЕ 4: класс просроченной задачи
        if (isOverdue(task)) li.classList.add("overdue");

        // Контейнер с контентом
        const contentDiv = document.createElement("div");
        contentDiv.className = "task-content";
        contentDiv.addEventListener("click", () => toggleTask(task.id));

        // Текст задачи
        const textSpan = document.createElement("span");
        textSpan.className = "task-text";
        textSpan.textContent = task.text;
        contentDiv.appendChild(textSpan);

        // Мета-информация (ЗАДАНИЯ 1, 3, 4)
        const metaDiv = document.createElement("div");
        metaDiv.className = "task-meta";

        // ЗАДАНИЕ 1: дата создания
        const createdSpan = document.createElement("span");
        createdSpan.textContent = "🕐 " + formatDate(task.createdAt);
        metaDiv.appendChild(createdSpan);

        // ЗАДАНИЕ 3: приоритет
        if (task.priority) {
            const prioritySpan = document.createElement("span");
            prioritySpan.className = "priority-badge " + task.priority;
            const labels = { high: "Высокий", medium: "Средний", low: "Низкий" };
            prioritySpan.textContent = labels[task.priority];
            metaDiv.appendChild(prioritySpan);
        }

        // ЗАДАНИЕ 4: срок выполнения
        if (task.deadline) {
            const deadlineSpan = document.createElement("span");
            deadlineSpan.className = "task-deadline";
            const d = new Date(task.deadline);
            const formatted = d.toLocaleDateString("ru-RU");
            deadlineSpan.textContent = (isOverdue(task) ? "⚠️ " : "📅 ") + "до " + formatted;
            metaDiv.appendChild(deadlineSpan);
        }

        contentDiv.appendChild(metaDiv);

        // Кнопки действий
        const actionsDiv = document.createElement("div");
        actionsDiv.className = "task-actions";

        const editBtn = document.createElement("button");
        editBtn.className = "btn-edit";
        editBtn.textContent = "✏️";
        editBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            editTask(task.id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-delete";
        deleteBtn.textContent = "🗑";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteTask(task.id);
        });

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(contentDiv);
        li.appendChild(actionsDiv);
        taskList.appendChild(li);
    }
}

// ===== Обработчики событий =====
addTaskBtn.addEventListener("click", () => addTask(taskInput.value));

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask(taskInput.value);
    }
});

clearAllBtn.addEventListener("click", clearAllTasks);

filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        filterButtons.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        currentFilter = this.dataset.filter;
        render();
    });
});

// ===== Инициализация =====
function init() {
    // ЗАДАНИЕ 2: примеры задач добавляются ТОЛЬКО если localStorage пуст
    if (tasks.length === 0) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const exampleTasks = [
            {
                text: "Изучить JavaScript",
                priority: "high",
                deadline: tomorrow.toISOString().split("T")[0]
            },
            {
                text: "Сделать лабораторную работу",
                priority: "medium",
                deadline: null
            },
            {
                text: "Пойти на пару",
                priority: "low",
                deadline: null
            }
        ];

        for (let ex of exampleTasks) {
            tasks.push({
                id: nextId++,
                text: ex.text,
                completed: false,
                createdAt: new Date().toISOString(),
                priority: ex.priority,
                deadline: ex.deadline
            });
        }
        saveTasks();
    }

    render();
}

init();
console.log("✅ To-Do приложение загружено!");