import LeaveState from "../components/leaveStat";
import RequestHistoryTable from "../components/requestHistoryTable";
import styles from './employeeDashBoard.module.css';

const EmployeeDashBoard=()=>{
    return (
        <div className={styles.employeeDashBoard}>
            <LeaveState  annualLeave={{ total: 20, taken: 5 }}
          personalLeave={{ total: 20, taken: 3 }}
          sickLeave={{ total: 15, taken: 13 }}/>
            <RequestHistoryTable/>
        </div>
    )
}

export default EmployeeDashBoard;