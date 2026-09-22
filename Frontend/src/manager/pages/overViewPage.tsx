import OverviewHeader from "../component/overViewHeader";
import HrStatCards from "../component/hrStat";
import ApprovalQueue from "../component/approvalQueue";
import styles from "./overViewPage.module.css";

const OverViewContent = () => {
  return (
    <div className={styles.overViewContent}>
      <OverviewHeader />
      <HrStatCards />
      <ApprovalQueue />
    </div>
  );
};

export default OverViewContent;
