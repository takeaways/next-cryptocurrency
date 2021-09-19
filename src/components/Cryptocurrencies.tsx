import React, { useCallback, useEffect, useState } from "react";
import millify from "millify";
import Link from "next/link";
import { Card, Row, Col, Input } from "antd";
import { Coin, useGetCryptoQuery } from "src/services/cryptoApi";
import Image from "next/image";
interface Props {
  simplified?: boolean;
}

function Cryptocurrencies({ simplified = false }: Props) {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptoQuery(count);
  const [cryptos, setCryptos] = useState<Coin[] | undefined>([]);
  const [search, setSearch] = useState("");

  const handleSearchCrypto = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  useEffect(() => {
    const filteredData = cryptosList?.data.coins //
      .filter((coin) =>
        coin.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );

    setCryptos(filteredData);
  }, [search, cryptosList]);

  if (isFetching) {
    return <>Loading...</>;
  }

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={handleSearchCrypto}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link href={`/crypto/${currency.id}`}>
              <a>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <Image
                      width="35px"
                      height="35px"
                      className="crypto-image"
                      src={currency.iconUrl}
                      alt={currency.name}
                    />
                  }
                  hoverable
                >
                  <p>Price: {millify(Number(currency.price))}</p>
                  <p>Market Cap: {millify(Number(currency.marketCap))}</p>
                  <p>Daily Change: {millify(Number(currency.change))}%</p>
                </Card>
              </a>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
