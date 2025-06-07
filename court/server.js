require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_IDS = process.env.TELEGRAM_CHAT_IDS ? process.env.TELEGRAM_CHAT_IDS.split(',') : [];

app.use(cors({
  origin: 'https://court-9m2r.onrender.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

app.options('/submit', cors());

const SUBMISSIONS_FILE = './submissions.json';

if (!fs.existsSync(SUBMISSIONS_FILE)) {
  fs.writeFileSync(SUBMISSIONS_FILE, '[]', 'utf8');
}

function generateCaseNumber() {
  return 'CASE-' + Math.floor(100000 + Math.random() * 900000);
}

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

app.get('/', (req, res) => {
  res.send('Сервер працює! Вітаю!');
});

app.post('/submit', async (req, res) => {
  console.log('Отримано заявку:', req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Всі поля (ім\'я, email, текст заяви) обов\'язкові.' });
  }

  let submissions = [];
  try {
    const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
    submissions = JSON.parse(data);
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

  for (const chatId of TELEGRAM_CHAT_IDS) {
    await sendTelegramMessage(chatId, telegramText);
  }

  res.json({ caseNumber, message: 'Заяву прийнято!' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
