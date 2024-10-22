import React, { useState } from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { LogoComponent } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { loginFromDb } from "../../services/api";
import { setAuthHeader, setUser } from "../../helpers/helper";

export default function Login(props: any) {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [usernameFound, setUsernameFound] = useState(true);
  const [passwordStatus, setPasswordStatus] = useState(true);

  const onLogin = async (data: any) => {
    setLogin(true);
    const res = await loginFromDb(data);
    if (res.status === "not_found") {
      setUsernameFound(false);
      message.error(
        "User does not exist, plese check username again or create a new acount !!"
      );
    } else if (res.status === "incorrect") {
      setPasswordStatus(false);
      message.error("Password Incorrect, please try again !!");
    } else if (res.status === "internal_error") {
      message.error("Some unknown error occured, please try again!!");
    } else if (res.status === "success") {
      setUser(res);
      message.success("Login succeed, getting you to homepage !");
      setAuthHeader();
      setLogin(false);
      setTimeout(() => {
        navigate("/posts");
      }, 500);
    }
    setLogin(false);
  };

  return (
    <div className="flex flex-col lg:w-[50%] h-full p-10 justify-center  w-[100vw]">
      <div className="shadow-2xl shadow-[#8b5cf6]/60 p-10 rounded-[15px] w-full">
        <LogoComponent />
        <Form
          name="normal_login"
          className="login-form mt-10 xl:px-20"
          initialValues={{ remember: true }}
          onFinish={onLogin}
        >
          <Form.Item
            name="username"
            label="Username"
            validateStatus={!usernameFound ? "error" : undefined}
            help={
              !usernameFound
                ? "User doesn't exist, please create a new account"
                : undefined
            }
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              size="large"
              onChange={() => setUsernameFound(true)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            validateStatus={!passwordStatus ? "error" : undefined}
            help={
              !passwordStatus
                ? "Password Incorrect, please try again !!"
                : undefined
            }
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
              onChange={() => setPasswordStatus(true)}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item className="flex items-center justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button bg-button w-[100px]"
              size="large"
              loading={login}
            >
              Log in
            </Button>
          </Form.Item>

          <Form.Item className="flex items-center justify-center  lg:hidden">
            <p>
              Don't have an account?
              <Link to="/register" className="text-sbutton">
                {" "}
                <span
                  onClick={() => {
                    props.changeType("signUp");
                  }}
                >
                  Sign up Now !
                </span>
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
