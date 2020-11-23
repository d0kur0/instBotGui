import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Progress } from "antd";
import { ProgressProps } from "antd/es/progress";
import { HandledEvents, HandledEventsKeys } from "../../../types";
import { WindowSizeBase } from "../../../types/important/windowSizes";

const { ipcRenderer } = window.require("electron");

const rootStyles: React.CSSProperties = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 100px",
};

const eventStyles: React.CSSProperties = {};

export default function () {
  const history = useHistory();
  const [comeEvent, setComeEvent] = useState("Инициализация обновления...");
  const [progress, setProgress] = useState<ProgressProps>({
    status: "active",
    percent: 0,
  });

  useEffect(() => {
    ipcRenderer.invoke("bot/update");
    let eventNumber = 1;

    const eventHandler = (event: HandledEventsKeys) => {
      const percent =
        event === "updateSuccess"
          ? 100
          : Math.ceil((100 / Object.keys(HandledEvents).length) * eventNumber);

      setTimeout(() => {
        let status: ProgressProps["status"] = "active";

        event === "updateError" && (status = "exception");
        event === "updateSuccess" && (status = "success");

        setProgress({ status, percent });
        setComeEvent(HandledEvents[event]);

        if (event === "updateSuccess") {
          setTimeout(() => {
            history.push("/");
            ipcRenderer.invoke("resizeWindow", { ...WindowSizeBase });
          }, 3000);
        }
      }, 2000 * eventNumber);

      eventNumber += 1;
    };

    Object.keys(HandledEvents).forEach(event =>
      ipcRenderer.on(event, () => eventHandler(event as HandledEventsKeys))
    );
  }, [history]);

  return (
    <div style={rootStyles}>
      <Progress percent={progress.percent} status={progress.status} />
      <div style={eventStyles}>{comeEvent}</div>
    </div>
  );
}
