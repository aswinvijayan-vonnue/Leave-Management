import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.headerSession}>
      <h1 className={styles.projectHeader}>LeaveFlow</h1>
      <div className={styles.profileSession}>
        <div
          className={styles.profileContainer}
          onClick={() => navigate("/profile")}
        >
          <span>MV</span>
        </div>
        <div className={styles.profileInfoContainer}>
          <h2>Marcus Vance</h2>
          <p>Associate Engineer</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
