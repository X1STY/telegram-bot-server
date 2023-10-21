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
    await INVENTUMPage(bot, msg);
    await TECHNUMPage(bot, msg);
    await VITUMPage(bot, msg);
    await FUTURUMPage(bot, msg);
    await EKCPOCENTERPage(bot, msg);
    return;
  }

  bot.sendPhoto(msg.chat.id, pathToImageFolder + '13.png', {
    reply_markup: SouthPalaceMenu(),
    caption: 'Инфа про южную площадку!',
    parse_mode: 'HTML'
  });
};
