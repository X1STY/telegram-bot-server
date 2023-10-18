import TelegramBot from 'node-telegram-bot-api';

export const InfoPageAboutZone = (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text?.startsWith('Узнать об ОЭЗ')) {
    b1Click(bot, msg);
    b2Click(bot, msg);
    return;
  }
  bot.sendMessage(
    msg.chat.id,
    'ОЭЗ — это территория с особым правовым статусом, где налоговые, таможенные и другие правила для бизнеса отличаются от общих правил в стране',
    {
      reply_markup: InfoPageMenu()
    }
  );
};

export const InfoPageMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Общие сведения' };
  const b2: TelegramBot.KeyboardButton = { text: 'Инфраструктура' };
  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1, b2]],
    resize_keyboard: true
  };
  return kb;
};

const b1Click = (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.startsWith('Общие сведения')) {
    return;
  }
  bot.sendMessage(msg.chat.id, 'Тут общие сведения');
};

const b2Click = (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.startsWith('Инфраструктура')) {
    return;
  }
  bot.sendMessage(msg.chat.id, 'Тут Инфраструктура');
};
