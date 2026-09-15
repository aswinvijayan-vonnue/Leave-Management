export type LeaveType = "Annual Leave" | "Sick Leave" | "Personal Leave";
export type StatusType = "Pending" | "Approved" | "Rejected";
export type DepartmentType = "Engineering" | "Marketing" | "Accounting";
export type RequestHistoryType = {
  id: string;
  leave: LeaveType;
  from: string;
  to: string;
  status: StatusType;
  appliedOn: string;
};

export type RequestStatusType = RequestHistoryType & {
  user: {
    id: string;
    name: string;
    role: string;
  };
};
