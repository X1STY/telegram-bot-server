import { Injectable, OnModuleInit } from '@nestjs/common';
import TelegramBot = require('node-telegram-bot-api');
import { PrismaService } from 'prisma.service';
import { InfoPageAboutZone } from './InfoAboutEconomicZone/EconomicZonePage';
import { User } from '@prisma/client';
import { pathToImageFolder } from '@/constants';
import { BecomeAResident, MainMenu } from './BecomeAResident/BecomeAResident';

@Injectable()
export class BotService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  onModuleInit = async () => {
    await this.botMessage();
  };

  botMessage = async () => {
    const bot = new TelegramBot(process.env.BOT_API, { polling: true });

    bot.onText(/\/start/, async (msg) => {
      const user = await this.findUserById(msg.from.id.toString());
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
        caption: `Здравствуйте, ${msg.from.first_name}! Этот чат-бот позволит вам окунуться в мир ОЭЗ`
      });
    });
    bot.on('polling_error', (msg) => {
      console.log(msg);
    });
    bot.on('message', (msg) => {
      InfoPageAboutZone(bot, msg);
      BecomeAResident(bot, msg, this.prisma);
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

  findUserById = async (telegramId: string): Promise<User> => {
    return await this.prisma.user.findFirst({
      where: {
        telegramId
      }
    });
  };
}
