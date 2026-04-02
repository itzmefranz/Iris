import { log as log2 } from "@sy-custom";
import { Message } from "node-telegram-bot-api";
import type TelegramBot from "node-telegram-bot-api";

declare global {
  var bot: import("events").EventEmitter;
  var Iris: IrisAI.GlobalIris;
  var log: typeof log2;

  namespace IrisAI {
    interface GlobalIris {
      config: typeof import("../options.json");
      commands: Map<string, Command>;
      utils: IrisUtils;
    }

    interface Command {
      name: string;
      role: number;
      usage: string;
      author: string;
      aliases: string[];
      cooldowns: number;
      description: string;
      category: string;
      onCall: (ctx: CommandContext) => Promise<void>;
  }

  interface CommandContext {
    args: string[];
    bot: TelegramBot;
    response: Response;
    msg: Message;
  }

  interface IrisUtils {
    loadCommands: () => Promise<void>;
    loadEvents: () => Promise<void>;
  }
}

export {};
