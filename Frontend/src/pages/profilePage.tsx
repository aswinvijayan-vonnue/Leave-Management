import styles from "./profile.module.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userInfo = {
    name: "Marcus Vance",
    role: "Associate Engineer",
    dept: "Development",
    status: "Active",
    tenure: "2.4 Years",
  };
  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure want to logout?");
    if (!isConfirmed) return;
    logout();
    navigate("/login");
  };
  return (
    <div className={styles.profilePageDiv}>
      <h1>Account Settings</h1>
      <div className={styles.profileSession}>
        <div className={styles.profileContainer}>
          <div className={styles.profilePicContainer}>
            {" "}
            <span>MV</span>
          </div>
          <div className={styles.userInfoContainer}>
            <p className={styles.name}>{userInfo.name}</p>
            <p className={styles.role}>{userInfo.role}</p>
          </div>
          <div className={styles.department}>
            <span>{userInfo.dept}</span>
          </div>
        </div>
        <div className={styles.boarderLine}></div>
        <div className={styles.employeeInfoContainer}>
          <div
            className={styles.employeeStatusContainer}
            style={{ borderRight: `1px solid var(--border-secondary)` }}
          >
            <div className={styles.employeeStatus}>EMPLOYEE STATUS</div>
            <div className={styles.status}>{userInfo.status}</div>
          </div>
          <div className={styles.employeeStatusContainer}>
            <div className={styles.employeeStatus}>TENURE</div>
            <div className={styles.tenure}>{userInfo.tenure}</div>
          </div>
        </div>
        <div className={styles.logOutContainer}>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
