import styles from "./filterComponent.module.css";
import type { FilterType } from "./filterComponent";
type ActiveFilterProp = {
  filter: FilterType;
  clearStatus: (key: string) => void;
  clearAll: () => void;
};

const ActiveFilters = ({ filter, clearAll, clearStatus }: ActiveFilterProp) => {
    console.log("Here ",filter);
  if (Object.keys(filter).length == 0) return ;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {Object.entries(filter).map(([key, value]) => {
          if(key!=='search')
          return (
            <div className={styles.singleStatus} key={key}>
              <span className={styles.statusLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
              <span className={styles.statusVal}>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </span>
              <span
                className={styles.closeLabel}
                onClick={() => clearStatus(key)}
              >
                X
              </span>
            </div>
          );
        })}
        <div className={styles.clearDiv} onClick={clearAll}>
          Clear all
        </div>
      </div>
    );
};

export default ActiveFilters;
