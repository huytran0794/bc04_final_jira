/* import antd components */
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

/* import react router dom packages */
import { useNavigate } from "react-router-dom";

/* import local interface */
import { FormProps } from "../../models/common/FormProps.interface";
import { User } from "../../models/User/User.interface";

/* import local service */
import USER_SERVICE from "../../services/userServ";
import { LOCAL_SERVICE } from "../../services/localServ";

/* import redux function */
import { useAppDispatch } from "../../hooks/redux/useRedux";
import { userActions } from "../../redux/slice/userSlice";
import { spinnerActions } from "../../redux/slice/spinnerSlice";

/* import local component */
import toastify from "../../utils/toastify/toastifyUtils";
const LoginForm = ({ layout = "horizontal", size = "large" }: FormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = (values: User) => {
    dispatch(spinnerActions.setLoadingOn());
    USER_SERVICE.login(values)
      .then((res) => {
        dispatch(userActions.login(res.content));
        LOCAL_SERVICE.user.set(res.content);
        toastify("success", "Login successfully !");
        setTimeout(() => {
          navigate("/", { replace: true });
          dispatch(spinnerActions.setLoadingOff());
        }, 2500);
      })
      .catch((err) => {
        setTimeout(() => {
          console.log(err);
          toastify("error", err.response.data.message);
          dispatch(spinnerActions.setLoadingOff());
        }, 500);
      });
  };

  return (
    <Form
      name="login_form"
      className="myform loginform"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout={layout}
      size={size}
    >
      <Form.Item
        name="email"
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
          className="py-2 px-5 rounded-md"
        />
      </Form.Item>
      <Form.Item
        name="passWord"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          name="password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Enter your passwords"
          className="py-2 px-5 rounded-md"
        />
      </Form.Item>
      <Form.Item className="w-full">
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button w-full bg-science-blue-500 text-white border-none rounded-md hover:bg-[#0065ff] font-semibold text-lg"
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
