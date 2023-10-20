import { pathToImageFolder } from '@/constants';
import { GeneralInfoMenu } from '@/telegram-bot/markups';
import TelegramBot from 'node-telegram-bot-api';

export const GeneralInfoPage = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  await bot.sendPhoto(msg.from.id, pathToImageFolder + '2.png', {
    reply_markup: GeneralInfoMenu(),
    caption:
      'Особые экономические зоны классифицируются по нескольким признакам.\n\nПо видам хозяйственной деятельности они могут быть торговыми зонами, промышленно-производственными зонами, технико-внедренческими зонами, сервисными зонами, офшорными зонами и комплексными зонами.\n\nПо степени организации - территориальные, анклавные, открытые, функциональные и территориально-функциональные зоны.\n\nЭти различия позволяют адаптировать ОЭЗ под различные потребности и способствуют развитию экономики в разных регионах.'
  });
};
