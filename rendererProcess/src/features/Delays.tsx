import React from "react";
import { Divider, Typography, InputNumber, Form } from "antd";
import { Col, Row } from "antd";
import { useStoreon } from "storeon/react";
import { StoreEvents, StoreState } from "../../../types";

const { Title, Paragraph } = Typography;

export default function Delays() {
  const { dispatch, settings } = useStoreon<StoreState, StoreEvents>("settings");

  const handleInputCommentsDelay = (value: string) => {
    dispatch("settings/delays/setComments", +value);
  };

  const handleInputLikeDelay = (value: string) => {
    dispatch("settings/delays/setLikes", +value);
  };

  const handleInputSubscribeDelay = (value: string) => {
    dispatch("settings/delays/setSubscribes", +value);
  };

  const handleInputIterationDelay = (value: string) => {
    dispatch("settings/delays/setIteration", +value);
  };

  const handleInputChangeSourceDelay = (value: string) => {
    dispatch("settings/delays/setChangeSource", +value);
  };

  const handleInputUnsubscribe = (value: string) => {
    dispatch("settings/delays/setUnsubscribe", +value);
  };

  return (
    <React.Fragment>
      <Typography>
        <Title level={3}>Паузы между действиями</Title>
        <Paragraph>
          Основное для чего нужны данные параметры - не получить бан за быстрые, постоянные
          запросы. Расставляйте с умом. Оптимальные значения 5~10 секунд. Значения всех полей
          указываются в секундах.
        </Paragraph>
      </Typography>

      <Divider />

      <Form layout="vertical">
        <Row gutter={[12, 5]}>
          <Col span={12}>
            <Form.Item label="Пауза после написания комментария">
              <InputNumber
                value={settings.delays.afterWriteComment}
                onInput={handleInputCommentsDelay}
                size="large"
                min={1}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Пауза после установки лайка">
              <InputNumber
                value={settings.delays.afterClickLike}
                onInput={handleInputLikeDelay}
                size="large"
                min={1}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Пауза после клика на подписку">
              <InputNumber
                value={settings.delays.afterClickSubscribe}
                onInput={handleInputSubscribeDelay}
                size="large"
                min={1}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Пауза после закрытия поста">
              <InputNumber
                value={settings.delays.afterEndIteration}
                onInput={handleInputIterationDelay}
                size="large"
                min={1}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Пауза между сменами источников (хештега / локации)">
              <InputNumber
                value={settings.delays.afterChangeSource}
                onInput={handleInputChangeSourceDelay}
                size="large"
                min={1}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Пауза между отписками">
              <InputNumber
                value={settings.delays.afterUnsubscribe}
                onInput={handleInputUnsubscribe}
                size="large"
                min={1}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
}
