import TelegramBot from 'node-telegram-bot-api';

export const Menu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Северная площадка' };
  const b2: TelegramBot.KeyboardButton = { text: 'Южная площадка' };
  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1, b2]],
    resize_keyboard: true
  };
  return kb;
};

export const InfoAboutInfrostructure = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  await bot.sendMessage(msg.chat.id, 'Есть две площадки: северная и южная!', {
    reply_markup: Menu()
  });
};
