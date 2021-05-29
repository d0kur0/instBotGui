import axios from "axios";
import * as fs from "fs";
import { instBot } from "../../../types";
import * as os from "os";

const { licenseKeyFilePath, licenseServerAddress } = instBot;

type CheckLicenseKeyResponse = {
  isFound: boolean;
};

type ActivateLicenseKeyResponse = {
  error: boolean;
};

const transport = axios.create({
  baseURL: licenseServerAddress,
  responseType: "json",
});

export const getLocalLicenseKey = async () => {
  return await fs.promises.readFile(licenseKeyFilePath, "utf-8").then(
    r => r,
    () => ""
  );
};

export const checkLicenseKeyRemote = async (key: string) => {
  const response = await transport.get<CheckLicenseKeyResponse>(`/checkKey/${key}`).then(
    res => res.data,
    () => ({ isFound: false } as CheckLicenseKeyResponse)
  );

  return response.isFound;
};

export const activateLicenseKey = async (key: string) => {
  const { username } = os.userInfo();
  const hostname = os.hostname();

  const response = await transport
    .get<ActivateLicenseKeyResponse>(`/activate/${key}/${username}@${hostname}`)
    .then(
      res => res.data,
      () => ({ error: true } as ActivateLicenseKeyResponse)
    );

  return response.error;
};

export const isLicenseKeyExists = async () => {
  return await fs.promises.stat(licenseKeyFilePath).then(
    () => true,
    () => false
  );
};

export const saveLocalLicenseKey = async (key: string) => {
  return await fs.promises.writeFile(licenseKeyFilePath, key, { encoding: "utf-8" }).then(
    () => true,
    () => false
  );
};
