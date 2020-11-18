import React from "react";

import ICollapse from "../../models/ICollapse";

import { NavLink } from "react-router-dom";

import styles from "./CNavbar.module.scss";

import { Layout, Menu } from "antd";
import {
  UserOutlined,
  BarChartOutlined,
  HomeOutlined,
} from "@ant-design/icons";

export const CNavbar = ({ isCollapsed }: ICollapse) => {
  const { Sider } = Layout;

  return (
    <>
      <Sider trigger={null} collapsible collapsed={isCollapsed}>
        <div className={styles.logo} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <NavLink to="/" />
            Home
          </Menu.Item>

          <Menu.Item key="2" icon={<BarChartOutlined />}>
            <NavLink to="/skills" />
            Skillsets
          </Menu.Item>

          <Menu.Item key="3" icon={<UserOutlined />}>
            <NavLink to="/employees" />
            Employees
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default CNavbar;
