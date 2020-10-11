const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const util = require("util");
const fs = require("fs");

if (require("electron-squirrel-startup")) {
  app.quit();
}

const exec = util.promisify(require("child_process").exec);
const instBotPath = path.join(process.cwd(), "/instbot");

const createWindow = async () => {
  const isNodeInstalled = await exec("node -v").then(
    () => true,
    () => false
  );

  ipcMain.handle("save", async (event, { payload }) => {
    try {
      for (const keyAsFileName in payload) {
        if (!payload.hasOwnProperty(keyAsFileName)) continue;

        fs.writeFileSync(
          path.join(instBotDataFilesPath, `${keyAsFileName}.json`),
          JSON.stringify(payload[keyAsFileName]),
          {
            encoding: "utf8",
          }
        );
      }

      event.sender.send("save-success");
    } catch (error) {
      event.sender.send("save-error");
    }
  });

  ipcMain.handle("start-bot", event => {
    const process = require("child_process").spawn(`powershell.exe`, [
      "node",
      `${path.join(instBotPath, "/app/process.js")}`,
    ]);

    process.on("exit", () => event.sender.send("close-bot"));
    process.on("end", () => event.sender.send("close-bot"));
  });

  const isinstBotPathDownloaded = await fs.promises.access(instBotPath).then(
    () => true,
    () => false
  );

  const instBotDataFilesPath = path.join(instBotPath, "app/configs/dataFiles");
  const filesList = ["auth", "botSettings", "browserSettings", "hashTags", "messages"];

  const sendDataObject = () => {
    const dataObject = filesList.reduce(
      (acc, file) => ({ ...acc, [file]: require(path.join(instBotDataFilesPath, `${file}.json`)) }),
      {}
    );
    mainWindow.webContents.send("data-object", { payload: dataObject });
  };

  const mainWindow = new BrowserWindow({
    width: 1450,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  //mainWindow.webContents.openDevTools();
  mainWindow.setMenu(null);

  if (!isNodeInstalled) {
    mainWindow.setSize(600, 600, true);
    mainWindow.center();
    mainWindow.loadFile(path.join(__dirname, "install-request.html")).catch(console.error);
    return;
  }

  if (!isinstBotPathDownloaded) {
    const ghdownload = require("github-download");

    mainWindow.setSize(300, 300, true);
    mainWindow.center();
    mainWindow.loadFile(path.join(__dirname, "download-process.html")).catch(console.error);

    ghdownload({ user: "d0kur0", repo: "instbot", ref: "master" }, instBotPath)
      .on("error", error => mainWindow.webContents.send("gh-download-error", { payload: error }))
      .on("end", async () => {
        require("child_process").exec("npm install", { cwd: instBotPath }, error => {
          if (error) {
            mainWindow.webContents.send("gh-download-error", { payload: error });
            return;
          }

          mainWindow.webContents.send("gh-download-success");
          setTimeout(() => {
            mainWindow.setSize(1450, 800);
            mainWindow.center();
            mainWindow.loadFile(path.join(__dirname, "index.html")).then(sendDataObject).catch(console.error);
          }, 3000);
        });
      });

    return;
  }

  mainWindow.loadFile(path.join(__dirname, "index.html")).then(sendDataObject).catch(console.error);
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow().catch(console.error);
  }
});
