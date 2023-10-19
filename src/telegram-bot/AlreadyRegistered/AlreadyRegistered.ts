import { PrismaClient } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';
import { MainMenu, RegisteredUserMenu } from '../markups';
import { RegisterNewApplication } from './RegisterNewApplication/RegisterNewApplication';
import { findUserById } from '../bot.service';
import { ShowApplicaton } from './ShowApplication/ShowApplication';
import { MyContacts } from './MyContacts/MyContacts';

export const AlreadyRegistered = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  prisma: PrismaClient
) => {
  const user = await findUserById(msg.from.id.toString(), prisma);

  if (msg.text !== 'Я уже резидент') {
    if (user.role === 'RESIDENT') {
      RegisterNewApplication(bot, msg, prisma);
      ShowApplicaton(bot, msg, prisma);
      MyContacts(bot, msg, prisma);
    }
    return;
  }

  if (user.role === 'ORDINARY_USER') {
    await bot.sendMessage(msg.from.id, 'Вы не зарегестрированы! Пройдите регистрацию!', {
      reply_markup: MainMenu()
    });
    return;
  }

  await bot.sendMessage(msg.from.id, 'Введите пароль для авторизации');
  const responseMsg = await new Promise<TelegramBot.Message>((resolve) => {
    bot.once('message', resolve);
  });
  if (!(user.registration_form_password === responseMsg.text)) {
    bot.sendMessage(msg.from.id, 'Неверный пароль!', {
      reply_markup: MainMenu()
    });
    return;
  }

  await bot.sendMessage(msg.from.id, 'Вы авторизированы!', {
    reply_markup: RegisteredUserMenu(user.role)
  });
};
