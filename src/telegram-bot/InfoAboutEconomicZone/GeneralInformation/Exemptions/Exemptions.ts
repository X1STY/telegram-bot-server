import { pathToImageFolder } from '@/constants';
import TelegramBot from 'node-telegram-bot-api';

export const ExemptionsPage = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.includes('Льготы')) {
    return;
  }
  await bot.sendPhoto(msg.from.id, pathToImageFolder + '4.png', {
    reply_markup: ExemptionsMenu(),
    caption: 'Тут общие сведения'
  });
};

export const ExemptionsMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Стать Резидентом' };
  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1]],
    resize_keyboard: true
  };
  return kb;
};
