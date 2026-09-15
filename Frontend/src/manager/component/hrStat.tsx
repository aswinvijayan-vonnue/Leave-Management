import styles from "./hrStat.module.css";
const HrStatCards = () => {
  return (
    <div className={styles.statContainer}>
      <div className={styles.singleStat}>
        <div className={styles.statInfo}>
          <p className={styles.status}>Total Requests</p>
          <p className={styles.statVal}>20</p>
        </div>
      </div>
      <div className={styles.singleStat}>
        <div className={styles.statInfo}>
          <p className={styles.status}>Pending Review</p>
          <p className={styles.statVal}>12 </p>
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
