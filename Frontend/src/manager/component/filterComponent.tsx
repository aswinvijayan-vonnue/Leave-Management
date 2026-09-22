import styles from "./filterComponent.module.css";
import SearchIcon from "../../assets/vectors/search";
import ActiveFilters from "./activeFilter";
import {
  type StatusType,
  type LeaveType,
  type DepartmentType,
} from "../../types/types";
export type FilterType = {
  status?: StatusType;
  leave?: LeaveType;
  department?: DepartmentType;
  search?: string;
};
type FilterProp = {
  newFilter: FilterType;
  leave: LeaveType | null;
  status: StatusType | null;
  department: DepartmentType | null;
  setDepartment: React.Dispatch<React.SetStateAction<DepartmentType | null>>;
  setLeave: React.Dispatch<React.SetStateAction<LeaveType | null>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<StatusType | null>>;
  clearAll: () => void;
  clearStatus: (key: string) => void;
};

const FilterComponent = ({
  leave,
  status,
  department,
  newFilter,
  setDepartment,
  setLeave,
  setSearchQuery,
  setStatus,
  clearAll,
  clearStatus,
}: FilterProp) => {
  return (
    <div className={styles.filterComponent}>
      <div className={styles.filteringSession}>
        <div className={styles.searchContainer}>
          <SearchIcon />
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search, employee,department..."
          />
        </div>
        <select
          name="leave"
          onChange={(e) => {
            setLeave(
              e.target.value.trim() === "" ? null : (e.target.value as LeaveType),
            );
          }}
          value={leave ? leave : ""}
        >
          <option value="">All Leave Types</option>
          <option value="Annual Leave">Annual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Personal Leave">Personal Leave</option>
        </select>
        <select
          name="status"
          onChange={(e) => {
            setStatus(
              e.target.value === "" ? null : (e.target.value as StatusType),
            );
          }}
          value={status ? status : ""}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          name="department"
          onChange={(e) => {
            setDepartment(
              e.target.value === "" ? null : (e.target.value as DepartmentType),
            );
          }}
          value={department ? department : ""}
        >
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Accounting">Accounting</option>
        </select>
      </div>
      <div className={styles.activeSession}>
        <div className={styles.activeDiv}>Active Filters:</div>
        <ActiveFilters
          filter={newFilter}
          clearStatus={clearStatus}
          clearAll={clearAll}
        />
      </div>
    </div>
  );
};

export default FilterComponent;
