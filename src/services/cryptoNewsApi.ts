import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "43a2c1be47msh89726474b6bf275p12fc02jsn38f79e2bfc30",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com/";

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query<News, { newsCategory: string; count: number }>(
      {
        query: ({ newsCategory, count }) =>
          createRequest(
            `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
          ),
      }
    ),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

export interface News {
  _type: string;
  readLink: string;
  queryContext: QueryContext;
  totalEstimatedMatches: number;
  sort: Sort[];
  value: Value[];
}

export interface QueryContext {
  _type: string;
  originalQuery: string;
  adultIntent: boolean;
}

export interface Sort {
  _type: string;
  name: string;
  id: string;
  isSelected: boolean;
  url: string;
}

export interface Value {
  _type: string;
  name: string;
  url: string;
  image?: Image;
  description: string;
  provider: Provider[];
  datePublished: string;
  category?: string;
  about?: About[];
  mentions?: Mention[];
  video?: Video;
}

export interface Image {
  _type: string;
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  _type: string;
  contentUrl: string;
  width: number;
  height: number;
}

export interface Provider {
  _type: string;
  name: string;
  image?: Image2;
}

export interface Image2 {
  _type: string;
  thumbnail: Thumbnail2;
}

export interface Thumbnail2 {
  _type: string;
  contentUrl: string;
}

export interface About {
  _type: string;
  readLink: string;
  name: string;
}

export interface Mention {
  _type: string;
  name: string;
}

export interface Video {
  _type: string;
  name: string;
  motionThumbnailUrl: string;
  thumbnail: Thumbnail3;
}

export interface Thumbnail3 {
  _type: string;
  width: number;
  height: number;
}
