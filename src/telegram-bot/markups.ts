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
    keyboard: [[b1, b2]],
    resize_keyboard: true
  };
  return kb;
};

export const GeneralInfoMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Сервисы и поддержка' };
  const b2: TelegramBot.KeyboardButton = { text: 'Льготы' };
  const b3: TelegramBot.KeyboardButton = { text: 'Путь получения статуса' };
  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1, b2, b3]],
    resize_keyboard: true
  };
  return kb;
};

export const ExemptionsMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Стать резидентом' };
  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1]],
    resize_keyboard: true
  };
  return kb;
};

export const PalacesMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Северная площадка' };
  const b2: TelegramBot.KeyboardButton = { text: 'Южная площадка' };
  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1, b2]],
    resize_keyboard: true
  };
  return kb;
};

export const NorthPalaceMenu = (): TelegramBot.ReplyKeyboardMarkup => {
  const b1: TelegramBot.KeyboardButton = { text: 'Административный корпус' };

  const kb: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [[b1]],
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
    keyboard: [[b1, b2], [b3, b4], [b5]],
    resize_keyboard: true
  };
  return kb;
};
