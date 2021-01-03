import React, { ChangeEvent } from "react";
import { Button, Divider, Input, notification, Typography } from "antd";
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
      } catch (e) {
        notification.error({ message: "Ошибка парсинга выбранного файла" });
        console.error(e);
      }
    });

    reader.addEventListener("error", () => {
      notification.error({ message: "Ошибка чтения выбранного файла" });
    });
  };

  const handleExportSettings = () => {
    try {
      ipcRenderer
        .invoke("bot/getSettings")
        .then(settings => {
          const a = document.createElement("a");
          const file = new Blob([JSON.stringify(settings)], { type: "application/json" });

          a.href = URL.createObjectURL(file);
          a.download = "instBotSettings.json";
          a.click();

          URL.revokeObjectURL(a.href);
        })
        .catch(() => notification.error({ message: "Ошибка чтения файла настроек" }));
    } catch (e) {
      notification.error({ message: "Ошибка экспорта" });
      console.error(e);
    }
  };

  return (
    <div>
      <Typography.Title level={3}>Импорт настроек</Typography.Title>
      <Input type="file" accept=".json" onChange={handleImportSettings} />

      <Divider />

      <Typography.Title level={3}>Экспорт настроек</Typography.Title>
      <Button onClick={handleExportSettings}>Сохранить как...</Button>
    </div>
  );
}
