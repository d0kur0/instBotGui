import { instBot, IpcHandler } from "../../../types";
import { spawn } from "promisify-child-process";
import * as path from "path";

const startBot: IpcHandler<void> = {
  name: "startBot",
  async handler() {
    // TODO: Add event for close process, error, etc
    const p = await spawn(`node`, [
      "--experimental-json-modules",
      path.join(instBot.rootDir, "/app/index.js"),
    ]);
  },
};

module.exports = [startBot];
