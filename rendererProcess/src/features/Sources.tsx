import React from "react";
import { Divider, Typography, Form, Input } from "antd";
import { Col, Row } from "antd";
import { useStoreon } from "storeon/react";
import { StoreEvents, StoreState } from "../../../types";

const { Title, Paragraph } = Typography;

export default function Sources() {
  const { dispatch, sourcesList } = useStoreon<StoreState, StoreEvents>("sourcesList");

  const handleInputSources = (event: React.FormEvent<HTMLTextAreaElement>) => {
    dispatch("setSources", event.currentTarget.value.split("\n"));
  };

  return (
    <React.Fragment>
      <Typography>
        <Title level={3}>Список источников</Title>
        <Paragraph>
          Список хештегов и локаций, по которым будет ходить бот. Разделитель - перенос строки.
          <br />
          Строки формата <b>location/КООРДИНАТЫ</b> и <b>tags/ТЕГ</b>, значения можно брать с
          адресной строки в самом instagram.
        </Paragraph>
      </Typography>

      <Divider />

      <Form layout="vertical">
        <Row gutter={[12, 5]}>
          <Col span={24}>
            <Input.TextArea
              value={sourcesList.join("\n")}
              onInput={handleInputSources}
              rows={10}
            />
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
}
