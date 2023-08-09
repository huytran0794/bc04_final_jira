import React from "react";

// import local interface
import { InterfaceProfileFormComponent } from "../../models/common/FormProps.interface";
import { User } from "../../models/User/User.interface";

// import local components
import Label from "./Label/Label";

// import local services
import USER_SERVICE from "../../services/userServ";

// import ANTD components
import { Button, Form, Input } from "antd";
import toastify from "../../utils/toastify/toastifyUtils";
import { LOCAL_SERVICE } from "../../services/localServ";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux/useRedux";
import { userActions } from "../../redux/slice/userSlice";
import { spinnerActions } from "../../redux/slice/spinnerSlice";

export default function ProfileForm({
  layout = "vertical",
  size = "large",
  user,
  setIsEdit,
}: InterfaceProfileFormComponent) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const labelItem = (labelText: string) => (
    <Label className="text-lg font-medium text-pickled-bluewood-400 capitalize">
      {labelText}
    </Label>
  );

  // ANTD form control
  const [form] = Form.useForm();

  const initialValues = {
    id: user.id,
    name: user.name,
    email: user.email,
    passWord: user.passWord,
    phoneNumber: user.phoneNumber,
  };

  const onFinish = (values: Partial<User>) => {
    dispatch(spinnerActions.setLoadingOn());
    USER_SERVICE.edit(values)
      .then(() => {
        USER_SERVICE.login({
          email: values.email!,
          passWord: values.passWord!,
        })
          .then((res) => {
            dispatch(userActions.login(res.content));
            LOCAL_SERVICE.user.set(res.content);
            setIsEdit(false);
            toastify("success", "User updated successfully");
            dispatch(spinnerActions.setLoadingOff());
          })
          .catch((err2) => {
            console.log(err2);
            toastify("warn", "User updated successfully with interface error");
            LOCAL_SERVICE.user.unset();
            dispatch(spinnerActions.setLoadingOff());
            toastify("info", "Please log in again");
            navigate("login");
          });
      })
      .catch((err1) => {
        console.log(err1);
        toastify("error", err1.response.data.message);
        dispatch(spinnerActions.setLoadingOff());
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.setFieldsValue({
      name: "",
      email: "",
      passWord: "",
      phoneNumber: "",
    });
  };

  return (
    <Form
      form={form}
      name="user_profile"
      layout={layout}
      size={size}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label={labelItem("My ID")} name="id">
        <Input disabled />
      </Form.Item>
      <Form.Item
        label={labelItem("Name")}
        name="name"
        rules={[
          { required: true, message: "Please input your Name here" },
          {
            pattern:
              /^[A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđỲỌÁẦẢẤỜỄÀẠẰỆẾÝỘẬỐŨỨĨÕÚỮỊỖÌỀỂẨỚẶÒÙỒỢÃỤỦÍỸẮẪỰỈỎỪỶỞÓÉỬỴẲẸÈẼỔẴẺỠƠÔƯĂÊÂĐ' ]+$/,
            message: "Letters only",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={labelItem("Email")}
        name="email"
        rules={[
          { required: true, message: "Please add your email here" },
          {
            type: "email",
            message: "Please use correct email format",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={labelItem("Password")}
        name="passWord"
        rules={[
          { required: true, message: "Your password should not be empty" },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label={labelItem("Phone number")}
        name="phoneNumber"
        rules={[
          { required: true, message: "Phone number is required" },
          {
            pattern: /^\d+$/,
            message: "Number only, no whitespace",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item className="form-btn-group">
        <Button
          type="primary"
          htmlType="submit"
          className="btn-login bg-science-blue-500 text-white border-none rounded-[4px] hover:bg-blue-800 font-semibold text-xl transition-all duration-[400ms] order-3"
        >
          Submit
        </Button>
        <Button
          htmlType="button"
          onClick={onReset}
          className="btn-login bg-gray-500 text-white border-none rounded-[4px] hover:bg-gray-700 font-semibold text-xl transition-all duration-[400ms] order-2"
        >
          Reset
        </Button>
        <Button
          htmlType="button"
          onClick={() => {
            setIsEdit(false);
          }}
          className="btn-reset btn-txt--underlined border-none text-gray-500 text-xl order-1"
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}
