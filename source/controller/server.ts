import { login } from "@iris/logins";
import { log } from "@iris/logger";
import utils from "@iris/utils";

export async function server(){
  log("IRIS", "Starting Iris, please wait...");
  log("IRIS", "Iris is now starting.\n\n");
  log("IRIS", "Loading Commands");
  await utils.loadCommands();
  log("IRIS", "Loading Plugins");
  await utils.loadPlugins();
  log("IRIS", "Logging in different accounts.");
  log("IRIS", "Logging in on Facebook.");
  await login.Facebook();
  log("IRIS", "Iris is now ready to use.");
}