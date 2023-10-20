import { pathToImageFolder } from '@/constants';
import TelegramBot from 'node-telegram-bot-api';

export const WayToObtainStatusPage = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.includes('Путь получения статуса')) {
    return;
  }
  await bot.sendPhoto(msg.from.id, pathToImageFolder + '5.png', {
    caption:
      'Существуют различные пути для получения статуса в особой экономической зоне.\n\nОбычно компании и инвесторы должны подать заявку в специальные организации или органы управления ОЭЗ, предоставив детальные планы своей деятельности, прогнозы по инвестициям, ожидаемые экономические показатели.\n\nПосле рассмотрения заявки и соответствия требованиям ОЭЗ, компания может получить статус резидента ОЭЗ и начать пользоваться всеми льготами и привилегиями, предоставляемыми этой зоной.'
  });
};
