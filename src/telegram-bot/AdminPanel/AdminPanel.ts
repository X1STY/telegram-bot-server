import { PrismaClient } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';
import { AdminPanelMenu, MainMenu } from '../markups';
import { SendMessageToAllUsers } from './SendMessageToAllUsers/SendMessageToAllUsers';
import { CheckAppApplications } from './CheckAppApplications/CheckAppApplications';
import { findUserById } from '../bot.service';

export const AdminPanel = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  prisma: PrismaClient
) => {
  const user = await findUserById(msg.from.id.toString(), prisma);

  if (msg.text === '/admin') {
    if (user && user.role !== 'ADMIN') {
      registerUserAsAdmin(bot, msg, prisma);
    } else {
      await bot.sendMessage(msg.from.id, 'Вы авторизированы как администратор', {
        reply_markup: AdminPanelMenu()
      });
    }
  }
  if (user.role === 'ADMIN') {
    await SendMessageToAllUsers(bot, msg, prisma);
    await CheckAppApplications(bot, msg, prisma);
  }
};

const registerUserAsAdmin = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  prisma: PrismaClient
) => {
  await bot.sendMessage(msg.from.id, 'Введите пароль доступа в админ панель');
  const responseMsg = await new Promise<TelegramBot.Message>((resolve) => {
    bot.once('message', resolve);
  });

  if (responseMsg.text !== process.env.ADMIN_PASSWORD) {
    await bot.sendMessage(msg.from.id, 'Неверный пароль!', {
      reply_markup: MainMenu()
    });
    return;
  }

  await bot.sendMessage(msg.from.id, 'Успешная авторизация!', {
    reply_markup: AdminPanelMenu()
  });

  await prisma.user.update({
    data: {
      role: 'ADMIN'
    },
    where: {
      telegramId: msg.from.id.toString()
    }
  });
};
