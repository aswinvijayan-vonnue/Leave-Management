import { NavLink, useNavigate } from "react-router-dom";
import styles from "./sidebar.module.css";
import Grid from "../../assets/vectors/grid";
import File from "../../assets/vectors/file";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.sideBarComponent}>
      <div className={styles.top}>
        <h2>LeaveFlow</h2>
        <div className={styles.menu}>
          <div className={styles.itemContent}>
            <NavLink
              to="/overview"
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.navVal}` : styles.navVal
              }
            >
              {({ isActive }) => (
                <>
                  <Grid fill={isActive ? "#8b5cf6" : "#94a3b8"} />{" "}
                  <span>Overview</span>
                </>
              )}
            </NavLink>
          </div>
          <div className={styles.itemContent}>
            <NavLink
              to="/details"
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.navVal}` : styles.navVal
              }
            >
              {({ isActive }) => (
                <>
                  <File fill={isActive ? "#8b5cf6" : "#94a3b8"} />
                  <span>Requests</span>
                </>
              )}
            </NavLink>
          </div>
        </div>
      </div>
      <div className={styles.middle}></div>
      <div className={styles.bottom}>
        <div
          className={styles.profileRect}
          onClick={() => navigate("/profile")}
        >
          <span>MV</span>
        </div>
        <div className={styles.profileText}>
          <p className={styles.name}>Marcus Vance</p>
          <p className={styles.role}>HR Administrator</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
