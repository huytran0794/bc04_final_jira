import React from "react";

/* import antd components */
import { Button, Form, Input } from "antd";
import {
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

/* import local components*/
import Label from "./../../../core/Components/Forms/Label/Label";
import toastify from "./../../../core/utils/toastify/toastifyUtils";

/* import local interfaces */
import {
  InterfaceUserActionProps,
  UserInterface,
} from "../../../core/models/User/User.interface";

/* import local service */
import USER_SERVICE from "./../../../core/services/userServ";

const UserEditModal = ({ user, onSuccess }: InterfaceUserActionProps) => {
  const onFinish = (value: UserInterface) => {
    let userEdit = { ...value, id: user.userId };
    USER_SERVICE.editUser(userEdit)
      .then((res) => {
        toastify("success", "Update user successfully!");
        onSuccess();
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
      layout="vertical"
      size="large"
      initialValues={{
        email: `${user.email}`,
        name: `${user.name}`,
        passWord: `${user.passWord}`,
        confirmPassword: `${user.passWord}`,
        phoneNumber: `${user.phoneNumber}`,
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
          Update User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserEditModal;
