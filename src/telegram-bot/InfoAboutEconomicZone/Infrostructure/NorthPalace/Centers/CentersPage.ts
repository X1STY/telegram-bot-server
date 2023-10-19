import { pathToImageFolder } from '@/constants';
import TelegramBot from 'node-telegram-bot-api';

export const AdministrativeСenterPage = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.includes('Административный корпус')) {
    return;
  }

  await bot.sendPhoto(msg.from.id, pathToImageFolder + 'v2a.png', {
    caption: 'Информация об администривном корпусе'
  });
};
