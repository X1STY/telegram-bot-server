import { PalacesMenu } from '@/telegram-bot/markups';
import TelegramBot from 'node-telegram-bot-api';

export const InfoAboutInfrostructure = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  await bot.sendMessage(msg.chat.id, 'Есть две площадки: северная и южная!', {
    reply_markup: PalacesMenu()
  });
};
