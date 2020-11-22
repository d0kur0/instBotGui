import React from "react";
import { Divider, Typography, InputNumber, Form } from "antd";
import { Col, Row } from "antd";
import { useStoreon } from "storeon/react";
import { StoreEvents, StoreState } from "../../../types";

const { Title, Paragraph } = Typography;

export default function Limits() {
  const { dispatch, settings } = useStoreon<StoreState, StoreEvents>("settings");

  const handleInputLikes = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch("settings/dayLimits/setLikes", +event.currentTarget.value);
  };

  const handleInputComments = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch("settings/dayLimits/setComments", +event.currentTarget.value);
  };

  const handleInputSubscribes = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch("settings/dayLimits/setSubscribes", +event.currentTarget.value);
  };

  return (
    <React.Fragment>
      <Typography>
        <Title level={3}>Суточные лимиты бота</Title>
        <Paragraph>
          Лимиты работают на основе локального времени, после того как бот достигнет лимита по
          конкретной задаче - он начнёт её пропускать. Со временем база данных лимитов
          разрастается, от чего может вырасти потребление оперативной памяти, фризы.
          Рекомендуется переодически её чистить, для этого есть кнопка ниже.
        </Paragraph>
      </Typography>

      <Divider />

      <Form layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item label="Лайки">
              <InputNumber
                onInput={handleInputLikes}
                defaultValue={settings.dayLimits.likes}
                size="large"
                min={1}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Подписки">
              <InputNumber
                onInput={handleInputSubscribes}
                defaultValue={settings.dayLimits.subscribes}
                size="large"
                min={1}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Комментарии">
              <InputNumber
                onInput={handleInputComments}
                defaultValue={settings.dayLimits.comments}
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
