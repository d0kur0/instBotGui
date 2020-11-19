import { IpcHandler } from "../../../types";
import { shell } from "electron";
import { IpcOpenExternalLinkProps } from "../../../types/IpcHandlersProps/IpcOpenExternalLinkProps";

const openLinkExternal: IpcHandler<IpcOpenExternalLinkProps> = {
  name: "openLinkExternal",
  handler(event, url) {
    shell.openExternal(url).catch(console.error);
  },
};

module.exports = [openLinkExternal];
