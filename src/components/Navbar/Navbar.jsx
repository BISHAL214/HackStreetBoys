import React, { useState } from "react";
import { Menu, Avatar } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleSignOut } from "../../store/Slices/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(handleSignOut());
    navigate("/");
  };

  const [hovered, setHovered] = useState(null);

  const menuItemStyle = {
    color: "white",
    fontSize: "1.4rem",
    fontWeight: 500,
  };

  const menuItemHoverStyle = {
    ...menuItemStyle,
    color: "#E32636",
  };

  return (
    <Menu
      mode="horizontal"
      style={{
        fontSize: "1rem",
        paddingLeft: "20px",
        fontFamily: "monospace",
        display: "flex",
        backgroundColor: "#1677FF",
        height: "5rem",
        alignItems: "center",
      }}
    >
      <Menu.Item>
        <NavLink to={"/"}><Avatar size={80} src={<img src="/logo.png" />} /></NavLink>
      </Menu.Item>

      {userState?.data?.type === "patient" || !userState.data ? (
        <Menu.Item
          style={hovered === "book" ? menuItemHoverStyle : menuItemStyle}
          onMouseEnter={() => setHovered("book")}
          onMouseLeave={() => setHovered(null)}
        >
          <NavLink to={userState?.data?.uid ? "/book" : "/signin"}>
            Book
          </NavLink>
        </Menu.Item>
      ) : null}

      {userState?.data?.type === "drivers" || !userState.data ? (
        <Menu.Item
          style={hovered === "drive" ? menuItemHoverStyle : menuItemStyle}
          onMouseEnter={() => setHovered("drive")}
          onMouseLeave={() => setHovered(null)}
        >
          <NavLink to={userState?.data?.uid ? "/drive" : "/signin"}>
            Drive
          </NavLink>
        </Menu.Item>
      ) : null}

      {userState?.data?.type === "hospitals" || !userState.data ? (
        <Menu.Item
          style={hovered === "hospital" ? menuItemHoverStyle : menuItemStyle}
          onMouseEnter={() => setHovered("hospital")}
          onMouseLeave={() => setHovered(null)}
        >
          <NavLink to={userState?.data?.uid ? "/hospital" : "/signin"}>
            Hospital
          </NavLink>
        </Menu.Item>
      ) : null}

      {userState?.data?.uid ? (
        null
      ) : (
        <Menu.Item
          style={hovered === "signin" ? menuItemHoverStyle : menuItemStyle}
          onMouseEnter={() => setHovered("signin")}
          onMouseLeave={() => setHovered(null)}
        >
          <NavLink to={"/signin"}>Sign In</NavLink>
        </Menu.Item>
      )}

      {userState?.data?.uid ? (
        <Menu.Item
          style={hovered === "signout" ? menuItemHoverStyle : menuItemStyle}
          onMouseEnter={() => setHovered("signout")}
          onMouseLeave={() => setHovered(null)}
          onClick={handleLogOut}
        >
          SignOut
        </Menu.Item>
      ) : (
        <Menu.Item
          style={hovered === "signup" ? menuItemHoverStyle : menuItemStyle}
          onMouseEnter={() => setHovered("signup")}
          onMouseLeave={() => setHovered(null)}
        >
          <NavLink to={"/signup"}>Sign Up</NavLink>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Navbar;
