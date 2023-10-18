import { pathToImageFolder } from '@/constants';
import TelegramBot from 'node-telegram-bot-api';

export const ServicesAndSupportPage = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.includes('поддержка')) {
    return;
  }
  await bot.sendPhoto(msg.from.id, pathToImageFolder + '3.png', {
    caption: `Тут контакты поддержки наверное\n Разработчик прототипа: @x1sty`
  });
};
