import { configureStore } from "@reduxjs/toolkit";

import { cryptoApi } from "src/services/cryptoApi";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
});
