import styles from "./requestTable.module.css";
import useRequest from "../../hooks/managerRequestQueue";
import { dateToString } from "../../utils/dateTime";
import updateStatus from "../../api/managerStatusUpdate";
import { useState } from "react";

const RequestTable = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { requests } = useRequest();
  const handleClick = async (id: number, status: string) => {
    setLoading(true);
    try {
      await updateStatus(id, status);
      window.location.reload();
    } catch (err) {
      console.error("failed to update status:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.historyBody}>
      <table className={styles.historyTable}>
        <thead>
          <tr className={styles.headingRow}>
            <th>EMPLOYEE</th>
            <th>TYPE</th>
            <th>FROM</th>
            <th>TO</th>
            <th>DURATION</th>
            <th>APPLIED ON</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className={styles.reqRow}>
              <td>
                <div className={styles.multiVal}>
                  <p className={styles.mainVal}>{req.name}</p>
                  <p className={styles.subVal}>{req.role}</p>
                </div>
              </td>
              <td>
                <span className={styles.mainVal}>{req.leave}</span>
              </td>
              <td>{dateToString(req.from as unknown as string)}</td>
              <td>{dateToString(req.to as unknown as string)}</td>
              <td>
                <span className={styles.mainVal}>
                  {req.duration} {req.duration > 1 ? "Days" : "Day"}
                </span>
              </td>
              <td>{dateToString(req.applied_on as unknown as string)}</td>
              <td>
                <span
                  className={`${styles.statusColumn}
                ${req.status == "Approved" ? styles.approved : req.status == "Pending" ? styles.pending : styles.rejected}
                `}
                >
                  {req.status}
                </span>
              </td>
              <td>
                {req.status === "Pending" && (
                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.rejectButton}
                      disabled={loading}
                      onClick={() => handleClick(req.id, "Rejected")}
                    >
                      Reject
                    </button>
                    <button
                      className={styles.approveButton}
                      disabled={loading}
                      onClick={() => handleClick(req.id, "Approved")}
                    >
                      Approve
                    </button>
                  </div>
                )}
              </td>
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
  );
};

export default RequestTable;
