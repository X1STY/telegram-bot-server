import { pathToImageFolder } from '@/constants';
import TelegramBot from 'node-telegram-bot-api';
import {
  EKCPOCENTERPage,
  FUTURUMPage,
  INVENTUMPage,
  TECHNUMPage,
  VITUMPage
} from './Centers/CentersPage';
import { SouthPalaceMenu } from '@/telegram-bot/markups';

export const SouthPalaceInfo = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.includes('Южная площадка')) {
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
