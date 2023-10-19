import { PrismaClient } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';

export const BecomeAResident = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  prisma: PrismaClient
) => {
  if (!(msg.text === 'Стать резидентом')) {
    return;
  }
  registrateResident(bot, msg, prisma);
};

const registrateResident = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  prisma: PrismaClient
) => {
  let user = await prisma.user.findFirst({
    where: {
      telegramId: msg.from.id.toString()
    }
  });

  if (user.role === 'RESIDENT') {
    await bot.sendMessage(msg.from.id, 'Вы уже зарегестрированы как резидент!', {
      reply_markup: MainMenu()
    });
    return;
  }

  if (!user.registration_form_full_name) {
    await bot.sendMessage(msg.from.id, 'Введите свое имя');
    const responseMsg = await new Promise<TelegramBot.Message>((resolve) => {
      bot.once('message', resolve);
    });
    await prisma.user.update({
      data: {
        registration_form_full_name: responseMsg.text.toString()
      },
      where: {
        id: user.id
      }
    });
    user = await prisma.user.findFirst({
      where: {
        telegramId: msg.from.id.toString()
      }
    });
  }

  if (!user.registration_form_contact_data) {
    await bot.sendMessage(msg.from.id, 'Введите контактные данные(email/номер телефона)');
    const responseMsg = await new Promise<TelegramBot.Message>((resolve) => {
      bot.once('message', resolve);
    });
    await prisma.user.update({
      data: {
        registration_form_contact_data: responseMsg.text.toString()
      },
      where: {
        id: user.id
      }
    });
    user = await prisma.user.findFirst({
      where: {
        telegramId: msg.from.id.toString()
      }
    });
  }

  if (!user.registration_form_password) {
    await bot.sendMessage(msg.from.id, 'Введите желаемый пароль');
    const responseMsg = await new Promise<TelegramBot.Message>((resolve) => {
      bot.once('message', resolve);
    });
    await prisma.user.update({
      data: {
        registration_form_password: responseMsg.text.toString()
      },
      where: {
        id: user.id
      }
    });
  }

  if (user.role !== 'RESIDENT') {
    await prisma.user.update({
      data: {
        role: 'RESIDENT'
      },
      where: {
        id: user.id
      }
    });
  }

  await bot.sendMessage(
    msg.from.id,
    'Поздравляю, Вы успешно зарегестрировались! Теперь вы можете перейти в меню для резидентов!',
    {
      reply_markup: MainMenu()
    }
  );
};

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
