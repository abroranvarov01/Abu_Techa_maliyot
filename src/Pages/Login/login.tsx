import { Button, Form, Input, message, Space, Typography } from "antd";
import LoginImg from "../../assets/LoginImg.png";
import Logo from "../../assets/logo.svg";
import useLogin from "./service/mutation/useLogin";
import { AxiosResponse } from "axios";
import { saveState } from "../../store/storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { mutate } = useLogin();

  interface submitType {
    login: string;
    password: string;
  }

  const submit = (data: submitType) => {
    console.log(data);
    mutate(data, {
      onSuccess: (res: AxiosResponse) => {
        message.success("Login successfully");
        saveState("token", res.data);
        navigate("/app", { replace: true });
      },
      onError: (error) => {
        message.error("Login failed");
        console.error(error);
      },
    });
  };

  return (
    <Space direction="horizontal" size={64} style={{ height: "100vh" }}>
      <div style={{ height: "100vh" }}>
        <img
          style={{ height: "100%", width: "600px", objectFit: "cover" }}
          src={LoginImg}
          alt="img"
        />
      </div>
      <div style={{ flex: 1, padding: "0 20px", width: "380px" }}>
        <div style={{ marginBottom: "82px" }}>
          <img src={Logo} alt="logo" />
        </div>
        <Typography.Title level={1}>Login</Typography.Title>
        <Form onFinish={submit} layout="vertical">
          <Form.Item
            label={
              <span
                style={{
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "150%",
                  color: "#0a0b0a",
                }}
              >
                Login
              </span>
            }
            name="login"
            rules={[
              { required: true, message: "Please input your login!" },
              { min: 3, message: "Login must be at least 3 characters" },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label={
              <span
                style={{
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "150%",
                  color: "#0a0b0a",
                }}
              >
                Password
              </span>
            }
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ width: "100%" }}
              htmlType="submit"
              type="primary"
              size="large"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Space>
  );
};

export default Login;
