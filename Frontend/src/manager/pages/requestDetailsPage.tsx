import { useState, useMemo } from "react";
import styles from "./overViewPage.module.css";
import LeaveRequestHeader from "../component/leaveRequestHeader";
import FilterComponent from "../component/filterComponent";
import RequestTable from "../component/requestTable";
import type { FilterType } from "../component/filterComponent";
import type { StatusType, LeaveType, DepartmentType } from "../../types/types";

const RequestDeatils = () => {
  const [status, setStatus] = useState<StatusType | null>(null);
  const [leave, setLeave] = useState<LeaveType | null>(null);
  const [department, setDepartment] = useState<DepartmentType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const newFilter = useMemo(() => {
    const filter: FilterType = {};
    if (status) filter.status = status;
    if (leave) filter.leave = leave;
    if (department) filter.department = department;
    if (searchQuery) filter.search = searchQuery;
    return filter;
  }, [status, department, leave, searchQuery]);

  const clearAll = () => {
    setDepartment(null);
    setLeave(null);
    setStatus(null);
  };
  const clearStatus = (key: string) => {
    if (key === "status") setStatus(null);
    else if (key === "department") setDepartment(null);
    else if (key === "leave") setLeave(null);
  };
  console.log(newFilter);
  return (
    <div className={styles.overViewContent}>
      <LeaveRequestHeader />
      <FilterComponent
        {...{
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
        }}
      />
      <RequestTable />
    </div>
  );
};

export default RequestDeatils;
