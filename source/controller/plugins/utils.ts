import { readdirSync } from "fs-extra";
import { resolve, join } from "path";
import { log } from "@iris/log";

const utils = {
  async loadCommands() {
    const filePath = resolve(process.cwd(), "iris", "modules", "commands");
    log("SERVER", `Command file path: ${filePath}`);
    const loadfiles = readdirSync(filePath).filter((file) => file.endsWith(".ts"));

    if (loadfiles.length === 0) {
      log("IRIS","No commands available to deploy");
      return;
    }

    const validCommands: { file: string; command: any; name: string }[] = [];

    for (const file of loadfiles) {
      const commandPath = join(filePath, file);
      let command = require(commandPath);
      if (command.default) {
        command = command.default;
      }
      const { name, usage, author, aliases, description, onCall } = command ?? {};

      let scanError: string | null = null;
      if (!name || typeof name !== "string") {
        scanError = "Missing or invalid 'name' (must be a non-empty string)";
      } else if (!usage || typeof usage !== "string") {
        scanError = "Missing or invalid 'usage' (must be a non-empty string)";
      } else if (!author || typeof author !== "string") {
        scanError = "Missing or invalid 'author' (must be a non-empty string)";
      } else if (!Array.isArray(aliases)) {
        scanError = "Missing or invalid 'aliases' (must be an array)";
      } else if (!description || typeof description !== "string") {
        scanError = "Missing or invalid 'description' (must be a non-empty string)";
      } else if (typeof onCall !== "function") {
        scanError = "Missing or invalid 'onCall' (must be a function)";
      }

      if (scanError) {
        log("FAILED", `Scan failed ${file} (${scanError})`);
        continue;
      }

      log("SCAN", `Scanned ${file} successfully`);
      validCommands.push({ file, command, name });
    }

    if (validCommands.length === 0) {
      log("IRIS", "No valid commands found after scanning");
      return;
    }

    log("IRIS", `Scan complete: ${validCommands.length} valid commands found`);

    for (const { file, command, name } of validCommands) {
      try {
        log("LOADER", `Deployed ${name} successfully`);
        globalThis.Iris.commands.set(name, command);

        const { aliases } = command;
        if (aliases.length > 0) {
          for (const alias of aliases) {
            globalThis.Iris.commands.set(alias, command);
            log("LOADER", `Alias "${alias}" registered for command "${name}"`);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          log("FAILED", `Failed to deploy ${name} from ${file}: ${error.stack}`);
        } else {
          console.log(error);
        }
      }
    }
    log("IRIS", `Loaded ${validCommands.length} valid commands`);
    log("IRIS", "Scanned command complete!");
  },

  async loadPlugins() {
     log("NOTHING TO FIND")
  }
}

export default utils