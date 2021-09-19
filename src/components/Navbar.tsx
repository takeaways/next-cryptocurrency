import React, { useState, useEffect, useLayoutEffect } from "react";
import { Menu, Typography, Avatar, Button } from "antd";
import Link from "next/link";
import {
  HomeOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  MenuOutlined,
} from "@ant-design/icons";

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState<number>(0);

  useLayoutEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={"/images/cryptocurrency.png"} size="large" />
        <Typography.Title level={2} className="logo">
          <Link href="/">
            <a>Next Currency</a>
          </Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => {
            setActiveMenu(!activeMenu);
          }}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
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
      )}
    </div>
  );
}

export default Navbar;
