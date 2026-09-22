import styles from "./leaveStat.module.css";
import { useNavigate } from "react-router-dom";
import type { LeaveStatType } from "../../hooks/useHistory";

type LeaveStateProp = {
  leaveStats: LeaveStatType[];
};
const LeaveState = (LeaveState: LeaveStateProp) => {
  const navigate = useNavigate();
  const progressCalculator = (total: number, used: number) =>
    Math.floor((used / total) * 100);
  const leave_colors:{[key:string]:string}={
    'Sick Leave': 'var(--info-cyan)',
    'Annual Leave':'var( --violet)',
    'Personal Leave':'var(--warning-yellow)'
  }
  return (
    <div className={styles.leaveBalanceContainer}>
      <div className={styles.leaveBalanceHeader}>
        <h2>Leave Balances</h2>
        <button onClick={() => navigate("/request")}>Request Leave</button>
      </div>
      <div className={styles.statContainer}>
        {LeaveState.leaveStats.map((leaveInfo) => (
          <div className={styles.singleStat} key={leaveInfo.id}>
            <div className={styles.statInfo}>
              <p>{leaveInfo.leave}</p>
              <p>
                <span className={styles.mainDay}>
                  {leaveInfo.total - leaveInfo.used}
                </span>
                <span>/{leaveInfo.total} Days</span>
              </p>
            </div>
            <div className={styles.statGraph}>
              <div
                className={styles.ring}
                style={{
                  background: `conic-gradient(${leave_colors[leaveInfo.leave]} ${progressCalculator(leaveInfo.total, leaveInfo.used)}%, var(--dark-blue-gray) 0)`,
                }}
              >
                <span>{progressCalculator(leaveInfo.total, leaveInfo.used)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveState;
