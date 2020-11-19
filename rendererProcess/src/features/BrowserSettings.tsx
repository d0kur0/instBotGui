import React from "react";
import { Divider, Typography, Form, Switch, Input } from "antd";
import { Col, Row } from "antd";
import { openLinkExternal } from "../utils/openLinkExternal";
import { useStoreon } from "storeon/react";
import { StoreEvents, StoreState } from "../../../types";
import { SwitchChangeEventHandler } from "antd/es/switch";

const { Title, Paragraph, Link } = Typography;

export default function BrowserSettings() {
  const { dispatch, browser } = useStoreon<StoreState, StoreEvents>("browser");

  const handleInputArgs = (event: React.FormEvent<HTMLTextAreaElement>) => {
    dispatch("setBrowserArgs", event.currentTarget.value.split("\n"));
  };

  const handleChangeHeadless: SwitchChangeEventHandler = checked => {
    dispatch("setBrowserHeadless", checked);
  };

  return (
    <React.Fragment>
      <Typography>
        <Title level={3}>Настройки браузера</Title>
        <Paragraph>
          Настройки касающиеся браузера, без знания их лучше не менять. Если нужны какие-то
          специфичные параметры работы, доступные флаги можно посмотреть по ссылке -{" "}
          <Link
            onClick={openLinkExternal}
            href="https://peter.sh/experiments/chromium-command-line-switches/">
            List of Chromium Command Line Switches
          </Link>
        </Paragraph>
      </Typography>

      <Divider />

      <Form layout="vertical">
        <Row gutter={[12, 5]}>
          <Col span={24}>
            <Form.Item labelAlign="left" label="Запуск в скрытом режиме">
              <Switch checked={browser.headless} onChange={handleChangeHeadless} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              labelAlign="left"
              label="Параметры запуска, каждая строка - отдельное значение">
              <Input.TextArea
                onInput={handleInputArgs}
                value={browser.args.join("\n")}
                rows={10}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
}
