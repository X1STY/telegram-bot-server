import { pathToImageFolder } from '@/constants';
import TelegramBot from 'node-telegram-bot-api';

export const WayToObtainStatusPage = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.includes('Путь получения статуса')) {
    return;
  }
  await bot.sendPhoto(msg.from.id, pathToImageFolder + '5.png', {
    caption: 'Тут информация про пути получения статуса'
  });
};
