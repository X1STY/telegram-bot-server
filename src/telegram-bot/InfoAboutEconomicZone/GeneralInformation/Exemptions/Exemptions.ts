import { pathToImageFolder } from '@/constants';
import { ExemptionsMenu } from '@/telegram-bot/markups';
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
