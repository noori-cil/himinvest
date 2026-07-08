exports.handler = async (event) => {
    // 1. Разрешаем запросы только с вашего сайта (для безопасности)
    const allowedOrigin = 'https://ooohiminvest.netlify.app';
    const origin = event.headers.origin;

    if (origin !== allowedOrigin) {
        return {
            statusCode: 403,
            body: JSON.stringify({ error: 'Forbidden' }),
        };
    }

    // 2. Проверяем метод запроса
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    try {
        // 3. Получаем данные из запроса
        const { chatId, text } = JSON.parse(event.body);
        const botToken = 'AAEq8mVYFMda7oTNaOGvRupXdTaktN9qaDU'; // ВАШ ТОКЕН

        // 4. Отправляем сообщение в Telegram
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML',
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.description || 'Ошибка отправки в Telegram');
        }

        // 5. Возвращаем успешный ответ
        return {
            statusCode: 200,
            body: JSON.stringify({ ok: true, result: data }),
        };
    } catch (error) {
        console.error('Error in function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};