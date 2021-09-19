import React, { useCallback, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "src/services/cryptoNewsApi";
import Image from "next/image";
import { useGetCryptoQuery } from "src/services/cryptoApi";
const { Text, Title } = Typography;
const { Option } = Select;

interface Props {
  simplified?: boolean;
}
function News({ simplified = false }: Props) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const handleSelectCategory = useCallback((category) => {
    setNewsCategory(category);
  }, []);

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 100,
  });

  const { data } = useGetCryptoQuery(100);

  if (!cryptoNews?.value) return <>Loading....</>;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={handleSelectCategory}
            filterOption={(input, option) => {
              if (!option) return false;
              return option.value.toLowerCase().includes(input.toLowerCase());
            }}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data.coins.map((coin) => (
              <Option key={coin.id} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}

      {cryptoNews.value.map((news) => (
        <Col xs={24} sm={12} lg={8} key={news.name}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="new-title" level={4}>
                  {news.name}
                </Title>
                <Image
                  width="200px"
                  height="100px"
                  src={news.image?.thumbnail.contentUrl || "/images/th.jpeg"}
                  alt={news.name}
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0].image?.thumbnail.contentUrl ||
                      "/images/th.jpeg"
                    }
                    alt={"news"}
                  />
                  <Text className="provider-name">{news.provider[0].name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf("s").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default News;
