import React, { useEffect, useState } from "react";
import { Alert, Button, Divider, Form, Input } from "antd";
import { WindowSizeBase } from "../../../types";
import { useHistory } from "react-router-dom";

const { ipcRenderer } = window.require("electron");

export default function EnterLicense() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  const handleActivation = () => {
    ipcRenderer.invoke("activate", code);
  };

  useEffect(() => {
    ipcRenderer.on("activated", () => {
      history.push("/");
      ipcRenderer.invoke("resizeWindow", { ...WindowSizeBase });
    });

    ipcRenderer.on("activateError", () => {
      setError("Ошибка активации, проверьте правильность ключа");
    });
  }, [history]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}>
      <p style={{ textAlign: "center", padding: "0 40px" }}>
        Требуется ввести ключ активации полученный от менеджера.
      </p>

      {error && (
        <div style={{ width: "400px" }}>
          <Alert type="error" message={error} />
        </div>
      )}

      <Divider />

      <Form.Item style={{ width: "100%", padding: "0 30px" }}>
        <Input.TextArea
          onInput={e => setCode(e.currentTarget.value)}
          style={{ width: "100%" }}
          rows={1}
        />
      </Form.Item>

      <Form.Item>
        <Button onClick={handleActivation} type="primary">
          Активировать
        </Button>
      </Form.Item>
    </div>
  );
}
