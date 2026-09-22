import {Link } from "react-router-dom";
import { useState } from "react";
import styles from "./approvalQueue.module.css";
import RightArrow from "../../assets/vectors/rightArrow";
import useApprovalQueue from "../../hooks/managerApprovalQueue";
import { dateToString } from "../../utils/dateTime";
import updateStatus from "../../api/managerStatusUpdate";
const ApprovalQueue = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { pendingReq, setPendingReq } = useApprovalQueue();
  const handleClick = async (id: number, status: string) => {
    setLoading(true);
    try {
      await updateStatus(id, status);
      setPendingReq((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("failed to update status:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.historyContainer}>
      <div className={styles.headerSession}>
        <div className={styles.headerDiv}>
          <h2 className={styles.historyHeader}>Approval Queue</h2>
          <div className={styles.pendingDiv}>
            <span>{pendingReq.length}</span> Pending
          </div>
        </div>
        <div className={styles.viewReqDiv}>
          <Link to="/details"
            className={styles.viewDetails}
          >
            View all requests
          </Link>
          <div>
            <RightArrow />
          </div>
        </div>
      </div>
      <div className={styles.historyBody}>
        <table className={styles.historyTable}>
          <thead>
            <tr className={styles.headingRow}>
              <th>EMPLOYEE</th>
              <th>LEAVE TYPE</th>
              <th>DURATION</th>
              <th>APPLIED ON</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {pendingReq.map((req) => (
              <tr key={req.id} className={styles.reqRow}>
                <td>
                  <div className={styles.multiVal}>
                    <p className={styles.mainVal}>{req.name}</p>
                    <p className={styles.subVal}>{req.role}</p>
                  </div>
                </td>
                <td>
                  <div className={styles.multiVal}>
                    <p className={styles.mainVal}>{req.leave}</p>
                    <p className={styles.subVal}>
                      {dateToString(req.from as unknown as string)}-
                      {dateToString(req.to as unknown as string)}
                    </p>
                  </div>
                </td>
                <td>
                  <span className={styles.mainVal}>
                    {req.duration} {req.duration > 1 ? "Days" : "Day"}
                  </span>
                </td>
                <td>{dateToString(req.applied_on as unknown as string)}</td>
                <td>
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
                </td>
              </tr>
            ))}
            {pendingReq.length === 0 && (
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
export default ApprovalQueue;
