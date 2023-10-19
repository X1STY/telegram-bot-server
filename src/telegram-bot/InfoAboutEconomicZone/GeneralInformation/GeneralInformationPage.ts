import { pathToImageFolder } from '@/constants';
import { GeneralInfoMenu } from '@/telegram-bot/markups';
import TelegramBot from 'node-telegram-bot-api';

export const GeneralInfoPage = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  await bot.sendPhoto(msg.from.id, pathToImageFolder + '2.png', {
    reply_markup: GeneralInfoMenu(),
    caption: 'Тут общие сведения'
  });
};
