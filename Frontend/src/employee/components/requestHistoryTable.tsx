import styles from "./requestHistory.module.css";
import type { HistoryType } from "../../hooks/useHistory";
import { dateToString } from "../../utils/dateTime";

type RequestHistoryTableProp = {
  requests: HistoryType[];
};
const RequestHistoryTable = (requestProp:RequestHistoryTableProp) => {
  const requests=requestProp.requests;

  return (
    <div className={styles.historyContainer}>
      <h2 className={styles.historyHeader}>Request History</h2>
      <div className={styles.historyBody}>
        <table className={styles.historyTable}>
          <thead>
            <tr className={styles.headingRow}>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Applied On</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className={styles.reqRow}>
                <td className={styles.highLight}>
                  <span
                    className={styles.leaveBullet}
                    style={{
                      backgroundColor:
                        req.leave === "Annual Leave"
                          ? "var(--violet)"
                          : req.leave === "Personal Leave"
                            ? "var(--warning-yellow)"
                            : "var(--info-cyan)",
                    }}
                  ></span>
                  {req.leave}
                </td>
                <td>{dateToString(req.from)}</td>
                <td>{dateToString(req.to)}</td>
                <td className={styles.highLight}>{req.duration} Working Days</td>
                <td>
                  <span
                    className={`${styles.statusContainer}
                ${req.status == "Approved" ? styles.approved : req.status == "Pending" ? styles.pending : styles.rejected}
                `}
                  >
                    {req.status}
                  </span>
                </td>
                <td>{dateToString(req.applied_on)}</td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyReqColumn}>
                  No requests yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestHistoryTable;
