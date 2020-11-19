import { IpcHandler } from "../../../types";
import { BrowserWindow } from "electron";
import { IpcWindowProps } from "../../../types/IpcHandlersProps/IpcWindowProps";

const resizeWindow: IpcHandler<IpcWindowProps> = {
  name: "resizeWindow",
  async handler(event, { width, height }) {
    const mainWindow = BrowserWindow.getAllWindows()[0];
    mainWindow.setSize(width, height);
    mainWindow.center();
  },
};

module.exports = [resizeWindow];
