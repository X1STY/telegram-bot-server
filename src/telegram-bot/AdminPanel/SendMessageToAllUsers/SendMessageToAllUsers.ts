import { PrismaClient } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';
import { AdminPanelMenu } from '@/telegram-bot/markups';

export const SendMessageToAllUsers = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  prisma: PrismaClient
) => {
  if (msg.text !== 'Рассылка сообщения') {
    return;
  }
  await bot.sendMessage(msg.from.id, 'Введите сообщение для рассылки всем пользователям');
  const responseMsg = await new Promise<TelegramBot.Message>((resolve) => {
    bot.once('message', resolve);
  });
  const users = await prisma.user.findMany({
    where: {
      NOT: {
        telegramId: msg.from.id.toString()
      }
    }
  });
  for (let i = 0; i < users.length; i++) {
    try {
      await bot.sendMessage(users[i].telegramId, responseMsg.text);
    } catch (error) {
      continue;
    }
  }

  await bot.sendMessage(msg.from.id, 'Рассылка началась!', {
    reply_markup: AdminPanelMenu()
  });
};
