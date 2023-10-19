import { findUserById } from '@/telegram-bot/bot.service';
import { RegisteredUserMenu } from '@/telegram-bot/markups';
import { PrismaClient } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';

export const RegisterNewApplication = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  prisma: PrismaClient
) => {
  if (msg.text !== 'Забронировать конференц зал / переговорку') {
    return;
  }

  const user = await findUserById(msg.from.id.toString(), prisma);

  if (user.role !== 'RESIDENT') {
    return;
  }
  //this whole method defenetely should be tested or restructured somehow user cannot break down whole app
  //most vulnarable part of code in my opinion
  await bot.sendMessage(
    msg.from.id,
    'Введите номер переговорки / конференц-зала, который вы хотите забронировать'
  );
  const meetingRoomNumber = await new Promise<TelegramBot.Message>((resolve) => {
    bot.once('message', resolve);
  });
  if (!Number(meetingRoomNumber.text)) {
    await bot.sendMessage(msg.from.id, 'Номер переговорной или конференц-зала должен быть числом', {
      reply_markup: RegisteredUserMenu(user.role)
    });
    return;
  }
  await bot.sendMessage(msg.from.id, 'Введите дату и время брони в формате dd.mm.yyyy hh:mm');
  const bookingDateAndTime = await new Promise<TelegramBot.Message>((resolve) => {
    bot.once('message', resolve);
  });
  const date = stringToDate(bookingDateAndTime.text);
  try {
    await prisma.application.create({
      data: {
        meeting_room_number: Number(meetingRoomNumber.text),
        booking_time: date,
        author_telegram_id: user.telegramId
      }
    });
    await bot.sendMessage(msg.from.id, 'Заявка на бронирование успешно создана', {
      reply_markup: RegisteredUserMenu(user.role)
    });
  } catch (error) {
    await bot.sendMessage(msg.from.id, 'Некорректный ввод данных!', {
      reply_markup: RegisteredUserMenu(user.role)
    });
  }
};

const stringToDate = (str: string): Date | undefined => {
  try {
    const splittedDate = str.split(' ');
    const [day, month, year] = splittedDate[0].split('.').map(Number);
    const [hours, minutes] = splittedDate[1].split(':').map(Number);
    return new Date(year, day, month - 1, hours, minutes);
  } catch (error) {
    return undefined;
  }
};
