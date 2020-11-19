import { updateInstBot } from "../utils/instBot";
import { IpcHandler } from "../../../types";

const botUpdate: IpcHandler<void> = {
  name: "botUpdate",

  async handler(event) {
    try {
      await updateInstBot(chan => event.sender.send(chan));
    } catch (e) {
      event.sender.send("updateError");
    }
  },
};

module.exports = [botUpdate];
