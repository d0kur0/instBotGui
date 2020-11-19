import React from "react";
import { Divider, Typography, InputNumber, Form, Input } from "antd";
import { Col, Row } from "antd";
import { useStoreon } from "storeon/react";
import { StoreEvents, StoreState } from "../../../types";

const { Title, Paragraph } = Typography;

export default function Comments() {
  const { dispatch, commentsList } = useStoreon<StoreState, StoreEvents>("commentsList");

  const handleInputComments = (event: React.FormEvent<HTMLTextAreaElement>) => {
    dispatch("setComments", event.currentTarget.value.split("\n"));
  };

  return (
    <React.Fragment>
      <Typography>
        <Title level={3}>Список комментариев</Title>
        <Paragraph>
          Список комментариев, разделитель - перенос строки. Лучше всего написать большое
          количество комментариев, разного содержания, чтобы не получить временное ограничение
          на написание комментариев.
        </Paragraph>
      </Typography>

      <Divider />

      <Form layout="vertical">
        <Row gutter={[12, 5]}>
          <Col span={24}>
            <Input.TextArea
              onInput={handleInputComments}
              rows={10}
              value={commentsList.join("\n")}
            />
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
}
