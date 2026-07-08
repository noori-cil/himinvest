// ================================
// Современный script.js (улучшенная версия)
// ================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Мобильное меню
    // ==========================


    // ==========================
    // Плавная прокрутка
    // ==========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            
            // Пропускаем ссылки только с "#"
            if (targetId === "#") return;
            
            const section = document.querySelector(targetId);

            if (section) {
                e.preventDefault();
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // ==========================
    // Кнопка вверх
    // ==========================
    const upButton = document.getElementById("up");

    if (upButton) {
        // Используем throttle для оптимизации производительности
        let isScrolling = false;
        
        window.addEventListener("scroll", () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 300) {
                        upButton.classList.add("show");
                    } else {
                        upButton.classList.remove("show");
                    }
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });

        upButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ==========================
    // Анимация карточек
    // ==========================
    const cards = document.querySelectorAll(".card");

    if (cards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    // Опционально: отключаем наблюдение после появления
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px" // Небольшой отступ для более плавной анимации
        });

        cards.forEach(card => {
            observer.observe(card);
        });
    }

    // ==========================
    // Форма обратной связи
    // ==========================
    const form = document.querySelector("#contactForm");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameInput = form.querySelector("#name");
            const emailInput = form.querySelector("#email");
            const messageInput = form.querySelector("#message");

            // Проверка на существование полей
            if (!nameInput || !emailInput || !messageInput) {
                console.error("Не найдены поля формы");
                return;
            }

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // Исправлено: добавлены правильные логические операторы
            if (name === "" || email === "" || message === "") {
                alert("Пожалуйста, заполните все поля.");
                return;
            }

            // Простая валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Пожалуйста, введите корректный email адрес.");
                return;
            }

            // Здесь можно отправить данные на сервер
            console.log("Данные формы:", { name, email, message });

            alert("Спасибо! Ваше сообщение отправлено.");
            form.reset();

            // Убираем классы ошибок, если они есть
            form.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
        });

        // Валидация на ввод (опционально)
        form.querySelectorAll("input, textarea").forEach(input => {
            input.addEventListener("blur", function() {
                if (this.value.trim() === "") {
                    this.classList.add("error");
                } else {
                    this.classList.remove("error");
                }
            });
        });
    }

    // ==========================
    // Дополнительно: анимация при загрузке
    // ==========================
    // Добавляем класс для плавного появления страницы
    document.body.classList.add("loaded");

});

// ==========================
// Полифиллы для старых браузеров (опционально)
// ==========================
// Для IE11 и других старых браузеров
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}
function openModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Закрытие при клике вне окна
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Закрытие по ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// ================================
// TELEGRAM БОТ (НАСТРОЙКИ)
// ================================
const BOT_TOKEN = 'AAEq8mVYFMda7oTNaOGvRupXdTaktN9qaDU';
const CHAT_ID = '8616159438';

// ================================
// ФОРМА ЗАКАЗА (ОТПРАВКА В TELEGRAM ЧЕРЕЗ NETLIFY)
// ================================
const orderForm = document.getElementById('orderForm');

if (orderForm) {
    orderForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // СБОР ДАННЫХ
        const name = document.getElementById('order-name').value.trim();
        const phone = document.getElementById('order-phone').value.trim();
        const email = document.getElementById('order-email').value.trim();
        const quantity = document.getElementById('order-quantity').value.trim();
        const comment = document.getElementById('order-comment').value.trim();
        const product = document.querySelector('.modal-product')?.textContent || 'Товар';

        // ПРОВЕРКА
        if (name === '' || phone === '') {
            alert('Пожалуйста, заполните имя и телефон.');
            return;
        }

        // ФОРМИРУЕМ СООБЩЕНИЕ
        const message = `📦 НОВЫЙ ЗАКАЗ!\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📧 Email: ${email || 'Не указан'}\n📦 Товар: ${product}\n📦 Количество: ${quantity} кг\n💬 Комментарий: ${comment || 'Нет'}\n\n⏰ ${new Date().toLocaleString('ru-RU')}`;

        try {
            // ОТПРАВЛЯЕМ ЗАПРОС НА NETLIFY ФУНКЦИЮ
            const response = await fetch('/.netlify/functions/sendOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatId: CHAT_ID,
                    text: message,
                }),
            });

            const result = await response.json();

            if (response.ok && result.ok) {
                alert('✅ Заказ отправлен! Мы свяжемся с вами.');
                orderForm.reset();
                closeModal();
            } else {
                throw new Error(result.error || 'Неизвестная ошибка');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('❌ Ошибка при отправке заказа. Попробуйте позже.');
        }
    });
}