import {
  getAll,
  getEnvironments,
  NotificationService,
  testSite,
} from "../../services";
import { uiActions } from "../ui";
import { siteActions } from "./site-slice";

export const fetchEnvironmentsData = () => {
  return async (dispatch) => {
    const notification = new NotificationService(
      dispatch,
      uiActions.showNotification
    );

    notification.showPending("Fetching...", "Fetching environments");

    try {
      const response = await getEnvironments();
      dispatch(siteActions.setEnvironments(response));
      notification.showSuccess("Success!", "Get all environments");
    } catch (error) {
      notification.showError("Error!", "Could not fetch environment data!");
    }
  };
};

export const fetchSitesData = () => {
  return async (dispatch) => {
    const notification = new NotificationService(
      dispatch,
      uiActions.showNotification
    );

    notification.showPending("Fetching...", "Fetching environments");

    try {
      const response = await getAll();
      dispatch(siteActions.setSites(response));
      notification.showSuccess("Success!", "Get all sites");
    } catch (error) {
      notification.showError("Error!", "Could not fetch site data!");
    }
  };
};

export const updateSiteStatus = (sites) => {
  return async (dispatch) => {
    const notification = new NotificationService(
      dispatch,
      uiActions.showNotification
    );

    notification.showPending("Checking...", "Checking sites");

    sites.forEach(async (site) => {
      notification.showPending("Checking...", `Checking ${site.name}`);
      try {
        await testSite(site);
        dispatch(siteActions.updateSite({ ...site, status: "🟢" }));
        notification.showSuccess("Success!", `${site.name} is online`);
      } catch (error) {
        dispatch(siteActions.updateSite({ ...site, status: "🔴" }));
        notification.showError("Error!", `${site.name} not responding`);
      }
    });
  };
};
