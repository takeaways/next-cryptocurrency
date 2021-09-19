import React from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import Link from "next/link";
import {
  HomeOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
} from "@ant-design/icons";

function Navbar() {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={"/images/cryptocurrency.png"} size="large" />
        <Typography.Title level={2} className="logo">
          <Link href="/">
            <a>Next Currency</a>
          </Link>
        </Typography.Title>
      </div>
      <Menu theme="dark">
        <Menu.Item key={"home"} icon={<HomeOutlined />}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item key={"cryptocurrencies"} icon={<FundOutlined />}>
          <Link href="/cryptocurrencies">
            <a>Cryptocurrencies</a>
          </Link>
        </Menu.Item>
        <Menu.Item key={"exchanges"} icon={<MoneyCollectOutlined />}>
          <Link href="/exchanges">
            <a>Exchanges</a>
          </Link>
        </Menu.Item>
        <Menu.Item key={"news"} icon={<BulbOutlined />}>
          <Link href="/news">
            <a>News</a>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Navbar;
