import { PrismaClient } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';
import { MainMenu } from '../markups';
import { findUserById } from '../bot.service';
import { ReplayQuestionCallback } from '../ReplyQuestionCallback';

export const BecomeAResident = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  prisma: PrismaClient
) => {
  if (!(msg.text === 'Стать резидентом')) {
    return;
  }
  await registrateResident(bot, msg, prisma);
};

const registrateResident = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  prisma: PrismaClient
) => {
  let user = await findUserById(msg.from.id.toString(), prisma);

  if (user && user.role === 'RESIDENT') {
    await bot.sendMessage(msg.from.id, 'Вы уже зарегестрированы как резидент!', {
      reply_markup: MainMenu()
    });
    return;
  }

  if (!user.registration_form_full_name) {
    await bot.sendMessage(msg.from.id, 'Введите свое имя');
    const responseMsg = await ReplayQuestionCallback(bot, msg);
    await prisma.user.update({
      data: {
        registration_form_full_name: responseMsg.text.toString()
      },
      where: {
        id: user.id
      }
    });
    user = await findUserById(msg.from.id.toString(), prisma);
  }

  if (!user.registration_form_contact_data) {
    await bot.sendMessage(msg.from.id, 'Введите контактные данные(email/номер телефона)');
    const responseMsg = await ReplayQuestionCallback(bot, msg);
    await prisma.user.update({
      data: {
        registration_form_contact_data: responseMsg.text.toString()
      },
      where: {
        id: user.id
      }
    });
    user = await findUserById(msg.from.id.toString(), prisma);
  }

  if (!user.registration_form_password) {
    await bot.sendMessage(msg.from.id, 'Введите желаемый пароль');
    const responseMsg = await ReplayQuestionCallback(bot, msg);
    await prisma.user.update({
      data: {
        registration_form_password: responseMsg.text.toString()
      },
      where: {
        id: user.id
      }
    });
  }

  if (user && user.role !== 'RESIDENT') {
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
