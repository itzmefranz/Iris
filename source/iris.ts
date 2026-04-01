/*
  @itzmefranz — The Developer
  Dont steal my codez.
  "When I give up forever to find you, cause you that you'll feel it somehow."
*/

import { readFileSync, writeFileSync } from "fs";
import { server } from "@iris/server";
import { utils } from "@iris/utils";
import { log } from "@iris/logger";
import EventEmitter from "events";
import { join } from "path";

const bot = new EventEmitter();
globalThis.bot = bot;
globalThis.log = log;

globalThis.Iris = {
  get config() {
    try {
      return JSON.parse(readFileSync(join(__dirname, "../settings.json"), "utf-8"));
    } catch (error) {
      return log("ERROR", "Missing settings.json, wag mo na kasi iwala baka sunod nyan, jowa na mawala.")
    }
  }
  set config(config) {
    const data = globalThis.Iris.config;
    const finalData = { ...data, ...config };
    const str = JSON.stringify(finalData, null, 2);
    writeFileSync(join(__dirname, 'settings.json'), str);
  },
  commands: new Map(),
  cooldowns: new Map(),
  aliases: new Map(),
  utils: utils
}

Object.assign(globalThis.Iris, {
  get prefix() {
    return globalThis.Iris.config.prefix;
  },
  get subprefix() {
    return globalThis.Iris.config.subprefix;
  },
  get admins() {
    return globalThis.Iris.config.admins;
  }
});

async function main() {
  await server();
}

main();