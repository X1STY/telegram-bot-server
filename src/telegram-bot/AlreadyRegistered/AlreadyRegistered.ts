import { PrismaClient } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';
import { MainMenu, RegisteredUserMenu } from '../markups';
import { RegisterNewApplication } from './RegisterNewApplication/RegisterNewApplication';
import { findUserById } from '../bot.service';
import { ShowApplicaton } from './ShowApplication/ShowApplication';
import { MyContacts } from './MyContacts/MyContacts';
import { ReplayQuestionCallback } from '../ReplyQuestionCallback';

export const AlreadyRegistered = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  prisma: PrismaClient
) => {
  const user = await findUserById(msg.from.id.toString(), prisma);

  if (msg.text !== 'Я уже резидент') {
    if (user && (user.role === 'RESIDENT' || user.role === 'ADMIN' || user.role === 'SUPPORT')) {
      await RegisterNewApplication(bot, msg, prisma);
      await ShowApplicaton(bot, msg, prisma);
      await MyContacts(bot, msg, prisma);
    }
    return;
  }

  if (user && user.role === 'ORDINARY_USER') {
    await bot.sendMessage(msg.from.id, 'Вы не зарегестрированы! Пройдите регистрацию!', {
      reply_markup: MainMenu()
    });
    return;
  }

  await bot.sendMessage(msg.from.id, 'Введите пароль для авторизации');
  const responseMsg = await ReplayQuestionCallback(bot, msg);

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
