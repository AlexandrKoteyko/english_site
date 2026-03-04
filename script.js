// Фільтрація карток за категоріями
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card-item');

    // Функція фільтрації
    function filterCards(category) {
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
    }

    // Додаємо обробники подій для кнопок
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Видаляємо active клас з усіх кнопок
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
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Можна додати додаткову анімацію при наведенні
            const sticker = this.querySelector('.card-sticker');
            if (sticker) {
                sticker.style.transform = 'rotate(15deg) scale(1.1)';
                sticker.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function() {
            const sticker = this.querySelector('.card-sticker');
            if (sticker) {
                sticker.style.transform = 'rotate(8deg) scale(1)';
            }
        });
    });

    // Логування при кліку на посилання
    const links = document.querySelectorAll('.btn-open');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const cardTitle = this.closest('.card-item').querySelector('h3').innerText;
            console.log(`Відкриваємо: ${cardTitle}`);
        });
    });
});

// Функція для пошуку (можна додати потім)
function searchCards(query) {
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
}