v// ============================================================
// ПР22: КЛАСС BOOK — МОДЕЛЬ ДАННЫХ
// ============================================================
class Book {
    #id;
    #rating = 0;

    constructor(title, author, year, genre = 'Не указан') {
        this.#id = Date.now() + Math.random();
        this.title = title;
        this.author = author;
        this.year = year;
        this.genre = genre;
        this.isAvailable = true;
        this.isFavorite = false;
    }

    getId() { return this.#id; }

    // Геттер: возраст книги
    get age() {
        return new Date().getFullYear() - this.year;
    }

    // Задание 1 (ПР22): книга старше 100 лет?
    isOld() {
        return this.age > 100;
    }

    // Сеттер: рейтинг с валидацией
    set rating(value) {
        if (value < 0 || value > 5) {
            throw new Error('Рейтинг должен быть от 0 до 5');
        }
        this.#rating = value;
    }

    // Геттер: рейтинг
    get rating() {
        return this.#rating;
    }

    toggleAvailability() {
        this.isAvailable = !this.isAvailable;
    }

    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
    }

    getInfo() {
        const status = this.isAvailable ? '✅ Доступна' : '❌ Выдана';
        return `${this.title} — ${this.author} (${this.year}), ${status}`;
    }

    // ПР25: сериализация в JSON
    toJSON() {
        return {
            id: this.#id,
            title: this.title,
            author: this.author,
            year: this.year,
            genre: this.genre,
            isAvailable: this.isAvailable,
            isFavorite: this.isFavorite,
            rating: this.#rating,
            type: 'Book'
        };
    }

    // ПР25: восстановление из JSON
    static fromJSON(data) {
        const book = new Book(data.title, data.author, data.year, data.genre);
        Object.defineProperty(book, 'id', { value: data.id });
        book.isAvailable = data.isAvailable;
        book.isFavorite = data.isFavorite || false;
        if (data.rating >= 0 && data.rating <= 5) {
            book.rating = data.rating;
        }
        return book;
    }
}

// ============================================================
// ПР23: НАСЛЕДОВАНИЕ — EBOOK
// ============================================================
class EBook extends Book {
    constructor(title, author, year, fileSize, format = 'PDF') {
        super(title, author, year);
        this.fileSize = fileSize;
        this.format = format;
        this.isDownloaded = false;
    }

    getInfo() {
        const base = super.getInfo();
        return `${base} (Электронная, ${this.format}, ${this.fileSize} МБ)`;
    }

    download() {
        this.isDownloaded = true;
        console.log(`📥 Книга "${this.title}" скачана`);
    }

    toggleAvailability() {
        super.toggleAvailability();
        if (!this.isAvailable) {
            this.isDownloaded = false;
        }
    }

    toJSON() {
        return {
            ...super.toJSON(),
            fileSize: this.fileSize,
            format: this.format,
            isDownloaded: this.isDownloaded,
            type: 'EBook'
        };
    }

    static fromJSON(data) {
        const book = new EBook(data.title, data.author, data.year, data.fileSize, data.format);
        Object.defineProperty(book, 'id', { value: data.id });
        book.isAvailable = data.isAvailable;
        book.isFavorite = data.isFavorite || false;
        if (data.rating >= 0 && data.rating <= 5) book.rating = data.rating;
        book.isDownloaded = data.isDownloaded || false;
        return book;
    }
}

// ============================================================
// ПР23: НАСЛЕДОВАНИЕ — AUDIOBOOK
// ============================================================
class AudioBook extends Book {
    constructor(title, author, year, duration, narrator = 'Неизвестный чтец') {
        super(title, author, year);
        this.duration = duration;
        this.narrator = narrator;
        this.currentTime = 0;
    }

    getInfo() {
        const base = super.getInfo();
        const hours = Math.floor(this.duration / 60);
        const minutes = this.duration % 60;
        const timeStr = hours > 0 ? `${hours} ч ${minutes} мин` : `${minutes} мин`;
        return `${base} (Аудиокнига, ${timeStr}, чтец: ${this.narrator})`;
    }

    listen(minutes) {
        this.currentTime = Math.min(this.currentTime + minutes, this.duration);
        const remaining = this.duration - this.currentTime;
        console.log(`🎧 Прослушано ${this.currentTime} мин. Осталось: ${remaining} мин`);
        if (this.currentTime >= this.duration) {
            console.log(`🎉 Книга "${this.title}" прослушана полностью!`);
        }
        return this.currentTime;
    }

    resetProgress() {
        this.currentTime = 0;
    }

    getProgressPercent() {
        if (this.duration === 0) return 0;
        return Math.round((this.currentTime / this.duration) * 100);
    }

    // Задание 2 (ПР23): переход к минуте
    skipTo(time) {
        if (time < 0) time = 0;
        if (time > this.duration) time = this.duration;
        this.currentTime = time;
        console.log(`⏩ Переход к ${time} минуте`);
    }

    toJSON() {
        return {
            ...super.toJSON(),
            duration: this.duration,
            narrator: this.narrator,
            currentTime: this.currentTime,
            type: 'AudioBook'
        };
    }

    static fromJSON(data) {
        const book = new AudioBook(data.title, data.author, data.year, data.duration, data.narrator);
        Object.defineProperty(book, 'id', { value: data.id });
        book.isAvailable = data.isAvailable;
        book.isFavorite = data.isFavorite || false;
        if (data.rating >= 0 && data.rating <= 5) book.rating = data.rating;
        book.currentTime = data.currentTime || 0;
        return book;
    }
}

// ============================================================
// ПР23 (Задание 1): EDUCATIONAL BOOK — наследник Book
// ============================================================
class EducationalBook extends Book {
    constructor(title, author, year, subject, level = 'beginner') {
        super(title, author, year);
        this.subject = subject;
        this.level = level;
    }

    getInfo() {
        const base = super.getInfo();
        const levelMap = { beginner: 'Начальный', intermediate: 'Средний', advanced: 'Продвинутый' };
        return `${base} (Учебник по ${this.subject}, ${levelMap[this.level] || this.level})`;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            subject: this.subject,
            level: this.level,
            type: 'EducationalBook'
        };
    }

    static fromJSON(data) {
        const book = new EducationalBook(data.title, data.author, data.year, data.subject, data.level);
        Object.defineProperty(book, 'id', { value: data.id });
        book.isAvailable = data.isAvailable;
        book.isFavorite = data.isFavorite || false;
        if (data.rating >= 0 && data.rating <= 5) book.rating = data.rating;
        return book;
    }
}

// ============================================================
// ПР22–ПР25: LIBRARYMANAGER (бизнес-логика + localStorage)
// ============================================================
class LibraryManager {
    constructor() {
        this.books = [];
        this.loadFromStorage();
    }

    // Приватное сохранение
    #saveToStorage() {
        try {
            const data = this.books.map(book => book.toJSON());
            localStorage.setItem('libraryData', JSON.stringify(data));
            this.updateSaveIndicator();
            console.log(`💾 Сохранено ${this.books.length} книг`);
        } catch (error) {
            console.error('❌ Ошибка сохранения:', error);
        }
    }

    // Публичный метод для внешних вызовов (импорт)
    saveData() {
        this.#saveToStorage();
    }

    // Загрузка из localStorage
    loadFromStorage() {
        try {
            const raw = localStorage.getItem('libraryData');
            if (!raw) {
                console.log('📭 Данных в localStorage нет');
                return;
            }
            const dataArray = JSON.parse(raw);
            this.books = dataArray.map(item => {
                if (item.type === 'EBook') return EBook.fromJSON(item);
                if (item.type === 'AudioBook') return AudioBook.fromJSON(item);
                if (item.type === 'EducationalBook') return EducationalBook.fromJSON(item);
                return Book.fromJSON(item);
            });
            console.log(`📂 Загружено ${this.books.length} книг из localStorage`);
        } catch (error) {
            console.error('❌ Ошибка загрузки:', error);
            this.books = [];
        }
    }

    updateSaveIndicator() {
        const el = document.getElementById('saveIndicator');
        if (el) {
            el.textContent = `💾 Сохранено в ${new Date().toLocaleTimeString('ru-RU')}`;
        }
    }

    addBook(title, author, year, genre) {
        if (!title || !author || !year) throw new Error('Название, автор и год обязательны');
        const book = new Book(title, author, year, genre);
        this.books.push(book);
        this.#saveToStorage();
        return book;
    }

    addEBook(title, author, year, fileSize, format) {
        if (!title || !author || !year) throw new Error('Название, автор и год обязательны');
        const book = new EBook(title, author, year, fileSize, format);
        this.books.push(book);
        this.#saveToStorage();
        return book;
    }

    addAudioBook(title, author, year, duration, narrator) {
        if (!title || !author || !year) throw new Error('Название, автор и год обязательны');
        const book = new AudioBook(title, author, year, duration, narrator);
        this.books.push(book);
        this.#saveToStorage();
        return book;
    }

    removeBook(id) {
        this.books = this.books.filter(book => book.getId() !== id);
        this.#saveToStorage();
    }

    findBook(id) {
        return this.books.find(book => book.getId() === id);
    }

    findBooksByAuthor(author) {
        return this.books.filter(book =>
            book.author.toLowerCase().includes(author.toLowerCase())
        );
    }

    toggleBookAvailability(id) {
        const book = this.findBook(id);
        if (book) book.toggleAvailability();
        this.#saveToStorage();
        return book;
    }

    getAllBooks() { return this.books; }

    getStats() {
        const total = this.books.length;
        const available = this.books.filter(b => b.isAvailable).length;
        return { total, available, unavailable: total - available };
    }

    getAverageRating() {
        if (this.books.length === 0) return 0;
        const sum = this.books.reduce((acc, book) => acc + book.rating, 0);
        return Number((sum / this.books.length).toFixed(2));
    }

    getBooksByGenre(genre) {
        return this.books.filter(book =>
            book.genre.toLowerCase() === genre.toLowerCase()
        );
    }

    // Задание 2 (ПР22): диапазон лет
    getBooksByYearRange(fromYear, toYear) {
        return this.books.filter(book =>
            book.year >= fromYear && book.year <= toYear
        );
    }

    getEBooks() { return this.books.filter(b => b instanceof EBook); }
    getAudioBooks() { return this.books.filter(b => b instanceof AudioBook); }

    getBooksGroupedByType() {
        const result = { books: [], eBooks: [], audioBooks: [] };
        this.books.forEach(book => {
            if (book instanceof EBook) result.eBooks.push(book);
            else if (book instanceof AudioBook) result.audioBooks.push(book);
            else result.books.push(book);
        });
        return result;
    }

    clearAll() {
        this.books = [];
        this.#saveToStorage();
    }
}

// ============================================================
// ПР24: BOOKRENDERER — ОТОБРАЖЕНИЕ
// ============================================================
class BookRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.sortOrder = 'year-desc';
    }

    render(books) {
        this.container.innerHTML = '';

        if (!books || books.length === 0) {
            this.container.innerHTML = '<div class="empty-state">📚 Книг пока нет</div>';
            return;
        }

        books.forEach(book => {
            const card = this.createBookCard(book);
            this.container.appendChild(card);
        });
    }

    createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.dataset.id = book.getId();

        if (book.isAvailable) card.classList.add('available');
        else card.classList.add('unavailable');

        let typeBadge = '';
        let extraInfo = '';

        if (book instanceof EBook) {
            card.classList.add('ebook');
            typeBadge = '<span class="badge badge-ebook">📱 Электронная</span>';
            extraInfo = `📁 Размер: ${book.fileSize} МБ, Формат: ${book.format}`;
            if (book.isDownloaded) extraInfo += ' ✅ (Скачана)';
        } else if (book instanceof AudioBook) {
            card.classList.add('audiobook');
            typeBadge = '<span class="badge badge-audiobook">🎧 Аудиокнига</span>';
            const hours = Math.floor(book.duration / 60);
            const mins = book.duration % 60;
            const timeStr = hours > 0 ? `${hours} ч ${mins} мин` : `${mins} мин`;
            const progress = book.getProgressPercent();
            extraInfo = `⏱ ${timeStr}, чтец: ${book.narrator}`;
            if (progress > 0) extraInfo += `, Прослушано: ${progress}%`;
        } else {
            typeBadge = '<span class="badge badge-book">📖 Книга</span>';
        }

        const statusText = book.isAvailable ? '✅ Доступна' : '❌ Выдана';
        const statusColor = book.isAvailable ? '#28a745' : '#dc3545';
        const rating = Math.round(book.rating);
        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        const favIcon = book.isFavorite ? '⭐' : '☆';

        card.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-meta">
                ${book.author} (${book.year}) ${typeBadge}
                <br><span style="color:${statusColor};font-weight:600;">${statusText}</span>
                <br><span style="color:#f39c12;">${stars}</span> (${book.rating || 'нет'})
                ${extraInfo ? `<br><small style="color:#888;">${extraInfo}</small>` : ''}
            </div>
            <div class="book-actions">
                <button class="toggle-btn btn-primary" data-id="${book.getId()}">
                    ${book.isAvailable ? '📤 Выдать' : '📥 Вернуть'}
                </button>
                <button class="rate-btn btn-outline" data-id="${book.getId()}">⭐ Оценить</button>
                <button class="fav-btn btn-outline" data-id="${book.getId()}">${favIcon} Избранное</button>
                <button class="delete-btn btn-danger" data-id="${book.getId()}">🗑 Удалить</button>
            </div>
        `;

        card.querySelector('.toggle-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.onToggle) this.onToggle(Number(e.target.dataset.id));
        });
        card.querySelector('.rate-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const id = Number(e.target.dataset.id);
            const value = prompt('Введите рейтинг (0-5):', '4');
            if (value !== null) {
                const rating = parseFloat(value);
                if (!isNaN(rating) && rating >= 0 && rating <= 5) {
                    if (this.onRate) this.onRate(id, rating);
                } else {
                    alert('Рейтинг должен быть числом от 0 до 5');
                }
            }
        });
        card.querySelector('.fav-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.onFavorite) this.onFavorite(Number(e.target.dataset.id));
        });
        card.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`Удалить книгу "${book.title}"?`)) {
                if (this.onDelete) this.onDelete(Number(e.target.dataset.id));
            }
        });

        return card;
    }

    setCallbacks({ onToggle, onRate, onDelete, onFavorite }) {
        this.onToggle = onToggle;
        this.onRate = onRate;
        this.onDelete = onDelete;
        this.onFavorite = onFavorite;
    }

    setFilter(filter) { this.currentFilter = filter; }
    setSearch(query) { this.searchQuery = query.toLowerCase(); }
    setSort(order) { this.sortOrder = order; }
}

// ============================================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================================
const library = new LibraryManager();
const renderer = new BookRenderer('booksContainer');

renderer.setCallbacks({
    onToggle: (id) => { library.toggleBookAvailability(id); updateUI(); },
    onRate: (id, rating) => {
        const book = library.findBook(id);
        if (book) {
            book.rating = rating;
            library.saveData();
            updateUI();
        }
    },
    onDelete: (id) => { library.removeBook(id); updateUI(); },
    onFavorite: (id) => {
        const book = library.findBook(id);
        if (book) {
            book.toggleFavorite();
            library.saveData();
            updateUI();
        }
    }
});

// ============================================================
// ОБНОВЛЕНИЕ ИНТЕРФЕЙСА
// ============================================================
function updateUI() {
    let books = [...library.getAllBooks()];

    const filter = renderer.currentFilter;
    if (filter === 'available') books = books.filter(b => b.isAvailable);
    else if (filter === 'unavailable') books = books.filter(b => !b.isAvailable);
    else if (filter === 'book') books = books.filter(b => !(b instanceof EBook) && !(b instanceof AudioBook));
    else if (filter === 'ebook') books = books.filter(b => b instanceof EBook);
    else if (filter === 'audiobook') books = books.filter(b => b instanceof AudioBook);

    if (renderer.searchQuery) {
        books = books.filter(b =>
            b.title.toLowerCase().includes(renderer.searchQuery) ||
            b.author.toLowerCase().includes(renderer.searchQuery)
        );
    }

    books.sort((a, b) => {
        switch (renderer.sortOrder) {
            case 'year-asc': return a.year - b.year;
            case 'year-desc': return b.year - a.year;
            case 'title': return a.title.localeCompare(b.title);
            case 'rating': return b.rating - a.rating;
            default: return 0;
        }
    });

    renderer.render(books);

    const stats = library.getStats();
    document.getElementById('totalBooks').textContent = stats.total;
    document.getElementById('availableBooks').textContent = stats.available;
    document.getElementById('unavailableBooks').textContent = stats.unavailable;
    document.getElementById('avgRating').textContent = library.getAverageRating();

    document.title = `Библиотека: ${library.getAllBooks().length} книг`;
}

// ============================================================
// ФОРМА
// ============================================================
const form = document.getElementById('bookForm');
const typeSelect = document.getElementById('type');
const extraFields = document.getElementById('extraFields');

typeSelect.addEventListener('change', () => {
    const type = typeSelect.value;
    let html = '';
    if (type === 'ebook') {
        html = `
            <div class="form-group">
                <label for="fileSize">Размер (МБ)</label>
                <input type="number" id="fileSize" step="0.1" value="1.0" min="0.1">
            </div>
            <div class="form-group">
                <label for="format">Формат</label>
                <select id="format">
                    <option value="PDF">PDF</option>
                    <option value="EPUB">EPUB</option>
                    <option value="MOBI">MOBI</option>
                </select>
            </div>
        `;
    } else if (type === 'audiobook') {
        html = `
            <div class="form-group">
                <label for="duration">Длительность (минуты)</label>
                <input type="number" id="duration" value="60" min="1">
            </div>
            <div class="form-group">
                <label for="narrator">Чтец</label>
                <input type="text" id="narrator" placeholder="Имя чтеца" value="Неизвестный чтец">
            </div>
        `;
    }
    extraFields.innerHTML = html;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const year = parseInt(document.getElementById('year').value);
    const type = typeSelect.value;

    if (!title || !author || !year) {
        alert('⚠ Заполните все обязательные поля!');
        return;
    }

    try {
        if (type === 'ebook') {
            const fileSize = parseFloat(document.getElementById('fileSize').value) || 1;
            const format = document.getElementById('format').value;
            library.addEBook(title, author, year, fileSize, format);
        } else if (type === 'audiobook') {
            const duration = parseInt(document.getElementById('duration').value) || 60;
            const narrator = document.getElementById('narrator').value.trim() || 'Неизвестный чтец';
            library.addAudioBook(title, author, year, duration, narrator);
        } else {
            library.addBook(title, author, year);
        }
        form.reset();
        extraFields.innerHTML = '';
        updateUI();
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
});

// ============================================================
// ФИЛЬТРЫ / ПОИСК / ОЧИСТКА
// ============================================================
document.querySelectorAll('.filters button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderer.setFilter(btn.dataset.filter);
        updateUI();
    });
});

document.getElementById('searchInput').addEventListener('input', function() {
    renderer.setSearch(this.value);
    updateUI();
});

document.getElementById('clearAllBtn').addEventListener('click', () => {
    if (confirm('⚠ Удалить все книги безвозвратно?')) {
        library.clearAll();
        updateUI();
    }
});

// ============================================================
// ЭКСПОРТ / ИМПОРТ
// ============================================================
document.getElementById('exportBtn').addEventListener('click', () => {
    const data = library.books.map(book => book.toJSON());
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `library_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

document.getElementById('importBtn').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (e) => {
    if (e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        try {
            const dataArray = JSON.parse(event.target.result);
            if (!Array.isArray(dataArray)) throw new Error('Неверный формат');

            const importedBooks = dataArray.map(item => {
                if (item.type === 'EBook') return EBook.fromJSON(item);
                if (item.type === 'AudioBook') return AudioBook.fromJSON(item);
                if (item.type === 'EducationalBook') return EducationalBook.fromJSON(item);
                return Book.fromJSON(item);
            });

            importedBooks.forEach(book => library.books.push(book));
            library.saveData();
            updateUI();
            alert(`✅ Импортировано ${importedBooks.length} книг`);
        } catch (error) {
            alert('❌ Ошибка импорта: ' + error.message);
        }
    };

    reader.readAsText(file);
    e.target.value = '';
});

// ============================================================
// СИНХРОНИЗАЦИЯ МЕЖДУ ВКЛАДКАМИ (Задание 3 ПР25)
// ============================================================
window.addEventListener('storage', (e) => {
    if (e.key === 'libraryData') {
        library.loadFromStorage();
        updateUI();
        console.log('🔄 Данные синхронизированы с другой вкладки');
    }
});

// ============================================================
// ЗАПУСК
// ============================================================
updateUI();
console.log('✅ Библиотека книг (ПР22–ПР25) запущена');

// Демо-данные при первом запуске
if (library.books.length === 0) {
    library.addBook('Война и мир', 'Лев Толстой', 1869, 'Роман');
    library.addBook('Преступление и наказание', 'Фёдор Достоевский', 1866, 'Роман');
    library.addEBook('1984', 'Джордж Оруэлл', 1949, 2.5, 'EPUB');
    library.addAudioBook('Мастер и Маргарита', 'М. Булгаков', 1967, 180, 'Алексей Иванов');
    library.books.push(new EducationalBook('JavaScript для начинающих', 'Иванов И.И.', 2024, 'Программирование', 'beginner'));
    library.saveData();
    updateUI();
}