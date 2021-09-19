import { Space, Typography } from "antd";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <>
      <Typography.Title
        level={5}
        style={{ color: "white", textAlign: "center" }}
      >
        Next Currency
        <br />
        All rights reserved
      </Typography.Title>
      <Space>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/exchanges">
          <a>Exchanges</a>
        </Link>
        <Link href="/news">
          <a>News</a>
        </Link>
      </Space>
    </>
  );
}

export default Footer;
