import { pathToImageFolder } from '@/constants';
import TelegramBot from 'node-telegram-bot-api';
import {
  EKCPOCENTERPage,
  FUTURUMPage,
  INVENTUMPage,
  TECHNUMPage,
  VITUMPage
} from './Centers/CentersPage';

const SouthPalaceMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Центр инноваций и технологий INVENTUM' };
  const b2: TelegramBot.KeyboardButton = { text: 'Инженерный центр TECHNUM' };
  const b3: TelegramBot.KeyboardButton = { text: 'Научно-внедренческий центр VITUM' };
  const b4: TelegramBot.KeyboardButton = { text: 'Инжиниронговый центр FUTURUM' };
  const b5: TelegramBot.KeyboardButton = { text: 'Экспоцентр' };

  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1, b2], [b3, b4], [b5]],
    resize_keyboard: true
  };
  return kb;
};

export const SouthPalaceInfo = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.startsWith('Южная')) {
    INVENTUMPage(bot, msg);
    TECHNUMPage(bot, msg);
    VITUMPage(bot, msg);
    FUTURUMPage(bot, msg);
    EKCPOCENTERPage(bot, msg);
    return;
  }

  bot.sendPhoto(msg.chat.id, pathToImageFolder + '13.png', {
    reply_markup: SouthPalaceMenu(),
    caption: 'Инфа про южную площадку!',
    parse_mode: 'HTML'
  });
};
