import { useDispatch } from "react-redux";

import Card from "../UI/Card";
import classes from "./EnvironmentItem.module.css";
import SiteItem from "./SiteItem";

const EnvironmentItem = (props) => {
  const dispatch = useDispatch();

  const { type, label, sites } = props;

  const siteItems = sites.map((item) => {
    return (
      <li key={item.name}>
        <SiteItem name={item.name} status={item.status} />
      </li>
    );
  });

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{label}</h3>
        </header>
        <div>
          <ul>{siteItems}</ul>
        </div>
      </Card>
    </li>
  );
};

export default EnvironmentItem;
