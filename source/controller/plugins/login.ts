import TelegramBot, { Message } from "node-telegram-bot-api";
import listener from "./setup/setup-telegram";
import { execSync } from "child_process";
import { log } from "@iris/logger";

import login from "@dongdev/fca-unofficial";

const TOKEN = process.env.TELEGRAM_TOKEN ?? process.env.TOKEN;
const appState = process.env.APPSTATE;

function killOldInstances() {
  try {
    const lines = execSync("ps aux", { encoding: "utf-8" }).split("\n");
    const currentPid = process.pid;

    for (const line of lines) {
      if (
        line.includes("node") &&
        (line.includes("telegram") ||
          line.includes("login.ts") ||
          line.includes("login.js"))
      ) {
        const pid = Number(line.trim().split(/\s+/)[1]);
        if (pid && pid !== currentPid && pid > 1) {
          try {
            process.kill(pid, "SIGKILL");
          } catch {}
        }
      }
    }
  } catch {}
}

const logger = {
  async TeleBot() {
    if (!TOKEN) {
      log("TELEGRAM", "TELEGRAM_TOKEN is missing proceeding discord.");
      return;
    }

    killOldInstances();

    const bot = new TelegramBot(TOKEN as string, { polling: true });

    bot.on("polling_error", (error) => {
      if (!error.message.includes("409")) {
        console.log("Polling error:", error.message);
      }
    });

    bot.onText(/\/start/, (msg: Message) => {
      const chatId = msg.chat.id;
      const prefix = (globalThis as any).Iris?.config?.prefix || "!";
      bot.sendMessage(
        chatId,
        `Testing... testing, use ${prefix}help to see the commands`,
        { parse_mode: "HTML" }
      );
    });

    try {
      const botInfo = await bot.getMe();
      log(
        "TELEGRAM",
        `Login as \( {botInfo.username} ( \){botInfo.id}) successfully.`
      );
      await listener({ bot });
    } catch (err) {
      console.error("Startup failed:", err);
      process.exit(1);
    }

    const shutdown = () => bot.stopPolling().finally(() => process.exit(0));
    process.once("SIGINT", shutdown);
    process.once("SIGTERM", shutdown);
  },

  async FacebookBot() {
    if (!appState) {
      console.error("APPSTATE is missing");
      return;
    }

    login({ appState }, (err, api) => {
      if (err) {
        console.error("Facebook login error:", err);
        return;
      }

      api.listenMqtt((err, event) => {
        if (err) {
          console.error("MQTT error:", err);
          return;
        }

        if (event.type === "message") {
          api.sendMessage(event.body, event.threadID);
        }
      });
    });
  },
};

export default logger;
