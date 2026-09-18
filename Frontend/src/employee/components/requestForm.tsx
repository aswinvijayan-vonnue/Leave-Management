import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowIcon from "../../assets/vectors/arrow";
import styles from "./requestForm.module.css";
import useLeaveTypes from "../../hooks/useLeaveTypes";
import api from "../../api/api";

const LeaveRequest = () => {
  const navigate = useNavigate();
  const [leave, setLeave] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [error, setError] = useState<Record<string, string>>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { leaves, loading, err } = useLeaveTypes();
  useEffect(() => {
    const leaveSetting = () => {
      if (leaves.length > 0 && leave == null) {
        setLeave(leaves[0].id);
      }
    };
    leaveSetting();
  }, [leaves, leave]);
  const clearData = () => {
    setLeave(1);
    setEndDate("");
    setStartDate("");
    setReason("");
  };
  const validateData = () => {
    const newError: Record<string, string> = {};
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
    setIsSubmitting(true);
    setError({});
    const newErrors = validateData();
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      console.log("Error");
      setIsSubmitting(false);
      return;
    }
    const data = {
      leave,
      startDate,
      endDate,
      reason,
    };
    console.log(data);
    api
      .post("/employee/request", {
        startDate,
        endDate,
        reason,
        leaveTypeId: leave,
      })
      .then(() => navigate("/"))
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitting(false);
        clearData();
      });
    clearData();
    setIsSubmitting(false);
    navigate("/");
  };
  if (loading) return <p>Loading leave types...</p>;
  if (err) return <p>Failed to load leave types. Please try again.</p>;
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
              onChange={(e) => setLeave(parseInt(e.target.value))}
              value={leave ?? ""}
            >
              <option value="" disabled>
                Select leave type
              </option>
              {leaves.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))}
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
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequest;
