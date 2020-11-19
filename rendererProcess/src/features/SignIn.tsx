import React from "react";
import { Input } from "antd";
import { Col, Row, Divider, Form } from "antd";
import { Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useStoreon } from "storeon/react";
import { StoreEvents, StoreState } from "../../../types";

const { Title, Paragraph } = Typography;

export default function SignIn() {
  const { dispatch, auth } = useStoreon<StoreState, StoreEvents>("auth");

  const handleInputUsername = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch("setUsername", event.currentTarget.value);
  };

  const handleInputPassword = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch("setPassword", event.currentTarget.value);
  };

  return (
    <React.Fragment>
      <Typography>
        <Title level={3}>Данные для авторизации на сайте instagram</Title>
        <Paragraph>
          В данных полях требуется ввести Ваши корректные данные для авторизации в
          instagram, в точности как Вы их вводите при обычном входе. Двухфакторная
          авторизация не предусмотренна, если включена, то требуется выключить на время
          работы бота.
        </Paragraph>
      </Typography>

      <Divider />

      <Form layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item label="Логин">
              <Input size="large" value={auth.username} onInput={handleInputUsername} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Пароль">
              <Input.Password
                size="large"
                onInput={handleInputPassword}
                value={auth.password}
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
}
