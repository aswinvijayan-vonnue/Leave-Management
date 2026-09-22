import styles from './hrHeader.module.css';
const LeaveRequestHeader=()=>{
    return(
        <div className={styles.hrHeader}>
            <h1>Leave Requests</h1>
            <p>Audit, filter and process all company wide leave submissions.</p>
        </div>
    )
}

export default LeaveRequestHeader;