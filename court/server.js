const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Токен бота і chat_id адмінів в Telegram
const TELEGRAM_BOT_TOKEN = '7590317507:AAERDeVjAvfNfxAmnFiK-8iFsc5TyPoPnAE';
const TELEGRAM_CHAT_IDS = ['7286830883', '1731530720'];

app.use(cors());
app.use(bodyParser.json());

// Шлях до файлу з заявами
const SUBMISSIONS_FILE = './submissions.json';

// Функція для генерації унікального номеру справи
function generateCaseNumber() {
  return 'CASE-' + Math.floor(100000 + Math.random() * 900000);
}

// Відправка повідомлення в Telegram
async function sendTelegramMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    await axios.post(url, {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML'
    });
  } catch (error) {
    console.error('Помилка надсилання в Telegram:', error.message);
  }
}

app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Всі поля (ім\'я, email, текст заяви) обов\'язкові.' });
  }

  let submissions = [];
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
      submissions = JSON.parse(data);
    }
  } catch (err) {
    console.error('Помилка читання файлу:', err);
  }

  const caseNumber = generateCaseNumber();
  const newSubmission = {
    caseNumber,
    name,
    email,
    message,
    submittedAt: new Date().toISOString()
  };

  submissions.push(newSubmission);

  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
  } catch (err) {
    console.error('Помилка запису файлу:', err);
    return res.status(500).json({ error: 'Помилка серверу при збереженні заяви.' });
  }

  const telegramText = `<b>Нова заява до суду</b>\n` +
                       `Номер справи: <b>${caseNumber}</b>\n` +
                       `Ім'я: ${name}\n` +
                       `Email: ${email}\n` +
                       `Текст:\n${message}`;

  // Надіслати повідомлення кожному адміну
  for (const chatId of TELEGRAM_CHAT_IDS) {
    await sendTelegramMessage(chatId, telegramText);
  }

  res.json({ caseNumber, message: 'Заяву прийнято!' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
