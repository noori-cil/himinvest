// api/sendOrder.js
export default async function handler(req, res) {
    // 1. Разрешаем только POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Метод не разрешён' });
    }

    // 2. Добавляем CORS заголовки
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 3. Обрабатываем preflight (OPTIONS)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { chatId, text } = req.body;

        // ПРОВЕРКА: есть ли данные
        if (!chatId || !text) {
            return res.status(400).json({ error: 'Не хватает данных' });
        }

        const botToken = 'AAEq8mVYFMda7oTNaOGvRupXdTaktN9qaDU';

        // Отправляем в Telegram
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

        return res.status(200).json({ ok: true, result: data });
    } catch (error) {
        console.error('Ошибка:', error);
        return res.status(500).json({ error: error.message });
    }
}
