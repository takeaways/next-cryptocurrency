import { Col, Row, Typography } from "antd";

import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { CryptoHistory } from "src/services/cryptoApi";

interface Props {
  coinHistory: CryptoHistory;
  currentPrice: string;
  coinName: string;
}

const { Title } = Typography;
function LineChart({ coinHistory, currentPrice, coinName }: Props) {
  const [prices, timestamps] = useMemo(() => {
    const coinPrice: string[] = [];
    const coinTimestamp: string[] = [];
    coinHistory.data.history.forEach(({ price, timestamp }) => {
      coinPrice.push(price);
      coinTimestamp.push(new Date(timestamp).toLocaleDateString());
    });
    return [coinPrice, coinTimestamp];
  }, [coinHistory]);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Price in USD",
        data: prices,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  console.log(prices, timestamps);

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="char-title">
          {coinName}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory.data.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
}

export default LineChart;
