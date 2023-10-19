import { pathToImageFolder } from '@/constants';
import TelegramBot from 'node-telegram-bot-api';

const Menu = (url: string): TelegramBot.InlineKeyboardMarkup => {
  const b1: TelegramBot.InlineKeyboardButton = { text: 'Разместиться', url };
  const kb: TelegramBot.InlineKeyboardMarkup = {
    inline_keyboard: [[b1]]
  };
  return kb;
};
// TODO: don't uderstand type of registration form... Should it be web-app form or questions from bot?
export const INVENTUMPage = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.includes('INVENTUM')) {
    return;
  }

  await bot.sendPhoto(msg.chat.id, pathToImageFolder + '9.png', {
    reply_markup: Menu('INVENTUMurl.ru'),
    caption: 'Инфа про INVENTUM!',
    parse_mode: 'HTML'
  });
};

export const TECHNUMPage = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.includes('TECHNUM')) {
    return;
  }

  await bot.sendPhoto(msg.chat.id, pathToImageFolder + '8.png', {
    reply_markup: Menu('TECHNUM.ru'),
    caption: 'Инфа про TECHNNUM!',
    parse_mode: 'HTML'
  });
};

export const VITUMPage = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.includes('VITUM')) {
    return;
  }

  await bot.sendPhoto(msg.chat.id, pathToImageFolder + '10.png', {
    reply_markup: Menu('VITUM.ru'),
    caption: 'Инфа про VITUM!',
    parse_mode: 'HTML'
  });
};

export const FUTURUMPage = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.includes('FUTURUM')) {
    return;
  }

  await bot.sendPhoto(msg.chat.id, pathToImageFolder + 'v1a.png', {
    reply_markup: Menu('FUTURUM.ru'),
    caption: 'Инфа про FUTURUM!',
    parse_mode: 'HTML'
  });
};

export const EKCPOCENTERPage = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.includes('Экспоцентр')) {
    return;
  }

  await bot.sendPhoto(msg.chat.id, pathToImageFolder + 'v1b.png', {
    reply_markup: Menu('EKCPOCENTER.ru'),
    caption: 'Инфа про Экспоцентр!',
    parse_mode: 'HTML'
  });
};
