import React from "react";
import { Button } from "antd";

const { ipcRenderer } = window.require("electron");

const rootStyles: React.CSSProperties = {
  position: "fixed",
  bottom: "30px",
  right: "30px",
};

export default function StartButton() {
  const handleStart = () => {
    ipcRenderer.invoke("bot/start");
  };

  const handleStartUnsubscribe = () => {
    ipcRenderer.invoke("bot/startUnsubscribe");
  };

  return (
    <div style={rootStyles}>
      <Button
        style={{ marginRight: "15px" }}
        shape="round"
        type="primary"
        size="large"
        onClick={handleStart}>
        Запуск
      </Button>

      <Button shape="round" type="primary" size="large" onClick={handleStartUnsubscribe}>
        Запуск в режиме отписок
      </Button>
    </div>
  );
}
