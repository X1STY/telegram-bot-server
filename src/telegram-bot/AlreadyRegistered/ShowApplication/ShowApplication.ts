import { findUserById } from '@/telegram-bot/bot.service';
import { RegisteredUserMenu } from '@/telegram-bot/markups';
import { Application, PrismaClient } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';

export const ShowApplicaton = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  prisma: PrismaClient
) => {
  if (msg.text !== 'Мои заявки') {
    return;
  }
  const user = await findUserById(msg.from.id.toString(), prisma);

  const applications = await prisma.application.findMany({
    where: {
      author_telegram_id: msg.from.id.toString()
    }
  });

  const message = await applicationView(applications, false, prisma);
  await bot.sendMessage(msg.from.id, message, {
    reply_markup: RegisteredUserMenu(user.role)
  });
};

export const applicationView = async (
  applications: Application[],
  withAuthor: boolean,
  prisma: PrismaClient
): Promise<string> => {
  if (!applications.length) {
    return 'У вас нет заявок';
  }
  let answer = '';
  for (const application of applications) {
    const user = await findUserById(application.author_telegram_id, prisma);
    answer +=
      'Заявка номер: ' +
      application.application_id +
      (withAuthor ? '\nАвтор заявки: @' + user.username : '') +
      '\nБронирование переговорки по номеру: ' +
      application.meeting_room_number +
      '\nНа время: ' +
      application.booking_time.toLocaleDateString() +
      ' ' +
      application.booking_time.toLocaleTimeString() +
      '\nСтатус заявки: ' +
      (application.status ?? 'В обработке') +
      '\n\n';
  }
  return answer;
};
