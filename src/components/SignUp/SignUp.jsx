import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { handleSignUpUser } from "../../store/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";

import "./signup.css"

const SignUp = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(handleSignUpUser(values));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (userState?.data) {
      navigate("/");
    }
  });

  return (
    <Wrapper className="bg-Image justify-center items-center h-screen ">
      <div className="p-10 w-[25%] h-[60%] bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100
">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input your full name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone No."
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button htmlType="submit" style={{  }}>
            Submit {userState?.isLoading ? <Spin /> : null}
          </Button>
        </Form.Item>
      </Form>
      </div>
    </Wrapper>
  );
};
export default SignUp;
