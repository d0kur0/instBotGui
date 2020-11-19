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
    ipcRenderer.invoke("startBot");
  };

  return (
    <div style={rootStyles}>
      <Button shape="round" type="primary" size="large" onClick={handleStart}>
        Запуск
      </Button>
    </div>
  );
}
