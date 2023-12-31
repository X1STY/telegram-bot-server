import TelegramBot from 'node-telegram-bot-api';
import { GeneralInfoPage } from './GeneralInformation/GeneralInformationPage';
import { SouthPalaceInfo } from './Infrostructure/SouthPalace/SouthPalacePage';
import { pathToImageFolder } from '@/constants';
import { ExemptionsPage } from './GeneralInformation/Exemptions/Exemptions';
import { WayToObtainStatusPage } from './GeneralInformation/WayToObtainStatus/WayToObtainsStatus';
import { ServicesAndSupportPage } from './GeneralInformation/ServicesAndSupport/ServicesAndSupport';
import { NorthPalaceInfo } from './Infrostructure/NorthPalace/NorthPalacePage';
import { InfoPageMenu } from '../markups';
import { InfoAboutInfrostructure } from './Infrostructure/InfrostructurePage';

export const InfoPageAboutZone = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text?.includes('Узнать об ОЭЗ')) {
    await b1Click(bot, msg);
    await b2Click(bot, msg);
    return;
  }
  await bot.sendPhoto(msg.chat.id, pathToImageFolder + '11.png', {
    reply_markup: InfoPageMenu(),
    caption:
      'Особая экономическая зона (ОЭЗ) — это географическая область в стране, где действуют особые правила для привлечения инвестиций и облегчения бизнес-процессов. ОЭЗ обычно предоставляет налоговые льготы, упрощенные процедуры таможенного контроля, а также другие преимущества для предпринимателей. Целью создания ОЭЗ является стимулирование экономического роста, привлечение иностранных инвестиций и создание новых рабочих мест.',
    parse_mode: 'HTML'
  });
};

const b1Click = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.includes('Общие сведения')) {
    await ExemptionsPage(bot, msg);
    await ServicesAndSupportPage(bot, msg);
    await WayToObtainStatusPage(bot, msg);
    return;
  }
  await GeneralInfoPage(bot, msg);
};

const b2Click = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.includes('Инфраструктура')) {
    await SouthPalaceInfo(bot, msg);
    await NorthPalaceInfo(bot, msg);
    return;
  }

  await InfoAboutInfrostructure(bot, msg);
};
