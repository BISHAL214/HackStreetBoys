import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { handleSignUpUserDriver } from "../../store/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";
import "./signup.css"

const DriverSignUp = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(handleSignUpUserDriver(values));
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
    <Wrapper className="relative bg-Image top-10 justify-center h-screen">
      <div className="p-10 w-[25%] h-[80%] bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100">
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
                message: "Please input your phone number!",
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

          <div>
            <span>Car Details</span>

            <Form.Item
              label="Model"
              name="model"
              rules={[
                {
                  required: true,
                  message: "Please input your car model!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Number"
              name="number"
              rules={[
                {
                  required: true,
                  message: "Please input your car number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button htmlType="submit">
              Submit {userState?.isLoading ? <Spin /> : null}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Wrapper>
  );
};
export default DriverSignUp;
