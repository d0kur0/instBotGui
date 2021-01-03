import { EmptySettings, instBot, InstBotSettings, IpcHandler } from "../../../types";
import * as fs from "fs";
import * as path from "path";
import { exec } from "promisify-child-process";
import { updateInstBot } from "../utils/instBot";

const getSettings: IpcHandler<void> = {
  name: "bot/getSettings",
  async handler() {
    const settingsExists = await fs.promises
      .stat(path.join(instBot.rootDir, "app/settings.json"))
      .then(
        () => true,
        () => false
      );

    if (!settingsExists) return EmptySettings;

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
    if (
      !(
        settings?.auth ||
        settings?.browser ||
        settings?.delays ||
        settings?.commentsList ||
        settings?.dayLimits ||
        settings?.sourcesList
      )
    )
      return false;

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
  async handler() {
    // TODO: Add event for close process, error, etc
    exec(
      `start node --experimental-json-modules ${path.join(instBot.rootDir, "/app/index.js")}`,
      { cwd: instBot.rootDir }
    ).catch(console.log);
  },
};

const startUnsubscribe: IpcHandler<void> = {
  name: "bot/startUnsubscribe",
  async handler() {
    // TODO: Add event for close process, error, etc
    exec(
      `start node --experimental-json-modules ${path.join(
        instBot.rootDir,
        "/app/index.js"
      )} --unsubscribe`,
      { cwd: instBot.rootDir }
    ).catch(console.log);
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

const clearLimitsDB: IpcHandler<boolean> = {
  name: "bot/clearLimitsDB",
  async handler(event) {
    return await fs.promises.unlink(path.join(instBot.rootDir, "limits.json")).then(
      () => true,
      () => false
    );
  },
};

module.exports = [start, update, setSettings, getSettings, clearLimitsDB, startUnsubscribe];
