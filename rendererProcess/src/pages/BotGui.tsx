import React from "react";
import { Layout, Tabs } from "antd";
import SignIn from "../features/SignIn";
import Limits from "../features/Limits";
import Delays from "../features/Delays";
import BrowserSettings from "../features/BrowserSettings";
import Comments from "../features/Comments";
import Sources from "../features/Sources";
import StartButton from "../features/StartButton";
import { useStoreon } from "storeon/react";
import { StoreEvents, StoreState } from "../../../types";
import { Spin } from "antd";

const { TabPane } = Tabs;
const { Content } = Layout;

const SaveProcess = () => {
  return (
    <div style={{ position: "fixed", bottom: "30px", left: "30px" }}>
      <Spin />
    </div>
  );
};

export default function BotGui() {
  const { activeProcesses } = useStoreon<StoreState, StoreEvents>("activeProcesses");

  return (
    <Content style={{ padding: "0 30px" }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Авторизация" key="1">
          <SignIn />
        </TabPane>
        <TabPane tab="Лимиты" key="2">
          <Limits />
        </TabPane>
        <TabPane tab="Паузы" key="3">
          <Delays />
        </TabPane>
        <TabPane tab="Параметры браузера" key="4">
          <BrowserSettings />
        </TabPane>
        <TabPane tab="Комментарии" key="5">
          <Comments />
        </TabPane>
        <TabPane tab="Источники" key="6">
          <Sources />
        </TabPane>
      </Tabs>

      {activeProcesses.save && <SaveProcess />}

      <StartButton />
    </Content>
  );
}
