import { pathToImageFolder } from '@/constants';
import TelegramBot from 'node-telegram-bot-api';
import { AdministrativeСenterPage } from './Centers/CentersPage';
import { NorthPalaceMenu } from '@/telegram-bot/markups';

export const NorthPalaceInfo = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.includes('Северная площадка')) {
    AdministrativeСenterPage(bot, msg);
    return;
  }

  bot.sendPhoto(msg.chat.id, pathToImageFolder + '12.png', {
    reply_markup: NorthPalaceMenu(),
    caption: 'Инфа про северную площадку!',
    parse_mode: 'HTML'
  });
};
