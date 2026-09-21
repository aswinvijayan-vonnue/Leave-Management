import styles from './hrHeader.module.css';
const OverviewHeader=()=>{
    return(
        <div className={styles.hrHeader}>
            <h1>HR Overview</h1>
            <p>General leave analytics and request queue control.</p>
        </div>
    )
}

export default OverviewHeader;