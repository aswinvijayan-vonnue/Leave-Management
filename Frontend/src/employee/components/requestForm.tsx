import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LeaveType } from "../../types/types";
import ArrowIcon from "../../assets/vectors/arrow";
import styles from "./requestForm.module.css";

const LeaveRequest = () => {
  const navigate = useNavigate();
  const [leave, setLeave] = useState<LeaveType>("Annual Leave");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [error, setError] = useState<Record<string, string>>();

  const clearData = () => {
    setLeave("Annual Leave");
    setEndDate("");
    setStartDate("");
    setReason("");
  };
  const validateData = () => {
    const newError: Record<string, string> = {};
    if (
      !(
        leave == "Annual Leave" ||
        leave == "Personal Leave" ||
        leave == "Sick Leave"
      )
    )
      newError.leave = "invalid leave type";
    const isValid = (date: string) => {
      const formatted = new Date(date);
      return !isNaN(formatted.getMilliseconds());
    };
    if (!isValid(startDate)) newError.startDate = "Invalid start date";
    if (!isValid(endDate)) newError.endDate = "Invalid end date";
    if (!reason.trim()) newError.reason = "Reason cannot be empty";
    return newError;
  };
  const getTomorrowDate = (): string => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const date = String(tomorrow.getDate()).padStart(2, "0");
    return `${year}-${month}-${date}`;
  };
  const getMinEndDate = () => {
    const start = new Date(startDate);
    const nextDay = new Date(start);
    nextDay.setDate(start.getDate() + 1);
    const year = nextDay.getFullYear();
    const month = String(nextDay.getMonth() + 1).padStart(2, "0");
    const date = String(nextDay.getDate()).padStart(2, "0");
    return `${year}-${month}-${date}`;
  };
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({});
    const newErrors = validateData();
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      console.log("Error");
      return;
    }
    const data = {
      leave,
      startDate,
      endDate,
      reason,
    };
    console.log(data);
    clearData();
    navigate("/");
  };
  return (
    <div className={styles.requestDashBoard}>
      <div className={styles.backToDashDiv} onClick={() => navigate("/")}>
        <div className={styles.arrowDiv}>
          <ArrowIcon />
        </div>
        <div className={styles.arrowContent}>Back to Dashboard</div>
      </div>
      <div className={styles.formSession}>
        <div className={styles.formHeader}>
          <h2>New Leave Request</h2>
          <p>Please fill in the details of your request.</p>
        </div>
        <form onSubmit={(e) => submitForm(e)}>
          <div className={styles.inputContainer}>
            <label htmlFor="leaveType">Leave Type</label>
            <select
              name="LeaveType"
              id="leaveType"
              onChange={(e) => setLeave(e.target.value as LeaveType)}
              value={leave}
            >
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Personal Leave">Personal Leave</option>
            </select>
            {error && error.leave && (
              <span className={styles.errorMsg}>{error.leave}</span>
            )}
          </div>
          <div className={styles.labelContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="start">Start Date</label>
              <input
                type="date"
                id="start"
                onChange={(e) => setStartDate(e.target.value)}
                min={getTomorrowDate()}
                value={startDate}
                required
              />
              {error && error.startDate && (
                <span className={styles.errorMsg}>{error.startDate}</span>
              )}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="end">End Date</label>
              <input
                type="date"
                id="end"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
                min={getMinEndDate()}
                required
              />
              {error && error.endDate && (
                <span className={styles.errorMsg}>{error.endDate}</span>
              )}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="reason">Reason for Leave</label>
            <textarea
              name="reason"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
            {error && error.reason && (
              <span className={styles.errorMsg}>{error.reason}</span>
            )}
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.clearButton}
              onClick={clearData}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequest;
