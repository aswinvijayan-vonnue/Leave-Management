import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import LogoIcon from "./logoIcon";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.headerSession}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <LogoIcon /> <h1 className={styles.projectHeader}>LeaveFlow</h1>
      </div>
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
