import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sites: [],
  environments: [],
};

const siteSlice = createSlice({
  name: "sites",
  initialState,
  reducers: {
    setSites(state, action) {
      state.sites = action.payload;
    },
    setEnvironments(state, action) {
      state.environments = action.payload;
    },
    updateSite(state, action) {
      const site = action.payload;
      const index = state.sites.findIndex((item) => item.name === site.name);
      if (index >= 0) {
        state.sites[index] = { ...site };
      }
    },
  },
});

export const siteActions = siteSlice.actions;
export default siteSlice;
