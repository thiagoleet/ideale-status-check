import classes from "./SiteItem.module.css";

const SiteItem = (props) => {
  const { name, status } = props;

  return (
    <article className={classes.site}>
      <div className={classes.status}>{status}</div>
      <div className={classes.site}>{name}</div>
    </article>
  );
};

export default SiteItem;
