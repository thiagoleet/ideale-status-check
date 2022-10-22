import { useSelector } from "react-redux";
import { getSitesByEnvironment } from "../../services";
import EnvironmentItem from "./EnviromentItem";
import classes from "./Sites.module.css";

const Sites = (props) => {
  const environments = useSelector((state) => state.sites.environments);
  const allSites = useSelector((state) => state.sites.sites);

  const environmentItems = environments.map((item) => {
    const sites = getSitesByEnvironment(item, allSites);
    return (
      <EnvironmentItem
        key={item.type}
        label={item.label}
        type={item.type}
        sites={sites}
      />
    );
  });

  return (
    <section className={classes.sites}>
      <h2>Environments</h2>
      <ul>{environmentItems}</ul>
    </section>
  );
};

export default Sites;
