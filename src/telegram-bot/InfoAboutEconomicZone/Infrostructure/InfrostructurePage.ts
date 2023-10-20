import { PalacesMenu } from '@/telegram-bot/markups';
import TelegramBot from 'node-telegram-bot-api';

export const InfoAboutInfrostructure = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  await bot.sendMessage(
    msg.chat.id,
    'В нашем городе существует две площадки Особых экономических зон: Южная и Северная.\n\nНа текущий момент южная площадка занята большим количеством предприятий нежеди северная',
    {
      reply_markup: PalacesMenu()
    }
  );
};
