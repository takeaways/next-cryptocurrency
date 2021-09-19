import { cryptoNewsApi } from "./../services/cryptoNewsApi";
import { configureStore } from "@reduxjs/toolkit";

import { cryptoApi } from "src/services/cryptoApi";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cryptoApi.middleware,
      cryptoNewsApi.middleware
    ),
});
