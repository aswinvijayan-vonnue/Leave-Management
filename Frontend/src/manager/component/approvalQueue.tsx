import { useNavigate } from "react-router-dom";
import styles from "./approvalQueue.module.css";
import type { RequestStatusType } from "../../types/types";
import RightArrow from "../../assets/vectors/rightArrow";
const ApprovalQueue = () => {
  const navigate = useNavigate();
  const requests: RequestStatusType[] = [
    {
      user: {
        id: "user-101",
        name: "Amal Raj",
        role: "Developer",
      },
      id: "hey",
      leave: "Annual Leave",
      from: "26 February",
      to: "1 March",
      status: "Approved",
      appliedOn: "25 February",
    },
    {
      user: {
        id: "user-101",
        name: "Priya",
        role: "Developer",
      },
      id: "hey2",
      leave: "Personal Leave",
      from: "26 February",
      to: "1 March",
      status: "Pending",
      appliedOn: "25 February",
    },
    {
      user: {
        id: "user-101",
        name: "Amal Raj",
        role: "Product Designer",
      },
      id: "hey3",
      leave: "Sick Leave",
      from: "26 February",
      to: "1 March",
      status: "Rejected",
      appliedOn: "25 February",
    },
  ];

  return (
    <div className={styles.historyContainer}>
      <div className={styles.headerSession}>
        <div className={styles.headerDiv}>
          <h2 className={styles.historyHeader}>Approval Queue</h2>
          <div className={styles.pendingDiv}>
            <span>4</span> Pending
          </div>
        </div>
        <div className={styles.viewReqDiv}>
          <div
            className={styles.viewDetails}
            onClick={() => navigate("/details")}
          >
            View all requests
          </div>
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
            {requests.map((req) => (
              <tr key={req.id} className={styles.reqRow}>
                <td>
                  <div className={styles.multiVal}>
                    <p className={styles.mainVal}>{req.user.name}</p>
                    <p className={styles.subVal}>{req.user.role}</p>
                  </div>
                </td>
                <td>
                  <div className={styles.multiVal}>
                    <p className={styles.mainVal}>{req.leave}</p>
                    <p className={styles.subVal}>
                      {req.from}-{req.to}
                    </p>
                  </div>
                </td>
                <td>
                  <span className={styles.mainVal}>{7} Days</span>
                </td>
                <td>{req.appliedOn}</td>
                <td>
                  <div className={styles.buttonContainer}>
                    <button className={styles.rejectButton}>Reject</button>
                    <button className={styles.approveButton}>Approve</button>
                  </div>
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
    </div>
  );
};
export default ApprovalQueue;
