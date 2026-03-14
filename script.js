// Масив з інформацією про файли (можна автоматично оновлювати через PHP або API)
// Але оскільки це статичний HTML, ми зберігаємо інформацію тут
// При появі нових файлів, їх потрібно додати в цей масив

const filesData = [
    {
        filename: "was_were_grade3 (1).html",
        title: "Was & Were",
        desc: "Вчимо минулий час дієслова to be. Історії, вибір, пазли.",
        icon: "fa-dragon",
        sticker: "🐘",
        categories: ["waswere", "grade3"],
        badges: ["Past", "was/were", "3 клас"]
    },
    {
        filename: "past_simple_regular.html",
        title: "Past Simple",
        sub: "regular",
        desc: "+ed, подвоєння, y→ied. Завдання з вибором та написанням.",
        icon: "fa-clock",
        sticker: "🦖",
        categories: ["past", "grade3"],
        badges: ["-ed", "правильні", "3 клас"]
    },
    {
        filename: "past_simple_ua_grade3.html",
        title: "Past Simple",
        sub: "пояснення UA",
        desc: "Правила, приклади, слова-підказки — усе рідною мовою.",
        icon: "fa-language",
        sticker: "📘",
        categories: ["past", "grade3"],
        badges: ["пояснення", "довідник", "3 клас"]
    },
    {
        filename: "present_simple_game.html",
        title: "Present Simple",
        desc: "Теперішній час: ствердження, заперечення, перетягуй слова!",
        icon: "fa-heart",
        sticker: "🐼",
        categories: ["present", "grade3"],
        badges: ["I/you/we/they", "he/she/it +s", "3 клас"]
    },
    {
        filename: "post_category.html",
        title: "Блог · Категорії",
        desc: "Шаблон для додавання постів з програмування, творчості, ігор.",
        icon: "fa-blog",
        sticker: "📝",
        categories: ["extra"],
        badges: ["Jinja", "Flask", "шаблон"]
    },
    {
        filename: "a_an_grade2_comicsans (1).html",
        title: "A or AN?",
        desc: "Артиклі з їжею. Правила, картинки, сортування для 2 класу.",
        icon: "fa-apple-alt",
        sticker: "🍎",
        categories: ["grade2", "present"],
        badges: ["a/an", "їжа", "2 клас"]
    },
    {
        filename: "pp_vs_ps_interactive_grade5.html",
        title: "Present Perfect",
        sub: "vs Past Simple",
        desc: "Порівняння часів, текст про мандрівника, інтерактивні завдання.",
        icon: "fa-globe",
        sticker: "🌍",
        categories: ["grade5", "past", "present"],
        badges: ["Present Perfect", "Past Simple", "5 клас"]
    }
];

// Функція для оновлення списку файлів
function refreshFiles() {
    const container = document.getElementById('cardsContainer');
    
    // Показуємо завантаження
    container.innerHTML = `
        <div class="loading-card">
            <i class="fas fa-sync-alt"></i>
            <h3>Оновлення списку файлів...</h3>
        </div>
    `;
    
    // Імітуємо завантаження (в реальному проекті тут буде запит до сервера)
    setTimeout(() => {
        renderCards(filesData);
        updateLastUpdate();
    }, 800);
}

// Функція для рендерингу карток
function renderCards(files) {
    const container = document.getElementById('cardsContainer');
    
    if (!files || files.length === 0) {
        container.innerHTML = `
            <div class="error-card">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Файли не знайдено</h3>
                <p>Перевірте наявність папки Eng_template_files/</p>
            </div>
        `;
        return;
    }
    
    // Сортуємо файли за назвою
    const sortedFiles = [...files].sort((a, b) => a.title.localeCompare(b.title));
    
    container.innerHTML = sortedFiles.map(file => {
        const subHtml = file.sub ? `<br><small>${file.sub}</small>` : '';
        const badgesHtml = file.badges.map(badge => 
            `<span class="badge-cat">${badge}</span>`
        ).join('');
        
        return `
        <div class="card-item" data-category="${file.categories.join(' ')}">
            <div class="card-sticker">${file.sticker}</div>
            <div class="card-icon"><i class="fas ${file.icon}"></i></div>
            <h3>${file.title}${subHtml}</h3>
            <div class="card-desc">${file.desc}</div>
            <div class="badge-grp">
                ${badgesHtml}
            </div>
            <a href="./Eng_template_files/${file.filename}" class="btn-open" target="_blank">
                <i class="fas fa-gamepad"></i> Відкрити
            </a>
        </div>
    `}).join('');
    
    // Оновлюємо лічильник
    updateFileCount(sortedFiles.length);
}

// Функція для оновлення часу останнього оновлення
function updateLastUpdate() {
    const now = new Date();
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const dateStr = now.toLocaleString('uk-UA', options);
    document.getElementById('lastUpdate').innerHTML = 
        `<i class="far fa-clock"></i> Оновлено: ${dateStr}`;
}

// Функція для оновлення лічильника файлів
function updateFileCount(count) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === 'all') {
            const span = document.createElement('span');
            span.className = 'file-count';
            span.textContent = count;
            btn.appendChild(span);
        }
    });
}

// Фільтрація карток
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn:not(.refresh-btn)');
    
    // Початковий рендеринг
    renderCards(filesData);
    updateLastUpdate();
    
    // Функція фільтрації
    function filterCards(category) {
        const cards = document.querySelectorAll('.card-item');
        
        cards.forEach(card => {
            const catAttr = card.getAttribute('data-category') || '';
            
            if (category === 'all') {
                card.style.display = 'flex';
            } else {
                const cats = catAttr.split(' ');
                if (cats.includes(category)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            }
        });
        
        // Показуємо кількість видимих карток
        const visibleCount = document.querySelectorAll('.card-item[style="display: flex;"]').length;
        console.log(`Показано ${visibleCount} карток`);
    }

    // Додаємо обробники подій для кнопок
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Видаляємо active клас з усіх кнопок (крім refresh)
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Додаємо active клас до натиснутої кнопки
            this.classList.add('active');
            
            // Отримуємо категорію з data-filter атрибута
            const category = this.getAttribute('data-filter');
            
            // Фільтруємо картки
            filterCards(category);
        });
    });

    // Додаткові ефекти для карток
    document.addEventListener('mouseenter', function(e) {
        if (e.target.closest('.card-item')) {
            const sticker = e.target.closest('.card-item').querySelector('.card-sticker');
            if (sticker) {
                sticker.style.transform = 'rotate(15deg) scale(1.1)';
                sticker.style.transition = 'transform 0.3s ease';
            }
        }
    }, true);

    document.addEventListener('mouseleave', function(e) {
        if (e.target.closest('.card-item')) {
            const sticker = e.target.closest('.card-item').querySelector('.card-sticker');
            if (sticker) {
                sticker.style.transform = 'rotate(8deg) scale(1)';
            }
        }
    }, true);

    // Логування при кліку на посилання
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-open')) {
            const card = e.target.closest('.card-item');
            const cardTitle = card.querySelector('h3').innerText;
            console.log(`Відкриваємо: ${cardTitle}`);
        }
    });
});

// Функція для пошуку (можна додати потім)
function searchFiles(query) {
    const cards = document.querySelectorAll('.card-item');
    const searchTerm = query.toLowerCase().trim();

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const desc = card.querySelector('.card-desc').innerText.toLowerCase();
        
        if (title.includes(searchTerm) || desc.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Скидаємо активні фільтри
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
}

// Автоматичне оновлення списку при завантаженні сторінки
window.addEventListener('load', function() {
    console.log('Головна сторінка завантажена');
    console.log(`Знайдено ${filesData.length} файлів у папці Eng_template_files/`);
});