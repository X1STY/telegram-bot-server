import TelegramBot from 'node-telegram-bot-api';

export const ReplayQuestionCallback = async (
  bot: TelegramBot,
  msg: TelegramBot.Message
): Promise<TelegramBot.Message> => {
  let responseMsg = await new Promise<TelegramBot.Message>((resolve) => {
    bot.once('message', resolve);
  });
  while (responseMsg.from.id !== msg.from.id) {
    responseMsg = await new Promise<TelegramBot.Message>((resolve) => {
      bot.once('message', resolve);
    });
  }
  return responseMsg;
};
