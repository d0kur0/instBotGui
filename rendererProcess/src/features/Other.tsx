import React, { ChangeEvent } from "react";
import { Input, notification, Typography } from "antd";
import { useStoreon } from "storeon/react";
import { StoreEvents, StoreState } from "../../../types";

const { ipcRenderer } = window.require("electron");

export default function Other() {
  const { dispatch } = useStoreon<StoreState, StoreEvents>();

  const handleImportSettings = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsText(selectedFile);

    reader.addEventListener("load", result => {
      try {
        const settingsAsJson = JSON.parse(reader.result?.toString() || "");
        ipcRenderer
          .invoke("bot/setSettings", settingsAsJson)
          .then(() => {
            dispatch("settings/asyncTask/get");
            notification.success({ message: "Настройки сохранены" });
          })
          .catch(() => notification.error({ message: "Ошибка сохранения настроек" }));
      } catch (error) {
        notification.error({ message: "Ошибка парсинга выбранного файла" });
      }
    });

    reader.addEventListener("error", () => {
      notification.error({ message: "Ошибка чтения выбранного файла" });
    });
  };

  return (
    <div>
      <Typography.Title level={3}>Импорт настроек</Typography.Title>
      <Input type="file" accept=".json" onChange={handleImportSettings} />
    </div>
  );
}
