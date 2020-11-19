import axios from "axios";
import * as path from "path";
import { GithubCommitsList, instBot } from "../../../types";
import * as fs from "fs";
import * as unzipper from "unzipper";
import { exec } from "promisify-child-process";

const { repo, revisionFilePath, rootDir, downloadUrl, tempFilePath } = instBot;

const getLatestRemoteCommitHash = async (): Promise<string> => {
  const response = await axios.get<GithubCommitsList>(
    `https://api.github.com/repos/${repo.owner}/${repo.name}/commits`
  );

  return response.data.shift().sha;
};

const getLatestLocalCommitHash = async (): Promise<string> => {
  return await fs.promises.readFile(revisionFilePath, "utf-8").then(
    data => data,
    () => ""
  );
};

const setLatestLocalCommitHash = async (hash: string): Promise<void> => {
  return await fs.promises.writeFile(revisionFilePath, hash, "utf-8");
};

export const isBotNeedUpdate = async (): Promise<boolean> => {
  const remoteCommitHash = await getLatestRemoteCommitHash();
  const localCommitHash = await getLatestLocalCommitHash();

  return (
    !(await fs.promises.stat(rootDir).then(
      () => true,
      () => false
    )) || remoteCommitHash !== localCommitHash
  );
};

export const updateInstBot = async (fn: (chan: string) => void): Promise<void> => {
  // download repo from github
  fn("updateStart");
  fn("bundleDownload");
  const writer = fs.createWriteStream(tempFilePath);

  const response = await axios({
    url: downloadUrl,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  // Extract zip archive
  fn("bundleExtract");
  const directory = await unzipper.Open.file(tempFilePath);
  await Promise.all(
    directory.files.map(
      (file): Promise<void> => {
        const appendPath = path.join(rootDir, file.path.split("/").splice(1).join("/"));

        if (file.type === "Directory") {
          return fs.promises.mkdir(appendPath, { recursive: true });
        }

        return new Promise((resolve, reject) => {
          file
            .stream()
            .pipe(fs.createWriteStream(appendPath))
            .on("error", reject)
            .on("finish", resolve);
        });
      }
    )
  );

  // Remove useless archive
  fn("bundleRemove");
  await fs.promises.unlink(tempFilePath);

  // Make empty settings file, is not exists
  const settingsPath = path.join(rootDir, "app/settings.json");
  const settingsExists = await fs.promises.stat(settingsPath).then(
    () => true,
    () => false
  );

  if (!settingsExists) {
    fn("settingsCreate");
    await fs.promises.copyFile(path.join(rootDir, "app/settings.json-example"), settingsPath);
  }

  // Update npm dependencies
  fn("updateDependencies");
  const { code } = await exec("npm install", { cwd: rootDir });
  if (code !== 0) throw new Error("Error then execute npm install");

  // Save revision hash of update
  const remoteCommitHash = await getLatestRemoteCommitHash();
  await setLatestLocalCommitHash(remoteCommitHash);

  fn("updateSuccess");
};
