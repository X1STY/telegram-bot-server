import { Injectable, OnModuleInit } from '@nestjs/common';
import TelegramBot = require('node-telegram-bot-api');
import { PrismaService } from 'prisma.service';
import { InfoPageAboutZone } from './InfoAboutEconomicZone/EconomicZonePage';
import { User } from '@prisma/client';
import { pathToImageFolder } from '@/constants';

@Injectable()
export class BotService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.botMessage();
  }

  async botMessage() {
    const bot = new TelegramBot(process.env.BOT_API, { polling: true });

    bot.onText(/\/start/, async (msg) => {
      const user = await this.findUserById(msg.from.id.toString());
      if (!user) {
        await this.createNewUser(
          msg.from.id.toString(),
          msg.from.username,
          msg.from.first_name + msg.from.last_name
        );
      }

      await bot.sendPhoto(msg.chat.id, pathToImageFolder + 'Обложка.png', {
        reply_markup: this.FirstMenu(),
        parse_mode: 'HTML',
        caption: `Здравствуйте, ${msg.from.first_name}! Этот чат-бот позволит вам окунуться в мир ОЭЗ`
      });
    });
    bot.on('polling_error', (msg) => {
      console.log(msg);
    });
    bot.on('message', (msg) => {
      InfoPageAboutZone(bot, msg);
    });
  }

  FirstMenu = (): TelegramBot.ReplyKeyboardMarkup => {
    const b1: TelegramBot.KeyboardButton = { text: 'Узнать об ОЭЗ' };
    const b2: TelegramBot.KeyboardButton = { text: 'Стать резидентом' };
    const b3: TelegramBot.KeyboardButton = { text: 'Я уже резидент' };
    const kb: TelegramBot.ReplyKeyboardMarkup = {
      keyboard: [[b1, b2, b3]],
      resize_keyboard: true
    };
    return kb;
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
