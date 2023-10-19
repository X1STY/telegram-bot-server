import TelegramBot from 'node-telegram-bot-api';
import { InfoAboutInfrostructure } from '../Infrostructure/InfrostructurePage';
import { GeneralInfoPage } from './GeneralInformation/GeneralInformationPage';
import { SouthPalaceInfo } from '../Infrostructure/SouthPalace/SouthPalacePage';
import { pathToImageFolder } from '@/constants';
import { ExemptionsPage } from './GeneralInformation/Exemptions/Exemptions';
import { WayToObtainStatusPage } from './GeneralInformation/WayToObtainStatus/WayToObtainsStatus';
import { ServicesAndSupportPage } from './GeneralInformation/ServicesAndSupport/ServicesAndSupport';
import { NorthPalaceInfo } from '../Infrostructure/NorthPalace/NorthPalacePage';
import { InfoPageMenu } from '../markups';

export const InfoPageAboutZone = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text?.includes('Узнать об ОЭЗ')) {
    await b1Click(bot, msg);
    await b2Click(bot, msg);
    return;
  }
  await bot.sendPhoto(msg.chat.id, pathToImageFolder + '11.png', {
    reply_markup: InfoPageMenu(),
    caption:
      'ОЭЗ — это территория с особым правовым статусом, где налоговые, таможенные и другие правила для бизнеса отличаются от общих правил в стране',
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
