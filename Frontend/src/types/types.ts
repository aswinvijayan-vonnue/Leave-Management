export type LeaveType="Annual Leave"|"Sick Leave" | "Personal Leave";
export type StatusType="Pending"|"Approved"|"Rejected";
export type RequestHistoryType={
    id:string;
    leave:LeaveType;
    from:string;
    to:string;
    status:StatusType;
    appliedOn:string;
}