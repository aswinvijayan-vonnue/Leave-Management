import styles from "./hrStat.module.css";
import useStats from "../../hooks/useStats";
const HrStatCards = () => {
  const {stats}=useStats();
  return (
    <div className={styles.statContainer}>
      <div className={styles.singleStat}>
        <div className={styles.statInfo}>
          <p className={styles.status}>Total Requests</p>
          <p className={styles.statVal}>{stats.total || 0}</p>
        </div>
      </div>
      <div className={styles.singleStat}>
        <div className={styles.statInfo}>
          <p className={styles.status}>Pending Review</p>
          <p className={styles.statVal}>{stats.pendingCount || 0} </p>
        </div>
      </div>
      <div className={styles.singleStat}>
        <div className={styles.statInfo}>
          <p className={styles.status}>Approved This Month</p>
          <p className={styles.statVal}> 8</p>
        </div>
      </div>
    </div>
  );
};

export default HrStatCards;
