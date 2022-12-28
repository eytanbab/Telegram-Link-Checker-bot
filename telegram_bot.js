const TelegramBot = require('node-telegram-bot-api');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

const telegram_token = process.env.TELEGRAM_TOKEN;
const link_check_token = process.env.LINK_CHECK_TOKEN;

let bot;

bot = new TelegramBot(telegram_token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const url =
    'https://ipqualityscore.com/api/json/url/' +
    link_check_token +
    '/' +
    encodeURIComponent(msg.text);

  const getJSON = async (url) => {
    const response = await fetch(url);
    if (!response.ok)
      // check if response worked (no 404 errors etc...)
      throw new Error(response.statusText);

    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
  };

  console.log('Fetching data...');
  let results = await getJSON(url);
  console.log(results);
  if (results.message === 'Success.') {
    if (results.risk_score >= 85) {
      bot.sendMessage(
        chatId,
        'This site is malicious! We have strong confidence the URL is malicious.'
      );
    } else if (results.risk_score >= 75) {
      bot.sendMessage(
        chatId,
        'This site is suspicious! It has patterns associated with malicious links.'
      );
    } else {
      bot.sendMessage(chatId, 'This site is legitimate and OK to use!');
    }
  } else {
    bot.sendMessage(chatId, 'Bad URL, please re-enter a valid URL.');
  }
});
