import { findUserById } from '@/telegram-bot/bot.service';
import { ChangeUserDataMenu, RegisteredUserMenu } from '@/telegram-bot/markups';
import { ReplayQuestionCallback } from '@/telegram-bot/ReplyQuestionCallback';
import { PrismaClient, User } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';

export const MyContacts = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  prisma: PrismaClient
) => {
  const user = await findUserById(msg.from.id.toString(), prisma);
  if (msg.text === 'Изменить имя') {
    changeUserFullName(bot, msg, user, prisma);
  }
  if (msg.text === 'Изменить контактные данные') {
    changeUserContactData(bot, msg, user, prisma);
  }
  if (msg.text !== 'Мои контакты') {
    return;
  }

  const answer =
    'Ваши данные\nИмя: ' +
    user.registration_form_full_name +
    '\nКонтактные данные: ' +
    user.registration_form_contact_data +
    '\n';

  await bot.sendMessage(msg.from.id, answer, { reply_markup: ChangeUserDataMenu() });
};

const changeUserFullName = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  user: User,
  prisma: PrismaClient
) => {
  await bot.sendMessage(msg.from.id, 'Введите новое имя');
  const responseMsg = await ReplayQuestionCallback(bot, msg);
  await prisma.user.update({
    data: {
      registration_form_full_name: responseMsg.text
    },
    where: {
      id: user.id
    }
  });
  await bot.sendMessage(msg.from.id, 'Успешно изменено!', {
    reply_markup: RegisteredUserMenu(user.role)
  });
};

const changeUserContactData = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  user: User,
  prisma: PrismaClient
) => {
  await bot.sendMessage(msg.from.id, 'Введите новые контактные данные (email или телефон)');
  const responseMsg = await ReplayQuestionCallback(bot, msg);
  await prisma.user.update({
    data: {
      registration_form_contact_data: responseMsg.text
    },
    where: {
      id: user.id
    }
  });
  await bot.sendMessage(msg.from.id, 'Успешно изменено!', {
    reply_markup: RegisteredUserMenu(user.role)
  });
};
