// react
import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import Notification from "./components/UI/Notification";
import Layout from "./components/Layout/Layout";
import Sites from "./components/HealthCheck/Sites";
import {
  fetchEnvironmentsData,
  fetchSitesData,
  updateSiteStatus,
} from "./store/sites";

function App() {
  const dispatch = useDispatch();

  // get all enviroments
  useEffect(() => {
    dispatch(fetchEnvironmentsData());
  }, [dispatch]);

  // get all sites
  useEffect(() => {
    dispatch(fetchSitesData());
  }, [dispatch]);

  const allSites = useSelector((state) => state.sites.sites);

  const testSitesHandler = () => {
    console.log("Test all sites");
    dispatch(updateSiteStatus(allSites));
  };

  const notification = useSelector((state) => state.ui.notification);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        <div>
          <button onClick={testSitesHandler}>Test all sites</button>
        </div>
        <Sites />
      </Layout>
    </Fragment>
  );
}

export default App;
