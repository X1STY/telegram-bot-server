import { PrismaClient } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';
import { applicationView } from '../../AlreadyRegistered/ShowApplication/ShowApplication';
import { AdminPanelMenu } from '@/telegram-bot/markups';

export const CheckAppApplications = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  prisma: PrismaClient
) => {
  if (msg.text !== 'Посмотреть все заявки') {
    return;
  }
  const applications = await prisma.application.findMany();
  let message = 's';
  try {
    message = await applicationView(applications, true, prisma);
  } catch (error) {
    console.log(error);
  }
  await bot.sendMessage(msg.from.id, message.length ? message : 'sas', {
    reply_markup: AdminPanelMenu()
  });
};
