import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui";
import siteSlice from "./sites/site-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    sites: siteSlice.reducer,
  },
});

export default store;
