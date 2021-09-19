import { Row, Typography, Col, Statistic } from "antd";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import millify from "millify";
import Link from "next/link";
import {
  cryptoRequest,
  Stats,
  useGetCryptoQuery,
} from "src/services/cryptoApi";
import Title from "antd/lib/typography/Title";
import Cryptocurrencies from "src/components/Cryptocurrencies";
import News from "src/components/News";

const Home = ({
  stats: globalStats,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Typography.Title level={2} className="heading">
        Global Crypto Stats
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Marker Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link href="/cryptocurrencies">
            <a>Show More</a>
          </Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link href="/news">
            <a>Show More</a>
          </Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ stats: Stats }> =
  async () => {
    const response = await cryptoRequest.get("/coins?limit=10");
    const stats = response.data.data.stats;

    return {
      props: {
        stats,
      },
    };
  };

export default Home;
