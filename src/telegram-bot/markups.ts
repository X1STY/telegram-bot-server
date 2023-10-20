import { Role } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';

export const MainMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Узнать об ОЭЗ' };
  const b2: TelegramBot.KeyboardButton = { text: 'Стать резидентом' };
  const b3: TelegramBot.KeyboardButton = { text: 'Я уже резидент' };
  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1, b2, b3]],
    resize_keyboard: true
  };
  return kb;
};

export const InfoPageMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Общие сведения' };
  const b2: TelegramBot.KeyboardButton = { text: 'Инфраструктура' };
  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1, b2], [backButton]],
    resize_keyboard: true
  };
  return kb;
};

export const GeneralInfoMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Сервисы и поддержка' };
  const b2: TelegramBot.KeyboardButton = { text: 'Льготы' };
  const b3: TelegramBot.KeyboardButton = { text: 'Путь получения статуса' };
  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1, b2, b3], [backButton]],
    resize_keyboard: true
  };
  return kb;
};

export const ExemptionsMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Стать резидентом' };
  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1], [backButton]],
    resize_keyboard: true
  };
  return kb;
};

export const PalacesMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Северная площадка' };
  const b2: TelegramBot.KeyboardButton = { text: 'Южная площадка' };
  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1, b2], [backButton]],
    resize_keyboard: true
  };
  return kb;
};

export const NorthPalaceMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Административный корпус' };

  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1], [backButton]],
    resize_keyboard: true
  };
  return kb;
};

export const SouthPalaceMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Центр инноваций и технологий INVENTUM' };
  const b2: TelegramBot.KeyboardButton = { text: 'Инженерный центр TECHNUM' };
  const b3: TelegramBot.KeyboardButton = { text: 'Научно-внедренческий центр VITUM' };
  const b4: TelegramBot.KeyboardButton = { text: 'Инжиниронговый центр FUTURUM' };
  const b5: TelegramBot.KeyboardButton = { text: 'Экспоцентр' };

  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1, b2], [b3, b4], [b5], [backButton]],
    resize_keyboard: true
  };
  return kb;
};

export const RegisteredUserMenu = (userRole: Role): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Мои заявки' };
  // const b2: TelegramBot.KeyboardButton = { text: 'Мои контакты' };
  // const b3: TelegramBot.KeyboardButton = { text: 'Сообщить о проблеме' };
  // const b4: TelegramBot.KeyboardButton = { text: 'Рационализаторское предложение' };
  const b5: TelegramBot.KeyboardButton = { text: 'Мои контакты' };
  const b7: TelegramBot.KeyboardButton = { text: 'Забронировать конференц зал / переговорку' };

  const buttons: TelegramBot.KeyboardButton[][] = [[b1], [b5]];

  if (userRole === 'RESIDENT') {
    buttons.push([b7]);
  }
  buttons.push([backButton]);

  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: buttons,
    resize_keyboard: true
  };
  return kb;
};
export const backButton: TelegramBot.KeyboardButton = { text: 'В начало' };

export const ChangeUserDataMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Изменить имя' };
  const b2: TelegramBot.KeyboardButton = { text: 'Изменить контактные данные' };

  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1], [b2], [backButton]],
    resize_keyboard: true
  };
  return kb;
};

export const AdminPanelMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Рассылка сообщения' };
  const b2: TelegramBot.KeyboardButton = { text: 'Посмотреть все заявки' };

  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1], [b2], [backButton]],
    resize_keyboard: true
  };
  return kb;
};
