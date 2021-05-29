import { IpcHandler } from "../../../types";
import { activateLicenseKey, saveLocalLicenseKey } from "../utils/license";

const activate: IpcHandler<string> = {
  name: "activate",
  async handler(event, key) {
    const error = await activateLicenseKey(key);

    if (error) {
      event.sender.send("activateError");
      return;
    }

    await saveLocalLicenseKey(key);
    event.sender.send("activated");
  },
};

module.exports = [activate];
