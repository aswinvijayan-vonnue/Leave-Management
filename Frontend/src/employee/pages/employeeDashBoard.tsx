import LeaveState from "../components/leaveStat";
import RequestHistoryTable from "../components/requestHistoryTable";
import styles from './employeeDashBoard.module.css';
import useReqHistory from "../../hooks/useHistory";

const EmployeeDashBoard=()=>{
    const {leaveStats,data,isLoading,error}=useReqHistory();
    if(isLoading) return (<p>Loading....</p>);
    if(error) return <p>try again</p>
    return (
        <div className={styles.employeeDashBoard}>
            <LeaveState  leaveStats={leaveStats}/>
            <RequestHistoryTable requests={data}/>
        </div>
    )
}

export default EmployeeDashBoard;