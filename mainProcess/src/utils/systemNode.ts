import { exec } from "promisify-child-process";

export const isNodeInstalled = async (): Promise<boolean> => {
  return (
    exec("node -v").then(
      () => true,
      () => false,
    ) &&
    exec("npm -v").then(
      () => true,
      () => false,
    )
  );
};
