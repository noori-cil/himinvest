// api/sendOrder.js
export default async function handler(req, res) {
    // Разрешаем только POST-запросы
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Метод не разрешён' });
    }

    try {
        const { chatId, text } = req.body;
        const botToken = 'AAEq8mVYFMda7oTNaOGvRupXdTaktN9qaDU'; // Ваш токен

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

        res.status(200).json({ ok: true, result: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
