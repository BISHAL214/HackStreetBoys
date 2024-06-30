import React from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import {ArrowRightOutlined} from "@ant-design/icons"

const SignInPage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper className="justify-center gap-32 items-center h-screen flex-col">
      <Button
        style={{
          border: "none",
          textDecoration: "underline",
          fontSize: "3rem",
        }}
        onClick={() => navigate("/signin/patient")}
      >
        Sign As Patient {<ArrowRightOutlined />}
      </Button>
      <Button
        style={{
          border: "none",
          textDecoration: "underline",
          fontSize: "3rem",
        }}
        onClick={() => navigate("/signin/driver")}
      >
        SignIn As Driver {<ArrowRightOutlined />}
      </Button>

      <Button
        style={{
          border: "none",
          textDecoration: "underline",
          fontSize: "3rem",
        }}
        onClick={() => navigate("/signin/hospital")}
      >
        SignIn As Hospital {<ArrowRightOutlined />}
      </Button>
    </Wrapper>
  );
};

export default SignInPage;
