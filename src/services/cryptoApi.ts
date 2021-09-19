import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "43a2c1be47msh89726474b6bf275p12fc02jsn38f79e2bfc30",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

type Be = Omit<Crypto, "data">;
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCrypto: builder.query<Crypto, number>({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query<CryptoDetail, string>({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query<
      CryptoHistory,
      { coinId: string; timePeriod: string }
    >({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history/${timePeriod}`),
    }),
  }),
});

export type CryptoDetail = { data: { coin: Coin } };
export type CryptoHistory = {
  data: {
    change: number;
    history: {
      price: string;
      timestamp: number;
    }[];
  };
};

export type Crypto = {
  data: {
    coins: Coin[];
    stats: {
      total: number;
      offset: number;
      limit: number;
      order: "desc";
      base: string;
      totalMarkets: number;
      totalExchanges: number;
      totalMarketCap: number;
      total24hVolume: number;
    };
  };
};

export interface Coin {
  id: number;
  uuid: string;
  slug: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconType: string;
  iconUrl: string;
  websiteUrl: string;
  socials: Social[];
  links: Link[];
  confirmedSupply: boolean;
  numberOfMarkets: number;
  numberOfExchanges: number;
  type: string;
  volume: number;
  marketCap: number;
  price: string;
  circulatingSupply: number;
  totalSupply: number;
  approvedSupply: boolean;
  firstSeen: number;
  listedAt: number;
  change: number;
  rank: number;
  history: string[];
  allTimeHigh: AllTimeHigh;
  penalty: boolean;
}

export interface Social {
  name: string;
  url: string;
  type: string;
}

export interface Link {
  name: string;
  type: string;
  url: string;
}

export interface AllTimeHigh {
  price: string;
  timestamp: number;
}

export const {
  useGetCryptoQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
