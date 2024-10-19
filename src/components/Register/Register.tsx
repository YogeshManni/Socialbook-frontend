import React, { useEffect, useState } from "react";

import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Spin,
  Upload,
  UploadProps,
  message,
} from "antd";
import { LogoComponent } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { addUsersInDb, sendOtpToUser, verifyOtp } from "../../services/api";
import moment from "moment";
import upload from "../../lib/upload";
import { verify } from "crypto";

export default function Register(props: any) {
  const navigate = useNavigate();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const [fileList, setFileList] = useState([]);

  const setOtp = async (e: any) => {
    const otp = e.target.value;
    if (otp.length === 6) {
      const res = await verifyOtp({ email, otp });
      if (res.status === "success") {
        setEmailVerified(true);
        message.success({
          content: "Email verified successfully !!",
          duration: 5,
        });
      } else {
        setEmailVerified(false);
        message.error({
          content: res.msg,
          duration: 5,
        });
      }
    }
  };

  const handleChange = (props: any) => {
    console.log(props);
    setFileList(props); //props.fileList
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [u_img, setImage]: any = useState("");
  const [dateTime, setDateTime]: any = useState("");

  const [username, setUsername] = useState("");
  const [isuploading, setUploading] = useState<boolean>(false);
  const [emailValidated, setEmailValidated] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const handleCancel = () => setPreviewOpen(false);

  const onRegister = async (data: any) => {
    data.profilepic = u_img;

    const res = await addUsersInDb(data);

    if (res.status === "success") {
      props.changeType("signIn");
      navigate("/");
      message.success("Account created successfully, please login now !");
    } else {
      message.error(
        res.message || "Error occured while account creation, please try again!"
      );
    }
  };

  const sendOtp = async (email: string) => {
    // if email not already verified, send otp to user
    if (!emailVerified) {
      setEmail(email);

      const res = await sendOtpToUser(email);
      if (res.status === "success") {
        message.success({
          content:
            "An email with OTP is sent to your email address, please enter that OTP below !!",
          duration: 10,
        });
      } else {
        message.error({
          content: res.msg,
          duration: 5,
        });
      }
      console.log(res);
    }
  };
  function setImageData(file: any, url: string) {
    setImage(url);
    setUploading(false);
  }

  const uploadprops: UploadProps = {
    name: "image-file",
    multiple: false,
    listType: "picture-circle",

    action: ``,
    async beforeUpload(file) {
      if (!file.type.includes("image")) {
        message.error("Please upload an image only");
        return false;
      }

      let _username = username;
      if (!_username)
        _username = String(Math.floor(Math.random() * 500000) + 1);
      const newFileName = `${_username}${dateTime}${file.name}`;
      setUploading(true);
      const imageUrl = await upload(file, newFileName);
      if (imageUrl.includes("https://firebase")) {
        message.success("Image uploaded succesfully !!");
      } else {
        message.error(
          "Error occured while uploading image, please try again !!"
        );
      }
      handleChange(file);

      //uploadImage(file);
      setImageData(file, String(imageUrl));
      return true;
    },
  };

  useEffect(() => {
    //initlaizing datetime for new profle pic
    if (!dateTime) setDateTime(String(moment().format()));
  }, []);

  return (
    <div className="flex flex-col lg:w-[50%] h-full p-10  lg:ml-[50%] w-[100vw]">
      <div className="shadow-2xl shadow-[#8b5cf6]/60 p-10 rounded-[15px]">
        <LogoComponent />
        <Form
          name="normal_login"
          className="login-form mt-10 xl:pr-20"
          initialValues={{ remember: true }}
          onFinish={onRegister}
          {...formItemLayout}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
            ]}
            hasFeedback
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please input your Full Name!",
                whitespace: true,
              },
            ]}
            hasFeedback
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Fullname"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not a valid E-mail !!",
              },
              {
                required: true,
                message: "Please input your E-mail !!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  //  if (getFieldValue("email").type === "email") {
                  if (
                    !value ||
                    getFieldValue("email").includes("@northislandcollege.ca")
                  ) {
                    setEmailValidated(true);

                    sendOtp(getFieldValue("email"));
                    return Promise.resolve();
                  }

                  setEmailValidated(false);
                  return Promise.reject(
                    new Error("Please enter your college E-mail !!")
                  );
                  //  }
                },
              }),
            ]}
            hasFeedback
          >
            <Input
              size="large"
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            hidden={!emailValidated}
            name="otp"
            label="OTP"
            rules={[
              {
                required: true,
                message: "Please input otp you received in your email !!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Otp"
              onChange={(e) => setOtp(e)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm password"
            />
          </Form.Item>

          <Form.Item name="org" label="Organization">
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Organization"
            />
          </Form.Item>

          <Form.Item name="role" label="Role / Position">
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Role"
            />
          </Form.Item>

          <Form.Item name="phone" label="Phone Number" hasFeedback>
            <Input
              size="large"
              style={{ width: "100%" }}
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Phone Number"
              type="number"
            />
          </Form.Item>

          <Form.Item
            name="profilepic"
            label="Profile Pic"
            hasFeedback
            tooltip="It's a good idea to add a profile pic so others can know who you are :)"
          >
            <Spin
              tip="Uploading....."
              spinning={isuploading}
              size="large"
              className="text-[100px] !"
              delay={500}
            >
              <Upload {...uploadprops}>
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </Spin>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Form.Item>

          <Form.Item className="flex justify-center">
            <Button
              type="primary"
              className="bg-button w-[100px]"
              size="large"
              htmlType="submit"
            >
              Register
            </Button>
          </Form.Item>
          <div className="flex items-center justify-center  lg:hidden">
            <p>
              Already have an account?&nbsp;
              <Link to="/" className="text-sbutton inline-flex">
                {" "}
                <span
                  onClick={() => {
                    props.changeType("signIn");
                  }}
                >
                  Sign In Now !
                </span>
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
