import React from "react";
import { Typography } from "antd";
import { openLinkExternal } from "../utils/openLinkExternal";

const { Link, Text } = Typography;

export default function NodeRequired() {
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
        Для работы программы необходимо установить Node.js и NPM.
        <br />
        Если вы пользователь Windows, то вам достаточно перейти по ссылке -{" "}
        <Link onClick={openLinkExternal} href="https://nodejs.org/ru/download/">
          Node.js download
        </Link>
        . Скачайте msi установщик нужной архитектуры, версии LTS. Если вы пользователь Linux
        или MacOS, ищите информацию по установке самостоятельно.
        <br />
        <Text type="danger">
          После установки перезапустите программу, возможно придётся перезайти в систему
        </Text>
      </p>
    </div>
  );
}
