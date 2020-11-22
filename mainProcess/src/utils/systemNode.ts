import { exec } from "promisify-child-process";

export const isNodeInstalled = async (): Promise<boolean> => {
  return (
    (await exec("node -v").then(
      () => true,
      () => false
    )) &&
    (await exec("npm -v").then(
      () => true,
      () => false
    ))
  );
};
