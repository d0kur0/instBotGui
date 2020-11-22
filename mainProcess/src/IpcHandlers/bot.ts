import { instBot, InstBotSettings, IpcHandler } from "../../../types";
import * as fs from "fs";
import * as path from "path";
import { spawn } from "promisify-child-process";
import { updateInstBot } from "../utils/instBot";

const getSettings: IpcHandler<void> = {
  name: "bot/getSettings",
  async handler() {
    return JSON.parse(
      await fs.promises.readFile(path.join(instBot.rootDir, "app/settings.json"), {
        encoding: "utf-8",
      })
    );
  },
};

const setSettings: IpcHandler<InstBotSettings> = {
  name: "bot/setSettings",
  async handler(event, settings) {
    return await fs.promises
      .writeFile(path.join(instBot.rootDir, "app/settings.json"), JSON.stringify(settings), {
        encoding: "utf-8",
      })
      .then(
        () => true,
        () => false
      );
  },
};

const start: IpcHandler<void> = {
  name: "bot/start",
  async handler(event) {
    // TODO: Add event for close process, error, etc
    await spawn(`node`, [
      "--experimental-json-modules",
      path.join(instBot.rootDir, "/app/index.js"),
    ]).catch(error => event.sender.send("botClose"));
  },
};

const update: IpcHandler<void> = {
  name: "bot/update",
  async handler(event) {
    try {
      await updateInstBot(chan => event.sender.send(chan));
    } catch (e) {
      event.sender.send("updateError");
    }
  },
};

module.exports = [start, update, setSettings, getSettings];
