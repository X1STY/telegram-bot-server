import { Injectable, OnModuleInit } from '@nestjs/common';
import TelegramBot = require('node-telegram-bot-api');
import { PrismaService } from 'prisma.service';
import { InfoPageAboutZone } from './InfoAboutEconomicZone/EconomicZonePage';
import { PrismaClient, User } from '@prisma/client';
import { pathToImageFolder } from '@/constants';
import { BecomeAResident } from './BecomeAResident/BecomeAResident';
import { AlreadyRegistered } from './AlreadyRegistered/AlreadyRegistered';
import { MainMenu } from './markups';
import { AdminPanel } from './AdminPanel/AdminPanel';

@Injectable()
export class BotService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  onModuleInit = async () => {
    await this.botMessage();
  };

  botMessage = async () => {
    const bot = new TelegramBot(process.env.BOT_API, { polling: true });
    bot.onText(/\/start/, async (msg) => {
      const user = await findUserById(msg.from.id.toString(), this.prisma);
      if (!user) {
        await this.createNewUser(
          msg.from.id.toString(),
          msg.from.username ?? '',
          msg.from.first_name ?? '' + msg.from.last_name ?? ''
        );
      }

      await bot.sendPhoto(msg.chat.id, pathToImageFolder + 'Обложка.png', {
        reply_markup: MainMenu(),
        parse_mode: 'HTML',
        caption: `Здравствуйте, ${msg.from.first_name}! Добро пожаловать в бота, посвященного особой экономической зоне Томска. Здесь вы найдете актуальную информацию, а также ответы на ваши вопросы и возможность стать резидентом. Начнем наше увлекательное путешествие по миру экономических преимуществ вместе! 🚀`
      });
      return;
    });
    bot.on('polling_error', (msg) => {
      console.log(msg);
    });
    bot.on('message', (msg) => {
      InfoPageAboutZone(bot, msg);
      BecomeAResident(bot, msg, this.prisma);
      AlreadyRegistered(bot, msg, this.prisma);
      backToMainMenuHandler(bot, msg);
      AdminPanel(bot, msg, this.prisma);
    });
  };

  createNewUser = async (telegramId: string, username: string, full_name: string) => {
    await this.prisma.user.create({
      data: {
        telegramId,
        username,
        full_name
      }
    });
  };
}

export const findUserById = async (telegramId: string, prisma: PrismaClient): Promise<User> => {
  return await prisma.user.findFirst({
    where: {
      telegramId
    }
  });
};

const backToMainMenuHandler = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (msg.text !== 'В начало') {
    return;
  }
  await bot.sendMessage(msg.from.id, 'Возвращаю вас в начальное меню!', {
    reply_markup: MainMenu()
  });
};
