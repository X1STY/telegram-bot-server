import TelegramBot from 'node-telegram-bot-api';
import { InfoAboutInfrostructure } from '../Infrostructure/InfrostructurePage';
import { GeneralInfoPage } from './GeneralInformation/GeneralInformationPage';
import { SouthPalaceInfo } from '../Infrostructure/SouthPalace/SouthPalacePage';
import { pathToImageFolder } from '@/constants';
import { ExemptionsMenu, ExemptionsPage } from './GeneralInformation/Exemptions/Exemptions';
import { WayToObtainStatusPage } from './GeneralInformation/WayToObtainStatus/WayToObtainsStatus';
import { ServicesAndSupportPage } from './GeneralInformation/ServicesAndSupport/ServicesAndSupport';
import { NorthPalaceInfo } from '../Infrostructure/NorthPalace/NorthPalacePage';

export const InfoPageAboutZone = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text?.startsWith('Узнать об ОЭЗ')) {
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

export const InfoPageMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Общие сведения' };
  const b2: TelegramBot.KeyboardButton = { text: 'Инфраструктура' };
  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1, b2]],
    resize_keyboard: true
  };
  return kb;
};

const b1Click = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.startsWith('Общие сведения')) {
    await ExemptionsPage(bot, msg);
    await ServicesAndSupportPage(bot, msg);
    await WayToObtainStatusPage(bot, msg);
    return;
  }
  await GeneralInfoPage(bot, msg);
};

const b2Click = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text.startsWith('Инфраструктура')) {
    await SouthPalaceInfo(bot, msg);
    await NorthPalaceInfo(bot, msg);
    return;
  }

  await InfoAboutInfrostructure(bot, msg);
};
