import { instBot, InstBotSettings, IpcHandler } from "../../../types";
import * as fs from "fs";
import * as path from "path";

const getBotSettings: IpcHandler<void> = {
  name: "getBotSettings",

  async handler() {
    return JSON.parse(
      await fs.promises.readFile(path.join(instBot.rootDir, "app/settings.json"), {
        encoding: "utf-8",
      })
    );
  },
};

const setBotSettings: IpcHandler<InstBotSettings> = {
  name: "setBotSettings",

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

module.exports = [getBotSettings, setBotSettings];
