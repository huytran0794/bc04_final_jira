import React from "react";
/* import react router dom packages */
import { useNavigate } from "react-router-dom";

/* import antd components */
import { Button, Form, Input } from "antd";
import {
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

/* import local components*/
import Label from "./Label/Label";
import toastify from "./../../utils/toastify/toastifyUtils";

/* import local interfaces */
import { FormProps } from "../../models/common/FormProps.interface";
import { User } from "./../../models/User/User.interface";

/* import local service */
import USER_SERVICE from "./../../services/userServ";

const RegisterForm = ({ layout = "horizontal", size = "large" }: FormProps) => {
  const navigate = useNavigate();

  const onFinish = (value: User) => {
    USER_SERVICE.register(value)
      .then((res) => {
        toastify("success", "Register successfully! You can log in now!");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      })
      .catch((err) => {
        toastify("error", err.response.data.message);
      });
  };

  const labelItem = (labelText: string) => (
    <Label className="text-lg font-medium">{labelText}</Label>
  );

  return (
    <Form
      name="registerForm"
      className="register-form w-full"
      onFinish={onFinish}
      layout={layout}
      size={size}
      initialValues={{
        email: "abc123@g.co",
        name: "dev đẹp chai lái mái bai",
        passWord: "abc123",
        confirmPassword: "abc123",
        phoneNumber: "012465798",
      }}
    >
      <Form.Item
        name="email"
        label={labelItem("Email")}
        rules={[
          {
            required: true,
            message: "Please do not leave ${name} empty",
          },
          {
            type: "email",
            message: "Please input correct email format for ${name}",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Johndoe@email.com"
        />
      </Form.Item>

      <Form.Item
        name="name"
        label={labelItem("User name")}
        rules={[
          {
            required: true,
            message: "Please do not leave ${name} empty",
          },
          // {
          //   pattern: /^[A-Za-z\s]*$/i,
          //   message: "${name} only accepts text, and char. Please input again.",
          // },
        ]}
      >
        <Input prefix={<IdcardOutlined />} placeholder="John Doe" />
      </Form.Item>

      <Form.Item
        name="passWord"
        label={labelItem("Passwords")}
        rules={[
          { required: true, message: "Please do not leave ${name} empty" },
          {
            min: 6,
            message: "Please input password has length greater than 5",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Enter your passwords"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label={labelItem("Confirm Passwords")}
        dependencies={["passWord"]}
        rules={[
          {
            required: true,
            message: "Please do not leave ${name} empty",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("passWord") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Password and Confirm password must be the SAME")
              );
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Enter the confirmation passwords"
        />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label={labelItem("Phone Number")}
        rules={[
          {
            required: true,
            message: "Please do not leave ${name} empty",
          },
          {
            pattern: /^(?:\d*)$/,
            message: "${name} only accepts number. Please input again",
          },
        ]}
      >
        <Input prefix={<MobileOutlined />} placeholder="0897831245" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="register-form-button mt-3 text-lg font-semibold"
        >
          Register Now
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
