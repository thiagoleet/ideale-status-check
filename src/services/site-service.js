import { environments } from "./environments-data";
import { sites } from "./sites-data";
import { siteTypes } from "./types-data";

export const getAll = () => {
  const allSites = sites.map((site) => {
    site.status = "🔵";
    return site;
  });
  return allSites;
};

export const getTypes = () => {
  return siteTypes;
};

export const getEnvironments = () => {
  return environments;
};

export const getSitesByEnvironment = (environment, sites) => {
  return sites.filter((site) => site.environment.type === environment.type);
};

export const testSite = async (site) => {
  return await fetch(site.url);
};
