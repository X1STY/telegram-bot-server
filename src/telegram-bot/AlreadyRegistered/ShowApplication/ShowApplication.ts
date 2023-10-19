import { findUserById } from '@/telegram-bot/bot.service';
import { RegisteredUserMenu } from '@/telegram-bot/markups';
import { PrismaClient } from '@prisma/client';
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

  if (!applications.length) {
    await bot.sendMessage(msg.from.id, 'У вас нет отправленных заявок', {
      reply_markup: RegisteredUserMenu(user.role)
    });
    return;
  }

  let answer = '';
  applications.forEach((application) => {
    answer =
      answer +
      'Заявка номер: ' +
      application.application_id +
      '\nБронирование переговорки по номеру: ' +
      application.meeting_room_number +
      '\nНа время: ' +
      application.booking_time.toLocaleDateString() +
      ' ' + //Local date can work wrong in case server whould be located not in Tomsk so it would set time with server's location timezone
      application.booking_time.toLocaleTimeString() +
      '\n\n';
  });

  await bot.sendMessage(msg.from.id, answer, {
    reply_markup: RegisteredUserMenu(user.role)
  });
};
