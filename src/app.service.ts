import { Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
