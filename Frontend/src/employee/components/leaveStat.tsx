import styles from "./leaveStat.module.css";
import { useNavigate } from "react-router-dom";

type LeaveStateProp = {
  annualLeave: {
    total: number;
    taken: number;
  };
  sickLeave: {
    total: number;
    taken: number;
  };
  personalLeave: {
    total: number;
    taken: number;
  };
};
const LeaveState = (LeaveStateInfo: LeaveStateProp) => {
  const navigate = useNavigate();
  const { annualLeave, sickLeave, personalLeave } = LeaveStateInfo;
  const annualProgress = Math.floor(
    (annualLeave.taken / annualLeave.total) * 100,
  );
  const personalProgress = Math.floor(
    (personalLeave.taken / personalLeave.total) * 100,
  );
  const sickprogress = Math.floor((sickLeave.taken / sickLeave.total) * 100);
  return (
    <div className={styles.leaveBalanceContainer}>
      <div className={styles.leaveBalanceHeader}>
        <h2>Leave Balances</h2>
        <button onClick={() => navigate("/request")}>Request Leave</button>
      </div>
      <div className={styles.statContainer}>
        <div className={styles.singleStat}>
          <div className={styles.statInfo}>
            <p>Annual Leave</p>
            <p>
              <span className={styles.mainDay}>
                {annualLeave.total - annualLeave.taken}
              </span>
              <span>/{annualLeave.total} Days</span>
            </p>
          </div>
          <div className={styles.statGraph}>
            <div
              className={styles.ring}
              style={{
                background: `conic-gradient(var( --violet) ${annualProgress}%, var(--dark-blue-gray) 0)`,
              }}
            >
              <span>{annualProgress}%</span>
            </div>
          </div>
        </div>
        <div className={styles.singleStat}>
          <div className={styles.statInfo}>
            <p>Sick Leave</p>
            <p>
              <span className={styles.mainDay}>
                {sickLeave.total - sickLeave.taken}
              </span>
              <span>/{sickLeave.total} Days</span>
            </p>
          </div>
          <div className={styles.statGraph}>
            <div
              className={styles.ring}
              style={{
                background: `conic-gradient(var(--info-cyan) ${sickprogress}%, var(--dark-blue-gray) 0)`,
              }}
            >
              <span>{sickprogress}%</span>
            </div>
          </div>
        </div>
        <div className={styles.singleStat}>
          <div className={styles.statInfo}>
            <p>Personal Leave</p>
            <p>
              <span className={styles.mainDay}>
                {personalLeave.total - personalLeave.taken}
              </span>
              <span>/{personalLeave.total} Days</span>
            </p>
          </div>
          <div className={styles.statGraph}>
            <div
              className={styles.ring}
              style={{
                background: `conic-gradient(var( --warning-yellow) ${personalProgress}%, var(--dark-blue-gray) 0)`,
              }}
            >
              <span>{personalProgress}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveState;
