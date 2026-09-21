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

export type ManagerRequestHistoryType={
  id:number;
  name:string;
  role:string;
  leave:string;
  from:Date;
  to:Date;
  duration:number;
  applied_on:Date;
  status:string
}
