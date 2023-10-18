import { pathToImageFolder } from '@/constants';
import TelegramBot from 'node-telegram-bot-api';

export const GeneralInfoPage = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  await bot.sendPhoto(msg.from.id, pathToImageFolder + '2.png', {
    reply_markup: GeneralInfoMenu(),
    caption: 'Тут общие сведения'
  });
};

export const GeneralInfoMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Сервисы и поддержка' };
  const b2: TelegramBot.KeyboardButton = { text: 'Льготы' };
  const b3: TelegramBot.KeyboardButton = { text: 'Путь получения статуса' };
  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1, b2, b3]],
    resize_keyboard: true
  };
  return kb;
};
