import { pathToImageFolder } from '@/constants';
import { ExemptionsMenu } from '@/telegram-bot/markups';
import TelegramBot from 'node-telegram-bot-api';

export const ExemptionsPage = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.includes('Льготы')) {
    return;
  }
  await bot.sendPhoto(msg.from.id, pathToImageFolder + '4.png', {
    reply_markup: ExemptionsMenu(),
    caption:
      'Особые экономические зоны предоставляют ряд привилегий и льгот для привлечения инвестиций и стимулирования экономического развития\n\nОни включают в себя такие преимущества, как освобождение от налогов, упрощенные таможенные процедуры, субсидии на аренду земли, инфраструктурную поддержку, льготы по трудовым отношениям, а также упрощенные процедуры лицензирования.\n\nЭти меры направлены на содействие развитию бизнеса, привлечению иностранных инвестиций и стимулированию экономического роста в регионе ОЭЗ.'
  });
};
